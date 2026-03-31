import { useState, useEffect } from 'react';
import * as zplRenderer from 'zpl-renderer-js';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/themes/prism.css';
import jsPDF from 'jspdf';

// Custom debounce function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

type DensityOption = {
  label: string;
  dpmm: number;
  dpi: number;
};

const densityOptions: DensityOption[] = [
  { label: '6 dpmm (152 dpi)', dpmm: 6, dpi: 152 },
  { label: '8 dpmm (203 dpi)', dpmm: 8, dpi: 203 },
  { label: '12 dpmm (300 dpi)', dpmm: 12, dpi: 300 },
  { label: '24 dpmm (600 dpi)', dpmm: 24, dpi: 600 },
];

type Unit = 'inches' | 'mm' | 'cm';

type LabelSize = {
  name: string;
  width: number;
  height: number;
  unit: Unit;
};

const labelSizes: LabelSize[] = [
  { name: 'Custom', width: 4, height: 6, unit: 'inches' },
  { name: 'A4', width: 210, height: 297, unit: 'mm' },
  { name: 'A5', width: 148, height: 210, unit: 'mm' },
  { name: 'A6', width: 105, height: 148, unit: 'mm' },
  { name: 'Letter', width: 8.5, height: 11, unit: 'inches' },
  { name: '4x6', width: 4, height: 6, unit: 'inches' },
  { name: '3x5', width: 3, height: 5, unit: 'inches' },
  { name: '2x3', width: 2, height: 3, unit: 'inches' },
  { name: '100x150mm', width: 100, height: 150, unit: 'mm' },
  { name: '80x120mm', width: 80, height: 120, unit: 'mm' },
];

function App() {
  const [zplText, setZplText] = useState('');
  const [density, setDensity] = useState<DensityOption>(densityOptions[0]);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(6);
  const [unit, setUnit] = useState<Unit>('inches');
  const [selectedSize, setSelectedSize] = useState('Custom');
  const [isReady, setIsReady] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    zplRenderer.ready.then(() => setIsReady(true)).catch(err => {
      setRenderError('WASM initialization failed: ' + err.message);
    });
  }, []);

  const handleLabelSizeChange = (e: any) => {
    const selectedLabel = labelSizes.find(s => s.name === e.target.value);
    if (selectedLabel) {
      setSelectedSize(selectedLabel.name);
      setWidth(selectedLabel.width);
      setHeight(selectedLabel.height);
      setUnit(selectedLabel.unit);
    }
  };

  const debouncedRender = debounce(async () => {
    if (!isReady || !zplText.trim()) {
      setRenderedImage(null);
      setRenderError(null);
      return;
    }
    try {
      const widthMm = width * (unit === 'inches' ? 25.4 : unit === 'cm' ? 10 : 1);
      const heightMm = height * (unit === 'inches' ? 25.4 : unit === 'cm' ? 10 : 1);
      
      const result: any = await zplRenderer.Render(zplText, widthMm, heightMm, density.dpmm);
      
      // The renderer returns a base64-encoded PNG string
      let dataUrl: string;
      if (typeof result === 'string') {
        // Check if it's already a data URL
        if (result.startsWith('data:')) {
          dataUrl = result;
        } else {
          // It's base64, add the prefix
          dataUrl = `data:image/png;base64,${result}`;
        }
      } else if (result && result.toDataURL && typeof result.toDataURL === 'function') {
        // Canvas fallback
        dataUrl = result.toDataURL('image/png');
      } else {
        throw new Error('Unexpected render result type');
      }
      
      setRenderedImage(dataUrl);
      setRenderError(null);
    } catch (error) {
      console.error('Render error:', error);
      setRenderError(error instanceof Error ? error.message : 'Unknown error during rendering');
      setRenderedImage(null);
    }
  }, 300);

  useEffect(() => {
    debouncedRender();
  }, [zplText, density, width, height, unit, isReady]);

const sampleZPLs = [
  { name: 'Hello World', zpl: '^XA^FO50,50^A0N,50,50^FDHello World^FS^XZ' },
  { name: 'Test Label', zpl: '^XA^FO10,10^A0N,36,36^FDTest^FS^FO10,50^A0N,24,24^FDLabel^FS^XZ' },
  { name: 'Simple Box', zpl: '^XA^FO50,50^GB100,100,2^FS^XZ' },
];

  const downloadPNG = () => {
    if (!renderedImage) return;
    const link = document.createElement('a');
    link.href = renderedImage;
    link.download = 'zpl-render.png';
    link.click();
  };

  const downloadPDF = () => {
    if (!renderedImage) return;
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'in',
      format: [width, height],
    });
    pdf.addImage(renderedImage, 'PNG', 0, 0, width, height);
    pdf.save('zpl-render.pdf');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Custom ZPL Viewer</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-gray-500 text-white rounded">
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <h2 className="text-xl mb-2">Configuration</h2>
            <div className="mb-4">
              <label className="block mb-1">Label Size Preset</label>
              <select
                value={selectedSize}
                onChange={handleLabelSizeChange}
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'}`}
              >
                {labelSizes.map(size => (
                  <option key={size.name} value={size.name}>{size.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Print Density</label>
              <select
                value={density.dpmm}
                onChange={(e) => setDensity(densityOptions.find(d => d.dpmm === parseInt(e.target.value))!)}
                className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'}`}
              >
                {densityOptions.map(d => (
                  <option key={d.dpmm} value={d.dpmm}>{d.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Paper Size</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={width}
                  onChange={(e) => {
                    setWidth(parseFloat(e.target.value));
                    setSelectedSize('Custom');
                  }}
                  className={`w-1/2 p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'}`}
                  placeholder="Width"
                  step="0.1"
                />
                <input
                  type="number"
                  value={height}
                  onChange={(e) => {
                    setHeight(parseFloat(e.target.value));
                    setSelectedSize('Custom');
                  }}
                  className={`w-1/2 p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'}`}
                  placeholder="Height"
                  step="0.1"
                />
              </div>
              <div className="mt-2">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className={`p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'}`}
                >
                  <option value="inches">Inches</option>
                  <option value="mm">Millimeters</option>
                  <option value="cm">Centimeters</option>
                </select>
              </div>
            </div>
            <h2 className="text-xl mb-2 mt-4">Export</h2>
            <div className="flex flex-col gap-2">
              <button onClick={downloadPNG} disabled={!renderedImage} className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 hover:bg-green-600">Download PNG</button>
              <button onClick={downloadPDF} disabled={!renderedImage} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600">Download PDF</button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-xl mb-2">ZPL Input</h2>
            <Editor
              value={zplText}
              onValueChange={setZplText}
              highlight={code => highlight(code, languages.clike, 'clike')}
              padding={15}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '300px',
              }}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={() => setZplText('')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Clear</button>
              {sampleZPLs.map((sample) => (
                <button key={sample.name} onClick={() => setZplText(sample.zpl)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{sample.name}</button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-xl mb-2">Preview</h2>
            {renderError && <div className={`mb-2 p-2 rounded ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>{renderError}</div>}
            <div className={`border p-4 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'} relative overflow-hidden`} style={{ aspectRatio: `${width}/${height}` }}>
              {renderedImage ? (
                <img
                  src={renderedImage}
                  alt="Rendered ZPL"
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ transform: `scale(${zoom})` }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No preview available</div>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="px-4 py-2 bg-gray-500 text-white rounded">-</button>
              <span className="px-4 py-2">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="px-4 py-2 bg-gray-500 text-white rounded">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;