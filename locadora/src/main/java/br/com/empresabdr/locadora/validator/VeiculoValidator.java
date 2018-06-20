package br.com.empresabdr.locadora.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import br.com.empresabdr.locadora.entity.Veiculo;

/**
 * Classe responsável pelas validações de um veículo.
 * @author Marco Lima
 *
 */
@Component("veiculoValidator")
public class VeiculoValidator  implements Validator{
	
	/**
	 * Método que indica a classe suportada para esse validator
	 */
    @Override
    public boolean supports(Class<?> clazz) {
        return Veiculo.class.equals(clazz);
    }
 
    /**
     * Método que realiza a validação do veículo
     */
    @Override
    public void validate(Object obj, Errors errors) {
    	Veiculo veiculo = (Veiculo) obj;
    	/*Realizando as validações básicas dos campos*/
    	ValidationUtils.rejectIfEmptyOrWhitespace(errors, "nome", "field.required");
    	ValidationUtils.rejectIfEmpty(errors, "ano", "field.required");
    	ValidationUtils.rejectIfEmptyOrWhitespace(errors, "cor", "field.required");
    	ValidationUtils.rejectIfEmptyOrWhitespace(errors, "placa", "field.required");
    	
    	/*2º nível de validação, somente se as validações anteriores não captaram erros*/
    	if(!errors.hasErrors()){
    		/*Verifica se a formatação da placa está correta*/
    		Pattern pattern = Pattern.compile("[a-zA-Z]{3,3}-\\d{4,4}");
    		Matcher matcher = pattern.matcher(veiculo.getPlaca());
    		if(!matcher.find())
    			errors.rejectValue("placa", "field.invalid");
    		/*Verifica se o ano é válido*/
    		if(veiculo.getAno() < 0 || veiculo.getAno() > 9999)
    			errors.rejectValue("ano", "field.invalid");
    	}
    }
 
}
