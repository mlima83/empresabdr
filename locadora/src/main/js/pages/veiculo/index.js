'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import client from '../../components/util/client';
import follow from '../../components/util/follow'; 
import CreateDialog  from './createDialog'; 
import VeiculoList  from './veiculoList';

const when = require('when');
const root = '/api';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {veiculos: [], attributes: [], pageSize: 2, links: {}, page: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
	}

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

	onCreate(newVeiculo) {
		var self = this;
		follow(client, root, ['veiculoes']).then(response => {
			return client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newVeiculo,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [{rel: 'veiculoes', params: {'size': self.state.pageSize}}]);
		}).done(response => {
			if (typeof response.entity._links.last != "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	onUpdate(veiculo, updatedVeiculo) {
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
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' +
					veiculo.entity._links.self.href + '. Your copy is stale.');
			}
		});
	}

	onDelete(veiculo) {
		client({method: 'DELETE', path: veiculo.entity._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

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

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}

	render() {
		return (
			<div className="container">
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

