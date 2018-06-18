import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import UpdateDialog  from './updateDialog';

// tag::veiculo[]
export default class Veiculo extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.veiculo);
	}

	render() {
		return (
			<tr>
				<td>{this.props.veiculo.entity.nome}</td>
				<td>{this.props.veiculo.entity.ano}</td>
				<td>{this.props.veiculo.entity.cor}</td>
				<td>{this.props.veiculo.entity.placa}</td>
				<td>
					<UpdateDialog veiculo={this.props.veiculo}
								  attributes={this.props.attributes}
								  onUpdate={this.props.onUpdate}/>
				</td>
				<td>
					<Button color="danger" onClick={this.handleDelete}>Remover</Button>
				</td>
			</tr>
		)
	}
}
// end::veiculo[]