import React from 'react';
import ReactDOM from 'react-dom';

export default class InputCustom extends React.Component {

	constructor(props) {
		super(props);
	}
	
	renderErros(){
		if(this.props.erro){
			let erros = [];
			erro.map(msg =>{
				erros.push(<label>{msg}</label>);
			});
			return (erros);
		}
		return null;
	}

	render() {
		return (
			<p key={this.props.attribute}>
				<input 
					type="text" 
					placeholder={this.props.attribute} 
					ref={this.props.attribute} 
					className="form-control" 
					onChange={(evt) => {
						this.props.onChange(evt.target.value);
					}}	
				/>
				{this.renderErros()}
			</p>
		);
	}
}
