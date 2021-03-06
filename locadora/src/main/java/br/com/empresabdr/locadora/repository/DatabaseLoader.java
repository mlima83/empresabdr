package br.com.empresabdr.locadora.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import br.com.empresabdr.locadora.entity.Veiculo;

/**
 * Classe responsável por carregar alguma massa de dados inicial.
 * @author Marco Lima
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final VeiculoRepository repository;

	@Autowired
	public DatabaseLoader(VeiculoRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {

		this.repository.save(new Veiculo("Gol G4", 2017, "Vermelho", "HHH-9999"));
		this.repository.save(new Veiculo("Hillux", 2018, "Preto", "HHH-1111"));
	}
}
