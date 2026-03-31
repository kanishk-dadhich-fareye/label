Pura bbg- Kanishk ne banaya hai
isme abhi vo ZPL wala kaam nahi karta
# Label Engine (Library-First)

This repository isolates the label selection and rendering flow into a standalone library, while keeping the same rendering libraries used in SHIP. It includes a complete ZPL label preview system with integrated custom ZPL viewer.

## Modules
- `label-model`: DTOs and enums, including ZPL preview models.
- `label-core`: template selection + PDF/ZPL rendering.
- `label-adapters`: interfaces to integrate with existing stores and caches.
- `label-demo`: standalone runnable demo.
- `label-server`: Spring Boot API for template CRUD and ZPL preview functionality.
- `label-ui`: React UI that reuses the FCR label template editor and preview.
- `custom-zpl-viewer`: Git submodule containing the custom ZPL rendering service.

## Quick Start

### Prerequisites
- Java 21
- Maven 3.6+
- Node.js 16+ (for UI and custom ZPL viewer)
- PostgreSQL (optional, for persistence)

### Running the Complete System

1. **Clone with submodules**:
   ```bash
   git clone <repository-url>
   git submodule update --init --recursive
   ```

2. **Start Custom ZPL Viewer** (Port 3000):
   ```bash
   cd custom-zpl-viewer
   npm install
   npm run dev
   ```

3. **Start Label Engine Server** (Port 8090):
   ```bash
   cd label
   mvn spring-boot:run
   ```

4. **Start UI** (Port 5173):
   ```bash
   cd label-ui
   npm install
   npm run dev
   ```

## Database Setup (Postgres)

The label server persists templates in Postgres. Configure via environment variables:
- `LABEL_ENGINE_DB_URL` (default `jdbc:postgresql://localhost:5432/label_engine`)
- `LABEL_ENGINE_DB_USER` (default `label_engine`)
- `LABEL_ENGINE_DB_PASSWORD` (default `label_engine`)

Quick start with Docker:
```bash
docker run --name label-engine-db \
  -e POSTGRES_DB=label_engine \
  -e POSTGRES_USER=label_engine \
  -e POSTGRES_PASSWORD=label_engine \
  -p 5432:5432 \
  -d postgres:15
```

## API Endpoints

### Template Management
- `GET /app/rest/label_generation/get/labelTemplate` - List templates
- `POST /app/rest/label_generation/addOrUpdate/labelTemplate` - Create/update template
- `POST /app/rest/label_generation/save/labelTemplate` - Save ZPL template
- `DELETE /app/rest/label_generation/delete/labelTemplate/{id}` - Delete template

### Rendering
- `POST /app/rest/label_generation/render` - Render template to PDF/ZPL

### ZPL Preview (New Feature)
- `POST /app/rest/label_generation/preview/labelTemplate/{id}` - Generate PNG preview

**Rate Limit**: 60 requests per minute per client

## ZPL Preview Feature

The ZPL preview feature allows you to generate PNG images of ZPL labels for preview purposes.

### Requirements
- Custom ZPL Viewer service must be running on port 3000
- Valid ZPL template with `^FD` commands
- Supported densities: 6, 8, 12, 24 DPMM

### API Usage

Create a template first:
```bash
curl -X POST http://localhost:8090/app/rest/label_generation/save/labelTemplate \
  -H "Content-Type: application/json" \
  -d '{
    "templateCode": "SAMPLE_ZPL",
    "zplTemplate": "^XA^FO50,50^ADN,36,20^FDHello World^FS^XZ"
  }'
```

Generate preview:
```bash
curl -X POST http://localhost:8090/app/rest/label_generation/preview/labelTemplate/{id} \
  -H "Content-Type: application/json" \
  -o preview.png \
  -d '{
    "width": 4,
    "height": 6,
    "density": 8
  }'
```

### Custom ZPL Viewer

The custom ZPL viewer is a Node.js service that provides accurate ZPL rendering using WebAssembly.

**Features**:
- High-fidelity ZPL rendering
- Multiple density support
- PNG output format
- RESTful API

**API Endpoint**: `POST /api/render`
**Payload**:
```json
{
  "zpl": "^XA^FO50,50^ADN,36,20^FDHello World^FS^XZ",
  "density": 8,
  "width": 4,
  "height": 6
}
```

## Development

### Building
```bash
# Build all modules
mvn clean package

# Build specific module
mvn -pl label-server -am package
```

### Testing
```bash
# Run demo
mvn -q -pl label-demo -am package
java -cp label-demo/target/label-demo-0.1.0-SNAPSHOT.jar com.fareye.labelengine.demo.LabelDemoApp
```

### Code Structure
```
label/
├── label-model/          # DTOs, enums, exceptions
├── label-core/           # Business logic, rendering
├── label-adapters/       # Integration interfaces
├── label-server/         # Spring Boot application
│   ├── src/main/java/com/fareye/labelengine/server/
│   │   ├── controller/   # REST endpoints
│   │   ├── service/      # Business services
│   │   ├── exception/    # Custom exceptions
│   │   └── config/       # Configuration classes
├── label-ui/             # React frontend
├── custom-zpl-viewer/    # ZPL rendering service (submodule)
└── vendor/               # Third-party libraries
```

## Barcode Usage

Use `TemplateDataTypes` to generate barcodes and reference them in templates:

```java
TemplateDataTypes tracking = new TemplateDataTypes("TRK123", "demo_123");
String html = "<img th:src=\"${tracking.code128}\" />";
```

Barcode images are written under `/tmp/<tempFileName>/` and embedded in the rendered PDF.

## Troubleshooting

### ZPL Preview Issues
- Ensure custom-zpl-viewer is running on port 3000
- Check ZPL template contains `^FD` commands
- Verify density values (6, 8, 12, 24 DPMM)
- Check rate limit (max 60 req/min)

### Database Connection
- Verify PostgreSQL is running
- Check environment variables
- Use Docker for quick setup

### Build Issues
- Ensure Java 21 is installed
- Run `mvn clean` before building
- Check for compilation errors in all modules

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Update tests
5. Submit a pull request

## License

[Add license information here]

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed changes.
