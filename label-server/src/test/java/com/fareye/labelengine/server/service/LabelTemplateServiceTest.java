package com.fareye.labelengine.server.service;

import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.enumerator.TemplateStatus;
import com.fareye.labelengine.server.dto.LabelTemplateStatusRequestDto;
import com.fareye.labelengine.server.persistence.LabelTemplateEntity;
import com.fareye.labelengine.server.persistence.LabelTemplateRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class LabelTemplateServiceTest {

    @Mock
    private LabelTemplateRepository repository;

    @InjectMocks
    private LabelTemplateService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTemplateWithPrinterDpi() {
        LabelTemplateStatusRequestDto request = new LabelTemplateStatusRequestDto();
        request.setTemplateName("Test Template");
        request.setTemplateCode("TEST_CODE");
        request.setPrinterDpi(203);

        LabelTemplateEntity entity = new LabelTemplateEntity();
        entity.setId(1L);
        entity.setTemplateName("Test Template");
        entity.setTemplateCode("TEST_CODE");
        entity.setPrinterDpi(203);

        when(repository.save(any(LabelTemplateEntity.class))).thenReturn(entity);

        LabelTemplateEntity result = service.createTemplate(request);

        assertNotNull(result);
        assertEquals(203, result.getPrinterDpi());
        verify(repository, times(1)).save(any(LabelTemplateEntity.class));
    }

    @Test
    void testUpdateTemplateWithPrinterDpi() {
        LabelTemplateStatusRequestDto request = new LabelTemplateStatusRequestDto();
        request.setTemplateId(1L);
        request.setPrinterDpi(300);

        LabelTemplateEntity existing = new LabelTemplateEntity();
        existing.setId(1L);
        existing.setTemplateName("Existing Template");
        existing.setTemplateCode("EXISTING_CODE");

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(LabelTemplateEntity.class))).thenReturn(existing);

        LabelTemplateEntity result = service.updateTemplate(request);

        assertNotNull(result);
        assertEquals(300, result.getPrinterDpi());
        verify(repository, times(1)).save(existing);
    }

    @Test
    void testTemplateCodeExists() {
        when(repository.existsByTemplateCode("TEST_CODE")).thenReturn(true);

        boolean exists = service.templateCodeExists("TEST_CODE");

        assertTrue(exists);
        verify(repository, times(1)).existsByTemplateCode("TEST_CODE");
    }
}