/**
 * Simple test endpoint to isolate API Template.io issues
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAPITemplateClient } from '@/lib/pdf-generation/apitemplate-client';

export async function GET(request: NextRequest) {
  try {
    const client = createAPITemplateClient();
    
    // Very simple HTML template
    const simpleHTML = `
      <html>
        <head><title>Test</title></head>
        <body>
          <h1>Hello {{name}}!</h1>
          <p>This is a test PDF generated on {{date}}.</p>
          <p>Organization: {{organization}}</p>
        </body>
      </html>
    `;
    
    const simpleCSS = `
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #3b82f6; }
      </style>
    `;
    
    const simpleData = {
      name: 'Test User',
      organization: 'Test Organization',
      date: new Date().toLocaleDateString()
    };

    console.log('Testing API Template.io with simple data...');
    
    // Generate PDF
    const result = await client.generatePDFFromHTML(
      simpleHTML,
      simpleCSS,
      simpleData,
      {
        fileName: 'simple-test.pdf',
        exportType: 'json',
        outputFormat: 'pdf'
      }
    );

    console.log('API Template.io result:', result);

    if (result.status !== 'success' || !result.download_url) {
      return NextResponse.json({
        success: false,
        error: 'PDF generation failed',
        details: result.error || result.message || 'Unknown error',
        apiResponse: result
      }, { status: 500 });
    }

    // Download the PDF
    const pdfBuffer = await client.downloadPDF(result.download_url);
    
    // Return PDF
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', 'attachment; filename="simple-test.pdf"');
    headers.set('Content-Length', pdfBuffer.length.toString());

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Simple test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Simple test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}