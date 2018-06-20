import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Componente para input com renderização de mensagem de erro.
 * 
 * Propriedades:
 * 		attribute= nome do atributo
 * 		type= tipo válido para input html
 * 		erro= Object 
 * 		defaultValue= Valor default a ser carregado
 * 		onChange= Método executado no evento change
 */
export default class InputCustom extends React.Component {

	constructor(props) {
		super(props);
	}
	
	renderErros(){
		if(this.props.erro){
			let erros = [];
			this.props.erro.map((erro, index) =>{
				erros.push(<label key={index} className="error">{erro.message}</label>);
			});
			return (erros);
		}
		return null;
	}
	
	render() {
		let className = `form-control ${this.props.className}`;
		let type = this.props.type ? this.props.type : 'text';
		return (
			<p key={this.props.attribute}>
				<input 
					type={type} 
					placeholder={this.props.attribute} 
					ref={this.props.attribute} 
					defaultValue={this.props.defaultValue}
					className={className}
					onChange={(evt) => {
						this.props.onChange(evt.target.value);
					}}	
				/>
				{this.renderErros()}
			</p>
		);
	}
}
