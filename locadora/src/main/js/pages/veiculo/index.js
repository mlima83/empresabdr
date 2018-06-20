'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import client from '../../components/util/client';
import follow from '../../components/util/follow'; 
import CreateDialog  from './createDialog'; 
import VeiculoList  from './veiculoList';

const when = require('when');
const root = '/api';

/**
 * Componente de entrada para o CRUD de Veículo
 * Renderiza a listagem de veículos com as opções de Cadastradar um novo veículo, alterar e remover um existente.
 * Concentra também todo o acesso aos dados do servidor.
 */
export default class App extends React.Component {
	/**Construtor padrão*/
	constructor(props) {
		super(props);
		this.state = {veiculos: [], attributes: [], pageSize: 2, links: {}, page: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
	}

	/**Realiza o carregamento dos veículos apresentados da listagem*/
	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'veiculoes', params: {size: pageSize}}]
		).then(veiculoCollection => {
			return client({
				method: 'GET',
				path: veiculoCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				this.links = veiculoCollection.entity._links;
				return veiculoCollection;
			});
		}).then(veiculoCollection => {
			this.setState({
				page: veiculoCollection.entity.page,
			});
			return veiculoCollection.entity._embedded.veiculoes.map(veiculo =>
					client({
						method: 'GET',
						path: veiculo._links.self.href
					})
			);
		}).then(veiculoPromises => {
			return when.all(veiculoPromises);
		}).done(veiculos => {
			this.setState({
				veiculos: veiculos,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links,
			});
		});
	}
	/**Realiza o tratamento do retorno de erro do spring*/
	tratarErro(err){
		if(err){
			let erros = [];
			console.log(err);
			err.entity.errors.map(erro => {
				if(!erros[erro.property])
					erros[erro.property] = [];
				erros[erro.property].push(erro);
			});
			return erros;
		}
		return null;
	}
	/**Método responsável por invocar a funcionalidade de criar um novo veículo*/
	onCreate(newVeiculo, onSuccess, onError) {
		var self = this;
		var retorno;
		follow(client, root, ['veiculoes']).then(response => {
			return client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newVeiculo,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [{rel: 'veiculoes', params: {'size': self.state.pageSize}}]);
		}).catch((err) => {
			if(onError)
				onError(this.tratarErro(err));
		}).done(response => {
			if(response && response.entity){
				if (typeof response.entity._links.last != "undefined") {
					this.onNavigate(response.entity._links.last.href);
				} else {
					this.onNavigate(response.entity._links.self.href);
				}
				if(onSuccess)
					onSuccess();
			}
		});
	}

	/**Método responsável por invocar a funcionalidade de alterar um veículo existente*/
	onUpdate(veiculo, updatedVeiculo, onSuccess, onError) {
		client({
			method: 'PUT',
			path: veiculo.entity._links.self.href,
			entity: updatedVeiculo,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': veiculo.headers.Etag
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
			if(onSuccess)
				onSuccess();
		}, response => {
			console.log(response);
			switch (response.status.code) {
			case 400:
				if(onError)
					onError(this.tratarErro(response));
				break;
			case 412:
				alert('DENIED: Unable to update ' +
						veiculo.entity._links.self.href + '. Your copy is stale.');
				break;
			default:
				if(onSuccess)
					onSuccess();
				break;
			}
		});
		
	}

	/**Método responsável por invocar a funcionalidade de remover um veículo existente*/
	onDelete(veiculo) {
		client({method: 'DELETE', path: veiculo.entity._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	/**Método responsável por realizar a navegação pela paginação feita pelo SpringDataRest*/
	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(veiculoCollection => {
			this.setState({
				page: veiculoCollection.entity.page,
			})
			this.links = veiculoCollection.entity._links;
			return veiculoCollection.entity._embedded.veiculoes.map(veiculo =>
					client({
						method: 'GET',
						path: veiculo._links.self.href
					})
			);
		}).then(veiculoPromises => {
			return when.all(veiculoPromises);
		}).done(veiculos => {
			this.setState({
				veiculos: veiculos,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links,
			});
		});
	}
	/**Realiza a atualização da quantidade de registros apresentados na listagem*/
	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}
	/**Método default de um componente react, responsável por invocar o 
	 * carregamento da listagem assim que o compomente terminar de ser criado*/
	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}
	/**Método do componente React responsável por imprimir em tela os elementos JSX*/
	render() {
		return (
			<div className="container">
				<h3>Listagem de Veículos</h3>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<VeiculoList veiculos={this.state.veiculos}
					  links={this.state.links}
					  pageSize={this.state.pageSize}
					  attributes={this.state.attributes}
					  onNavigate={this.onNavigate}
					  onUpdate={this.onUpdate}
					  onDelete={this.onDelete}
					  updatePageSize={this.updatePageSize}
					  page={this.state.page}/>
			</div>
		)
	}
}

