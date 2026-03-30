package com.fareye.labelengine.server.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LabelTemplateRepository extends JpaRepository<LabelTemplateEntity, Long> {
    Optional<LabelTemplateEntity> findByTemplateCode(String templateCode);

    boolean existsByTemplateCode(String templateCode);

    Page<LabelTemplateEntity> findByTemplateNameContainingIgnoreCase(String templateName, Pageable pageable);
}
