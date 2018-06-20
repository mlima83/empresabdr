package br.com.empresabdr.locadora.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * Classe que representa as informações de um veículo.
 * @author Marco Lima
 */
@Data
@Entity
public class Veiculo {
	/**Identificador do veículo*/
	@Id @GeneratedValue
	private Long id;
	
	/**Nome*/
	private String nome;
	
	/**Ano*/
	private Integer ano;
	
	/**Cor predominante*/
	private String cor;
	
	/**Placa*/
	private String placa;
	
	/**Representa a versão do dado*/
	@Version @JsonIgnore
	private Long version;
	
	/**Construtor padrão*/
	public Veiculo() {}

	/**Construtor com os atributos*/
	public Veiculo(String nome, Integer ano, String cor, String placa) {
		this.nome = nome;
		this.ano = ano;
		this.cor = cor;
		this.placa = placa;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getAno() {
		return ano;
	}

	public void setAno(Integer ano) {
		this.ano = ano;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}
}
