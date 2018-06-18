package br.com.empresabdr.locadora.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.empresabdr.locadora.entity.Veiculo;

/**
 * @author Marco Lima
 */
public interface EmployeeRepository extends PagingAndSortingRepository<Veiculo, Long> {

}
