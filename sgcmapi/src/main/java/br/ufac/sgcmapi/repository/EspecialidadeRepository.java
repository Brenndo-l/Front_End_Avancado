package br.ufac.sgcmapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Especialidade;

public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {

    @Query("""
        SELECT e FROM Especialidade e WHERE e.nome LIKE %:termoBusca%   
    """)
    Page<Especialidade> busca(String termoBusca, Pageable page);
    
}
