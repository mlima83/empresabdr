import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import Veiculo  from './Veiculo';
import Paginator  from '../../components/paginator';

/**
 * Componente reponsável por renderizar a listagem dos veículos.
 */
export default class VeiculoList extends React.Component {

	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
		}
	}

	render() {
		var veiculos = this.props.veiculos.map(veiculo =>
				<Veiculo key={veiculo.entity._links.self.href}
						  veiculo={veiculo}
						  attributes={this.props.attributes}
						  onUpdate={this.props.onUpdate}
						  onDelete={this.props.onDelete}/>
		);
		
		return (
			<div>
				<table className="table table-striped">
					<tbody>
						<tr>
							<th>Nome</th>
							<th>Ano</th>
							<th>Cor</th>
							<th>Placa</th>
							<th></th>
							<th></th>
						</tr>
						{veiculos}
					</tbody>
				</table>
				<div className="form-inline ">
					<label className="mr-sm-2">Itens por página:</label>
					<select className="custom-select mb-2 mr-sm-2 mb-sm-0" ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}>
					  <option value="1">1</option>
					  <option value="2">2</option>
					  <option value="5">5</option>
					  <option value="10">10</option>
					  <option value="20">20</option>
					</select> 
					<div className="custom-control mb-2 mr-sm-2 mb-sm-0">
						<Paginator 
							links={this.props.links} 
							page={this.props.page}
							onNavigate={href => {
								this.props.onNavigate(href);
							}}/>
					</div>
				</div>
			</div>
		)
	}
}
