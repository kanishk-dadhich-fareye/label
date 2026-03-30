# Label Engine (Library-First)

This repository isolates the label selection and rendering flow into a standalone library, while keeping the same rendering libraries used in SHIP.

## Modules
- `label-model`: DTOs and enums.
- `label-core`: template selection + PDF/ZPL rendering.
- `label-adapters`: interfaces to integrate with existing stores and caches.
- `label-demo`: standalone runnable demo.
- `label-server`: minimal Spring Boot API for template CRUD (matches FCR label template endpoints).
- `label-ui`: React UI that reuses the FCR label template editor and preview.

## Quick Run
From repo root:
```
mvn -q -pl label-demo -am package
java -cp label-demo/target/label-demo-0.1.0-SNAPSHOT.jar com.fareye.labelengine.demo.LabelDemoApp
```

Output will be written under `/tmp/label-engine-demo`.

## Database (Postgres)
The label server persists templates in Postgres. Configure via environment variables:
- `LABEL_ENGINE_DB_URL` (default `jdbc:postgresql://localhost:5432/label_engine`)
- `LABEL_ENGINE_DB_USER` (default `label_engine`)
- `LABEL_ENGINE_DB_PASSWORD` (default `label_engine`)

Optional quick start with Docker:
```
docker run --name label-engine-db \
  -e POSTGRES_DB=label_engine \
  -e POSTGRES_USER=label_engine \
  -e POSTGRES_PASSWORD=label_engine \
  -p 5432:5432 \
  -d postgres:15
```

### Label Template Editor
Run the API server (port `8090`):
```
mvn -q -pl label-server -am spring-boot:run
```

Run the UI:
```
cd label-ui
npm install
npm run dev
```

The UI uses Vite proxying to call `http://localhost:8090` for `/app/rest/label_generation/*`.
You can override the API base with `VITE_LABEL_SERVER_URL` (e.g., `http://localhost:8090`).

## Label Render API (PDF/ZPL)
Render a stored template (PDF by default):
```
curl -X POST http://localhost:8090/app/rest/label_generation/render \
  -H "Content-Type: application/json" \
  -o /tmp/label-engine-render.pdf \
  -d '{
    "templateCode": "SAMPLE_4X6",
    "pageSize": "4x6",
    "format": "PDF",
    "data": {
      "tracking": "TRK123456"
    }
  }'
```

Render ZPL:
```
curl -X POST http://localhost:8090/app/rest/label_generation/render \
  -H "Content-Type: application/json" \
  -o /tmp/label-engine-render.zpl \
  -d '{
    "templateCode": "SAMPLE_4X6",
    "format": "ZPL",
    "data": {
      "tracking": "TRK123456"
    }
  }'
```

## Barcode Usage
Use `TemplateDataTypes` to generate barcodes and reference them in templates:

```java
TemplateDataTypes tracking = new TemplateDataTypes("TRK123", "demo_123");
String html = "<img th:src=\"${tracking.code128}\" />";
```

Barcode images are written under `/tmp/<tempFileName>/` and embedded in the rendered PDF.
