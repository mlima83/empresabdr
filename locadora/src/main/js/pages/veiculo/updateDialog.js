import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	    this.state = {
	    	modal: false
	    };
	    this.toggle = this.toggle.bind(this);		
	}
	
	toggle() {
	    this.setState({
	      modal: !this.state.modal
	    });
	}
	
	
	handleSubmit(e) {
		e.preventDefault();
		var updatedVeiculo = {};
		this.props.attributes.forEach(attribute => {
			updatedVeiculo[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.veiculo, updatedVeiculo);
		window.location = "#";
		this.toggle();
	}

	render() {
		var inputs = this.props.attributes.map(attribute =>
				<p key={this.props.veiculo.entity[attribute]}>
					<input type="text" placeholder={attribute}
						   defaultValue={this.props.veiculo.entity[attribute]}
						   ref={attribute} className="form-control" />
				</p>
		);


		return (
			<div>
				<Button color="info" onClick={this.toggle}>Alterar</Button>
				
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Alterar Veículo</ModalHeader>
					<ModalBody>
						{inputs}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.handleSubmit}>Salvar Alterações</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>Cancelar</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}

};
