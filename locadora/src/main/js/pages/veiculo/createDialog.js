import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class CreateDialog extends React.Component {

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
		var newVeiculo = {};
		this.props.attributes.forEach(attribute => {
			newVeiculo[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		let retorno = this.props.onCreate(newVeiculo);
		if('ok' === retorno){
			this.props.attributes.forEach(attribute => {
				ReactDOM.findDOMNode(this.refs[attribute]).value = ''; 
			});
			window.location = "#";
			this.toggle();
		}else{
			this.renderErros(retorno);
		}
	}
	
	renderErros(retorno){
		
	}

	render() {
		var inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="form-control" />
			</p>
		);
		return (
			<div>
				<Button color="success" onClick={this.toggle}>Novo</Button>
				
		        <Modal isOpen={this.state.modal} toggle={this.toggle}>
		          <ModalHeader toggle={this.toggle}>Novo Veículo</ModalHeader>
		          <ModalBody>
		          	{inputs}
		          </ModalBody>
		          <ModalFooter>
		            <Button color="primary" onClick={this.handleSubmit}>Salvar</Button>{' '}
		            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
		          </ModalFooter>
		        </Modal>
		        
			</div>
		)
	}
};
