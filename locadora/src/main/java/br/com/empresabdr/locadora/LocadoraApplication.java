package br.com.empresabdr.locadora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import br.com.empresabdr.locadora.validator.VeiculoValidator;

/**
 * Classe responsável pela inicialização do SpringBoot.
 * @author Marco Lima
 */
@SpringBootApplication
public class LocadoraApplication extends RepositoryRestConfigurerAdapter{

	/***
	 * Método main para iniciar a aplicação
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(LocadoraApplication.class, args);
	}
	
	/**
	 * Método que realiza o registro de todos os validators da aplicação
	 */
	@Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener v) {
		/*Registrando a validação de veículo para criação de um novo registro*/
        v.addValidator("beforeCreate", new VeiculoValidator());
        /*Registrando a validação de veículo para alteração de um registro existente*/
        v.addValidator("beforeSave", new VeiculoValidator());
    }
}
