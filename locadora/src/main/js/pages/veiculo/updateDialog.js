import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputCustom  from '../../components/inputCustom';
/**
 * Componente responsável por criar um modal para alteração de veículo.
 * 
 * Este componente recebe os atributos do veículo e renderiza os inputs de acordo com esse parâmetro
 */
export default class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	    this.state = {
	    	modal: false,
	    	veiculo: props.veiculo.entity,
	    	erros: [],
	    };
	    this.toggle = this.toggle.bind(this);		
	}
	/**Método que controla o estado de abertura da modal*/	
	toggle() {
	    this.setState({
	      modal: !this.state.modal,
	      erros: this.state.modal ? [] : this.state.erros,
	    });
	}
	
	/**Realiza a submissão dos dados do formulário*/	
	handleSubmit(e) {
		e.preventDefault();
		var updatedVeiculo = this.state.veiculo;
		this.props.onUpdate(
				this.props.veiculo, 
				updatedVeiculo, 
				/*onSuccess*/
				() => {
					window.location = "#";
					this.toggle();
				},
				/*onError*/
				(erros) => {
					console.log(erros);
				    this.setState({
				    	erros
				    });						
				});
	}

	render() {
		let veiculo = this.state.veiculo; 
		/*percorrendo os atributos recebidos para rederização dos respectivos inpouts*/
		var inputs = this.props.attributes.map(attribute =>{
			let erro = this.state.erros[attribute] ? this.state.erros[attribute] : null;
			return (
				<InputCustom 
					key={attribute}
					attribute={attribute}
					type={'ano' === attribute ? 'number' : null}
					erro={erro} 
					defaultValue={this.props.veiculo.entity[attribute]}
					onChange={(value) => {
						veiculo[attribute] = value;
					    this.setState({
					    	veiculo: veiculo,
					    });
					}}
				/>
			);
		});		

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
