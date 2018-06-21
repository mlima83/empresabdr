package br.com.empresabdr.locadora.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.empresabdr.locadora.entity.Veiculo;

/**
 * Classe responsável por permitir a acesso aos dados dos veículos no "banco"
 * @author Marco Lima
 */
public interface VeiculoRepository extends PagingAndSortingRepository<Veiculo, Long> {

}
