import * as zplRenderer from 'zpl-renderer-js';

async function testRender() {
  try {
    await zplRenderer.ready;
    console.log('WASM ready');

    const zpl = '^XA^FO50,50^A0N,50,50^FDHello^FS^XZ';
    const result = await zplRenderer.Render(zpl, 100, 150, 8);
    
    console.log('Result type:', typeof result);
    console.log('Result constructor:', result?.constructor?.name);
    console.log('Result keys:', Object.keys(result || {}));
    console.log('Has toDataURL:', typeof result?.toDataURL);
    console.log('First 100 chars of result:', String(result).substring(0, 100));
    
    if (result instanceof Blob) {
      console.log('Result is a Blob');
      const url = URL.createObjectURL(result);
      console.log('Object URL created:', url.substring(0, 50));
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testRender();
