package com.fareye.labelengine.core;

import com.fareye.labelengine.constants.LabelPdfConstants;
import com.openhtmltopdf.bidi.support.ICUBidiReorderer;
import com.openhtmltopdf.bidi.support.ICUBidiSplitter;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.StringTemplateResolver;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

public class LabelTemplateRenderer {

    private static final String STYLE_TAG = "style";

    public Path renderPdf(String htmlTemplate,
                          Map<String, Object> model,
                          String pageSize,
                          Path outputDir) throws IOException {
        Files.createDirectories(outputDir);
        String tempName = "label_" + System.currentTimeMillis() + "_" + UUID.randomUUID();

        String htmlString = getTemplateFromAttributes(htmlTemplate, model);
        String styleTag = getStyleTag(htmlString);
        if (!styleTag.isBlank()) {
            htmlString = htmlString.replaceAll("<style([\\s\\S]+?)</style>", "");
        }

        htmlString = getCompleteHtml(tempName, htmlString);
        htmlString = findAndReplaceBadHtml(htmlString);
        htmlString = applyExternalStyles(htmlString, styleTag);
        if (!htmlString.contains("</img>")) {
            htmlString = htmlString.replaceAll("((<img[^>]+)(?<!/)>)", "$1</img>");
        }

        List<Float> widthAndHeight = setPageWidthHeight(pageSize);
        Path outFile = outputDir.resolve(tempName + ".pdf");
        exportToPdfBox(outFile.toFile(), htmlString, widthAndHeight);
        return outFile;
    }

    public Path renderZpl(String zplTemplate,
                          Map<String, Object> model,
                          Path outputDir) throws IOException {
        Files.createDirectories(outputDir);
        String tempName = "label_" + System.currentTimeMillis() + "_" + UUID.randomUUID();
        String zplContent = getTemplateFromAttributes(zplTemplate, model, true);
        Path outFile = outputDir.resolve(tempName + ".zpl");
        try (FileWriter writer = new FileWriter(outFile.toFile())) {
            writer.write(zplContent);
        }
        return outFile;
    }

    private String getTemplateFromAttributes(String content, Map<String, Object> attr) {
        return getTemplateFromAttributes(content, attr, false);
    }

    private String getTemplateFromAttributes(String content, Map<String, Object> attr, boolean zpl) {
        Context context = new Context(new Locale("US"));
        if (attr != null) {
            attr.forEach(context::setVariable);
        }
        return getTemplateEngine(zpl).process(content, context);
    }

    private TemplateEngine getTemplateEngine(boolean zpl) {
        TemplateEngine templateEngine = new TemplateEngine();
        StringTemplateResolver stringTemplateResolver = new StringTemplateResolver();
        if (zpl) {
            stringTemplateResolver.setTemplateMode(TemplateMode.TEXT);
            stringTemplateResolver.setCacheable(false);
        }
        templateEngine.setTemplateResolver(stringTemplateResolver);
        return templateEngine;
    }

    private String getCompleteHtml(String tempFileName, String html) {
        String template = "";
        return "<html>\n" +
                "<head>\n" +
                "<style>\n" +
                "@page { margin: 0; }" +
                "body { margin: 0; }" +
                "@font-face {" +
                "font-family: 'custom-font';" +
                "src: url('/tmp/" + tempFileName + "/ARIALUNI.TTF');" +
                "}" +
                ".page-break-here{page-break-after: always;}" +
                ".page-break-here:last-child { page-break-after: avoid; }" +
                template +
                "table { page-break-inside:auto }\n" +
                "tr { page-break-inside:avoid; page-break-after:auto }\n" +
                "thead { display:table-header-group }\n" +
                "tfoot { display:table-footer-group }\n" +
                "</style>\n" +
                "</head>\n" +
                "<body style=\"font-family: custom-font; margin: 0 auto;\">\n" +
                "<div>" + html + "</div>" +
                "</body>\n" +
                "</html>";
    }

    private String findAndReplaceBadHtml(String inputHtml) {
        if (inputHtml == null || inputHtml.isBlank()) {
            return inputHtml;
        }
        if (inputHtml.contains("&lt")) {
            inputHtml = inputHtml.replaceAll("&lt;", "<");
        }
        if (inputHtml.contains("&gt")) {
            inputHtml = inputHtml.replaceAll("&gt;", ">");
        }
        return inputHtml;
    }

    private String applyExternalStyles(String htmlString, String externalStyle) {
        if (externalStyle != null && !externalStyle.isBlank() && htmlString != null && !htmlString.isBlank()) {
            Document document = Jsoup.parse(htmlString);
            String oldStyle = document.select(STYLE_TAG).html();
            document.select(STYLE_TAG).html(oldStyle + externalStyle);
            htmlString = document.html();
        }
        return htmlString;
    }

    private String getStyleTag(String htmlString) {
        if (htmlString == null || htmlString.isBlank()) {
            return "";
        }
        Document document = Jsoup.parse(htmlString);
        if (!document.select(STYLE_TAG).isEmpty()) {
            return document.select(STYLE_TAG).first().data();
        }
        return "";
    }

    private void exportToPdfBox(File outFile, String htmlContent, List<Float> widthHeight) throws IOException {
        OutputStream os = null;
        try {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useUnicodeBidiSplitter(new ICUBidiSplitter.ICUBidiSplitterFactory());
            builder.useUnicodeBidiReorderer(new ICUBidiReorderer());
            builder.defaultTextDirection(PdfRendererBuilder.TextDirection.LTR);
            builder.defaultTextDirection(PdfRendererBuilder.TextDirection.LTR);
            builder.useDefaultPageSize(widthHeight.get(0), widthHeight.get(1), PdfRendererBuilder.PageSizeUnits.INCHES);
            builder.withHtmlContent(htmlContent, "file:///tmp");
            os = new FileOutputStream(outFile);
            builder.toStream(os);
            builder.run();
        } catch (Exception e) {
            throw new IOException("Failed to render PDF: " + e.getMessage(), e);
        } finally {
            if (os != null) {
                os.close();
            }
        }
    }

    private static final float MAX_WIDTH_MM = 594.0f; // A1 width
    private static final float MAX_HEIGHT_MM = 841.0f; // A1 height

    private List<Float> setPageWidthHeight(String pageSize) {
        float width = 8.27f;
        float height = 11.69f;
        List<Float> widthAndHeight = new ArrayList<>();

        if (pageSize == null) {
            widthAndHeight.add(width);
            widthAndHeight.add(height);
            return widthAndHeight;
        }

        if (pageSize.contains(LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_CUSTOM)) {
            List<String> formatWidthHeight = Arrays.asList(pageSize.split("@", 5));
            if (formatWidthHeight.size() < 3) {
                // If malformed, fall back to default
                widthAndHeight.add(width);
                widthAndHeight.add(height);
                return widthAndHeight;
            }
            try {
                double customWidthInMm = Double.parseDouble(formatWidthHeight.get(1));
                double customHeightInMm = Double.parseDouble(formatWidthHeight.get(2));
                // Check if the custom size exceeds the maximum allowed size (A1: 594mm x 841mm in either orientation)
                if (!((customWidthInMm <= MAX_WIDTH_MM && customHeightInMm <= MAX_HEIGHT_MM) ||
                      (customWidthInMm <= MAX_HEIGHT_MM && customHeightInMm <= MAX_WIDTH_MM))) {
                    throw new IllegalArgumentException(
                        String.format("Custom label size exceeds maximum allowed size of %dmm x %dmm (A1). " +
                                      "Provided: %.2fmm x %.2fmm", 
                                      (int)MAX_WIDTH_MM, (int)MAX_HEIGHT_MM, 
                                      customWidthInMm, customHeightInMm));
                }
                width = convertMmToInches(customWidthInMm);
                height = convertMmToInches(customHeightInMm);
            } catch (NumberFormatException e) {
                // If parsing fails, fall back to default
                widthAndHeight.add(width);
                widthAndHeight.add(height);
                return widthAndHeight;
            }
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_4x6.equalsIgnoreCase(pageSize)) {
            width = 4f;
            height = 6f;
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_6x4.equalsIgnoreCase(pageSize)) {
            width = 6f;
            height = 4f;
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_2x3.equalsIgnoreCase(pageSize)) {
            width = 2f;
            height = 3f;
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_FULL.equalsIgnoreCase(pageSize)
                || LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_A4.equalsIgnoreCase(pageSize)) {
            width = 8.27f;
            height = 11.69f;
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_HALF.equalsIgnoreCase(pageSize)
                || LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_A5.equalsIgnoreCase(pageSize)) {
            width = 8.27f;
            height = 5.82677f;
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_QUARTER.equalsIgnoreCase(pageSize)
                || LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_A6.equalsIgnoreCase(pageSize)) {
            width = 5.82677f;
            height = 4.134f;
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_SIXTH.equalsIgnoreCase(pageSize)) {
            width = 3.89f;
            height = 5.82677f;
        } else if (LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_EIGHT.equalsIgnoreCase(pageSize)
                || LabelPdfConstants.LABEL_TEMPLATE_PAGE_SIZE_A7.equalsIgnoreCase(pageSize)) {
            width = 4.134f;
            height = 2.913f;
        } else {
            // If pageSize doesn't match any known format, use default
            widthAndHeight.add(width);
            widthAndHeight.add(height);
            return widthAndHeight;
        }

        widthAndHeight.add(width);
        widthAndHeight.add(height);
        return widthAndHeight;
    }

    private float convertMmToInches(double mm) {
        return (float) (mm / 25.4);
    }
}
