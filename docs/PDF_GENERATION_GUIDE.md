# PDF Generation System Documentation

## Overview

The L4YERCAK3 PDF generation system creates beautiful, professional value reports using **APITemplate.io** - a powerful API for generating PDFs from HTML templates. This system is production-ready, scalable, and easy to replicate in other applications.

## Why APITemplate.io?

- **HTML/CSS Based**: Write templates using familiar web technologies
- **API-Driven**: Simple REST API for PDF generation
- **Beautiful Output**: Professional-quality PDFs with full styling support
- **Reliable**: Production-grade service with high availability
- **Fast**: PDFs generated in seconds
- **Scalable**: Handles high volumes without infrastructure management

## Quick Start

### 1. Get Your API Key

Sign up at [APITemplate.io](https://apitemplate.io) and get your API key.

### 2. Set Environment Variables

```bash
APITEMPLATE_API_KEY=your_api_key_here
APITEMPLATE_BASE_URL=https://api.apitemplate.io
```

### 3. Install Dependencies

```bash
npm install axios
```

### 4. Basic Implementation

```typescript
import { getAPITemplateGenerator } from '@/lib/pdf-generation/apitemplate-generator';

// Generate a PDF
const generator = getAPITemplateGenerator();
const result = await generator.generateValueReportSafe(leadData, calculatedValues);

if (result.success) {
  // Send PDF via email or download
  const pdfBuffer = result.pdf;
  const filename = result.filename;
} else {
  console.error('PDF generation failed:', result.error);
}
```

## Architecture

### Core Components

```
src/lib/pdf-generation/
├── apitemplate-client.ts         # API client for APITemplate.io
├── apitemplate-generator.ts      # Main PDF generator class
├── index.ts                      # Public exports
├── templates/
│   ├── simple-value-report.ts   # Simple 1-page template
│   ├── value-report-html.ts     # Complex 4-page template
│   ├── localized-content.ts     # Bilingual content
│   └── base.ts                  # Base template utilities
├── content/
│   ├── en.ts                    # English translations
│   ├── de.ts                    # German translations
│   └── replacements.ts          # Content helpers
└── utils/
    ├── helpers.ts               # Formatting utilities
    └── styles.ts                # Shared CSS styles
```

## Key Files Explained

### 1. `apitemplate-client.ts` - API Client

The core HTTP client for communicating with APITemplate.io:

```typescript
export interface APITemplateClient {
  generateAndDownloadPDF(
    htmlTemplate: string,
    cssTemplate: string,
    data: Record<string, any>,
    options?: GeneratePDFOptions
  ): Promise<Buffer>;
}
```

**Key Features:**
- Automatic retry logic with exponential backoff
- Request/response validation
- Error handling with detailed messages
- Download URL to Buffer conversion
- Configurable timeouts

**Environment Variables:**
- `APITEMPLATE_API_KEY` (required)
- `APITEMPLATE_BASE_URL` (optional, defaults to production)

### 2. `apitemplate-generator.ts` - Main Generator

High-level PDF generation with business logic:

```typescript
const generator = new APITemplateValueReportGenerator();

// Safe generation with validation
const result = await generator.generateValueReportSafe(leadData, calculatedValues);

// Test API connection
const health = await generator.testConnection();

// Get service health
const status = await generator.getHealthStatus();
```

**Key Methods:**
- `generateValueReport()` - Core generation
- `generateValueReportSafe()` - With validation & error handling
- `validateInputData()` - Pre-flight validation
- `testConnection()` - API health check
- `getHealthStatus()` - Service status

### 3. Template Files

#### Simple Template (`simple-value-report.ts`)

Single-page executive summary - perfect for quick reports:

```typescript
export const SIMPLE_VALUE_REPORT_HTML = `
<div class="page">
  <h1>{{company_name}}</h1>
  <p>Total Value: €{{total_value}}</p>
  <!-- More content -->
</div>
`;

export const SIMPLE_VALUE_REPORT_CSS = `
<style>
  body { font-family: 'Arial', sans-serif; }
  .page { padding: 40px; }
  /* More styles */
</style>
`;
```

#### Complex Template (`value-report-html.ts`)

Multi-page comprehensive report with:
- Executive summary
- Task breakdown
- Growth scenarios
- Pilot metrics
- Charts and visualizations

### 4. Data Transformation (`apitemplate-client.ts`)

Converts your application data into template-ready format:

```typescript
export function transformDataForTemplate(
  leadData: LeadData,
  calculatedValues: CalculatedValues
): Record<string, any> {
  return {
    // Company info
    company_name: leadData.organizationName,
    contact_name: leadData.fullName,

    // Financial data
    total_value: formatCurrency(calculatedValues.totalValueCreated),
    annual_waste: formatCurrency(calculatedValues.annualWaste),
    roi_percentage: formatPercentage(calculatedValues.roi),

    // Hours saved
    hours_freed: formatNumber(calculatedValues.potentialFreedHours),

    // Pricing
    target_price: formatCurrency(calculatedValues.pricing.target.annualPrice),

    // More fields...
  };
}
```

## Creating Your Own Template

### Step 1: Design Your HTML

```typescript
export const MY_REPORT_HTML = `
<div class="page">
  <header>
    <h1>{{report_title}}</h1>
    <p>Generated for: {{company_name}}</p>
  </header>

  <section class="content">
    <h2>Summary</h2>
    <p>{{summary_text}}</p>

    <div class="metrics">
      <div class="metric">
        <span class="value">{{metric_1}}</span>
        <span class="label">Revenue</span>
      </div>
      <!-- More metrics -->
    </div>
  </section>

  <footer>
    <p>Report Date: {{date}}</p>
  </footer>
</div>
`;
```

### Step 2: Style with CSS

```typescript
export const MY_REPORT_CSS = `
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #333;
  }

  .page {
    width: 210mm;  /* A4 width */
    min-height: 297mm;  /* A4 height */
    padding: 20mm;
    background: white;
  }

  header {
    border-bottom: 2px solid #2563eb;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  h1 {
    font-size: 32px;
    color: #2563eb;
    margin-bottom: 10px;
  }

  .metrics {
    display: flex;
    gap: 20px;
    margin: 30px 0;
  }

  .metric {
    flex: 1;
    text-align: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
  }

  .value {
    display: block;
    font-size: 36px;
    font-weight: bold;
    color: #2563eb;
    margin-bottom: 10px;
  }

  .label {
    display: block;
    font-size: 14px;
    color: #64748b;
    text-transform: uppercase;
  }
</style>
`;
```

### Step 3: Transform Your Data

```typescript
function transformMyReportData(myData: MyDataType): Record<string, any> {
  return {
    report_title: "My Awesome Report",
    company_name: myData.companyName,
    summary_text: myData.summary,
    metric_1: formatCurrency(myData.revenue),
    date: formatDate(new Date()),
  };
}
```

### Step 4: Generate the PDF

```typescript
import { createAPITemplateClient } from './apitemplate-client';
import { MY_REPORT_HTML, MY_REPORT_CSS } from './my-report-template';

const client = createAPITemplateClient();

async function generateMyReport(myData: MyDataType): Promise<Buffer> {
  const templateData = transformMyReportData(myData);

  return await client.generateAndDownloadPDF(
    MY_REPORT_HTML,
    MY_REPORT_CSS,
    templateData,
    {
      fileName: 'my-report.pdf',
      exportType: 'json',
      outputFormat: 'pdf',
      expiration: 3600,
    }
  );
}
```

## Template Variables

APITemplate.io uses Handlebars-style syntax:

```html
<!-- Simple variable -->
<p>{{variable_name}}</p>

<!-- Conditional rendering -->
{{#if show_section}}
  <div>This shows when show_section is true</div>
{{/if}}

<!-- Loop through arrays -->
{{#each items}}
  <li>{{name}} - {{value}}</li>
{{/each}}

<!-- Number formatting -->
<span>€{{format_currency amount}}</span>
```

## Styling Best Practices

### 1. Use Inline Styles for Critical Elements

```html
<div style="page-break-after: always;">
  <!-- Page content -->
</div>
```

### 2. Define Global Styles in CSS Block

```css
<style>
  @page {
    size: A4;
    margin: 20mm;
  }

  body {
    font-family: Arial, sans-serif;
  }
</style>
```

### 3. Page Break Control

```css
.page-break {
  page-break-after: always;
  break-after: page;
}

.no-break {
  page-break-inside: avoid;
  break-inside: avoid;
}
```

### 4. Print-Safe Colors

```css
/* Use web-safe colors that print well */
:root {
  --primary: #2563eb;  /* Blue */
  --success: #10b981;  /* Green */
  --warning: #f59e0b;  /* Orange */
  --danger: #ef4444;   /* Red */
}
```

## API Reference

### Client Methods

#### `createAPITemplateClient()`

Creates an API client instance with automatic retry and error handling.

```typescript
const client = createAPITemplateClient();
```

#### `generateAndDownloadPDF()`

Generates a PDF and returns it as a Buffer.

```typescript
const pdfBuffer = await client.generateAndDownloadPDF(
  htmlTemplate: string,      // HTML template with {{variables}}
  cssTemplate: string,        // CSS styles
  data: Record<string, any>,  // Template data
  options?: {
    fileName?: string;        // Output filename
    exportType?: 'json';      // Response format
    outputFormat?: 'pdf';     // Output format
    expiration?: number;      // URL expiration (seconds)
  }
);
```

### Generator Methods

#### `getAPITemplateGenerator()`

Get singleton generator instance.

```typescript
const generator = getAPITemplateGenerator();
```

#### `generateValueReportSafe()`

Generate PDF with validation and error handling.

```typescript
const result = await generator.generateValueReportSafe(leadData, calculatedValues);

if (result.success) {
  const pdf: Buffer = result.pdf;
  const filename: string = result.filename;
} else {
  const error: string = result.error;
}
```

## Utility Functions

Located in `src/lib/pdf-generation/utils/helpers.ts`:

```typescript
// Currency formatting
formatCurrency(123456.78, 'en');  // "€123,456.78"
formatCurrency(123456.78, 'de');  // "123.456,78 €"

// Number formatting
formatNumber(1234567);  // "1,234,567"

// Percentage formatting
formatPercentage(0.456);  // "45.6%"

// Date formatting
formatDate(new Date(), 'en');  // "January 15, 2025"
formatDate(new Date(), 'de');  // "15. Januar 2025"

// Generate filename
generatePDFFilename('Acme Corp', 'en');
// Output: "L4YERCAK3_Value_Report_Acme_Corp_2025-01-15.pdf"
```

## Error Handling

The system provides comprehensive error handling:

```typescript
try {
  const result = await generator.generateValueReportSafe(leadData, calculatedValues);

  if (!result.success) {
    // Handle specific errors
    if (result.error?.includes('API key')) {
      console.error('Configuration error');
    } else if (result.error?.includes('temporarily unavailable')) {
      console.error('Service down');
    } else {
      console.error('Generation failed:', result.error);
    }
  }
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error);
}
```

## Integration Example

Complete integration with email delivery:

```typescript
import { getAPITemplateGenerator } from '@/lib/pdf-generation/apitemplate-generator';
import { sendEmailWithRetry } from '@/lib/email-delivery/resend-client';

async function generateAndSendReport(leadData, calculatedValues) {
  // Generate PDF
  const generator = getAPITemplateGenerator();
  const result = await generator.generateValueReportSafe(leadData, calculatedValues);

  if (!result.success) {
    throw new Error(`PDF generation failed: ${result.error}`);
  }

  // Send via email
  await sendEmailWithRetry({
    from: 'reports@yourdomain.com',
    to: leadData.email,
    subject: 'Your Value Report',
    html: '<p>See attached report</p>',
    attachments: [{
      filename: result.filename,
      content: result.pdf,
      contentType: 'application/pdf'
    }]
  });
}
```

## Testing

### Test API Connection

```typescript
const generator = getAPITemplateGenerator();
const test = await generator.testConnection();

if (test.success) {
  console.log('✅ API connection working');
} else {
  console.error('❌ API connection failed:', test.error);
}
```

### Health Check Endpoint

```typescript
// Example API route: /api/pdf/health
export async function GET() {
  const generator = getAPITemplateGenerator();
  const health = await generator.getHealthStatus();

  return Response.json(health);
}
```

## Performance Optimization

### 1. Singleton Pattern

The generator uses a singleton to avoid creating multiple instances:

```typescript
let generatorInstance: APITemplateValueReportGenerator | null = null;

export function getAPITemplateGenerator() {
  if (!generatorInstance) {
    generatorInstance = new APITemplateValueReportGenerator();
  }
  return generatorInstance;
}
```

### 2. Retry Logic

Automatic retry with exponential backoff for failed requests:

```typescript
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
```

### 3. Caching (Optional)

Consider caching generated PDFs for identical inputs:

```typescript
const pdfCache = new Map<string, Buffer>();

function getCacheKey(leadData, calculatedValues) {
  return JSON.stringify({ leadData, calculatedValues });
}
```

## Troubleshooting

### Common Issues

**1. "API key not configured"**
- Set `APITEMPLATE_API_KEY` environment variable
- Verify the key is valid on APITemplate.io dashboard

**2. "Request timeout"**
- Check network connectivity
- Increase timeout in client configuration
- Verify APITemplate.io service status

**3. "PDF generation failed"**
- Check template syntax (valid HTML)
- Verify all {{variables}} have data
- Review CSS for print compatibility

**4. "Validation failed"**
- Ensure all required fields are provided
- Check numeric values are positive
- Verify language is 'en' or 'de'

### Debug Mode

Enable detailed logging:

```typescript
// In apitemplate-client.ts
const DEBUG = true;

if (DEBUG) {
  console.log('Request:', { htmlTemplate, cssTemplate, data, options });
}
```

## Migration from Other Solutions

### From Puppeteer/Playwright

APITemplate.io is simpler and more reliable:

**Before:**
```typescript
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html);
const pdf = await page.pdf();
await browser.close();
```

**After:**
```typescript
const pdf = await client.generateAndDownloadPDF(html, css, data);
```

### From HTML-to-PDF Libraries

No more complex configuration:

**Before:**
```typescript
const pdf = await pdfService.generate({
  html,
  css,
  options: { format: 'A4', margin: '20mm' }
});
```

**After:**
```typescript
const pdf = await client.generateAndDownloadPDF(html, css, data);
```

## Cost Considerations

APITemplate.io pricing (as of 2024):
- Free tier: 50 PDFs/month
- Starter: $29/month - 500 PDFs
- Pro: $99/month - 3000 PDFs
- Enterprise: Custom pricing

**Cost optimization:**
- Cache identical reports
- Use webhooks for async generation
- Batch multiple reports

## Security Best Practices

1. **Never commit API keys**
   ```bash
   # .gitignore
   .env
   .env.local
   ```

2. **Validate input data**
   ```typescript
   if (!isValidEmail(leadData.email)) {
     throw new Error('Invalid email');
   }
   ```

3. **Sanitize user content**
   ```typescript
   const sanitized = sanitizeHtml(userInput);
   ```

4. **Set PDF expiration**
   ```typescript
   expiration: 3600  // 1 hour
   ```

## Next Steps

1. **Customize templates** - Edit HTML/CSS in template files
2. **Add new templates** - Create new template files for different report types
3. **Enhance styling** - Update CSS with your brand colors and fonts
4. **Add features** - Implement charts, tables, images
5. **Optimize** - Add caching, async generation, webhooks

## Resources

- [APITemplate.io Documentation](https://apitemplate.io/docs)
- [Handlebars Documentation](https://handlebarsjs.com)
- [CSS Print Media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print)
- [PDF Best Practices](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)

## Support

For issues with this implementation:
1. Check the troubleshooting section above
2. Review APITemplate.io service status
3. Check environment variables are set correctly
4. Review logs for detailed error messages

---

**Built for L4YERCAK3** | Last Updated: 2025-01-30
