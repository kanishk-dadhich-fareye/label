import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import * as zplRenderer from 'zpl-renderer-js';
import jsPDF from 'jspdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for rendering ZPL
app.post('/api/render', async (req, res) => {
  try {
    const { zpl, density = 8, width = 4, height = 6, unit = 'inches', format = 'png' } = req.body;

    if (!zpl || typeof zpl !== 'string') {
      return res.status(400).json({ error: 'ZPL text is required' });
    }

    // Convert dimensions to mm
    const widthMm = width * (unit === 'inches' ? 25.4 : unit === 'cm' ? 10 : 1);
    const heightMm = height * (unit === 'inches' ? 25.4 : unit === 'cm' ? 10 : 1);

    // Wait for WASM to be ready
    await zplRenderer.ready;

    // Render ZPL - returns base64 PNG string
    const base64Result = await zplRenderer.Render(zpl, widthMm, heightMm, density);
    
    // Convert base64 to data URL
    let pngDataUrl = base64Result;
    if (typeof base64Result === 'string' && !base64Result.startsWith('data:')) {
      pngDataUrl = `data:image/png;base64,${base64Result}`;
    }

    if (format === 'pdf') {
      // Create PDF
      const pdf = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'in',
        format: [width, height],
      });
      pdf.addImage(pngDataUrl, 'PNG', 0, 0, width, height);
      const pdfBuffer = pdf.output('arraybuffer');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="zpl-render.pdf"');
      res.send(Buffer.from(pdfBuffer));
    } else {
      // Return PNG data URL
      res.json({ image: pngDataUrl });
    }
  } catch (error) {
    console.error('Render error:', error);
    res.status(500).json({ error: error.message || 'Rendering failed' });
  }
});

// Catch all handler: send back React's index.html file for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});