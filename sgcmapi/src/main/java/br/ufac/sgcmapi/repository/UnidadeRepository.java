package br.ufac.sgcmapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Unidade;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

    @Query("""
        SELECT u FROM Unidade u
        WHERE u.nome LIKE %:termoBusca%
        OR u.endereco LIKE %:termoBusca%
    """)
    Page<Unidade> busca(String termoBusca, Pageable page);
    
}
