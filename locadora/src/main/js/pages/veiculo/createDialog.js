import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputCustom  from '../../components/inputCustom';

export default class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	    this.state = {
	    	modal: false,
	    	veiculo: {},
	    	erros: [],
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
		this.props.onCreate(newVeiculo, 
			() => {
				let newVeiculo = [];
				this.props.attributes.forEach(attribute => {
					newVeiculo[attribute] = ''; 
				});
			    this.setState({
			    	veiculo: newVeiculo,
			    });
				window.location = "#";
				this.toggle();
			},
			(erros) => {
				console.log(erros);
			    this.setState({
			    	erros
			    });
			});
	}

	render() {
		var inputs = this.props.attributes.map(attribute =>{
			let erro = this.state.erros[attribute] ? this.state.erros[attribute] : null;
			return (
				<InputCustom 
					key={attribute}
					attribute={attribute}
					erro={erro} 
					onChange={(value) => {
						console.log(value);
						let veiculo = {...this.state.veiculo}; 
						veiculo[attribute] = value;
						console.log(veiculo);
					    this.setState({
					    	veiculo: {...veiculo},
					    });
					}}
				/>
			);
		});
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
