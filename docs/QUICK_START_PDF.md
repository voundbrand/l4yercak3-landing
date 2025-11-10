# Quick Start: PDF Generation with APITemplate.io

## 5-Minute Setup

### 1. Get API Key
```bash
# Sign up at https://apitemplate.io
# Get your API key from dashboard
```

### 2. Set Environment Variable
```bash
# .env.local
APITEMPLATE_API_KEY=your_key_here
APITEMPLATE_BASE_URL=https://api.apitemplate.io
```

### 3. Generate Your First PDF
```typescript
import { getAPITemplateGenerator } from '@/lib/pdf-generation/apitemplate-generator';

const generator = getAPITemplateGenerator();
const result = await generator.generateValueReportSafe(leadData, calculatedValues);

if (result.success) {
  // Success! result.pdf is a Buffer
  console.log('PDF generated:', result.filename);
} else {
  console.error('Failed:', result.error);
}
```

## Copy-Paste Template

Want to create your own PDF? Here's a minimal template:

```typescript
// my-report-template.ts
export const MY_TEMPLATE_HTML = `
<div class="page">
  <h1>{{title}}</h1>
  <p>{{description}}</p>
  <div class="metric">
    <span class="value">{{amount}}</span>
  </div>
</div>
`;

export const MY_TEMPLATE_CSS = `
<style>
  body { font-family: Arial, sans-serif; }
  .page { padding: 40px; }
  h1 { color: #2563eb; font-size: 32px; }
  .metric { background: #f8fafc; padding: 20px; border-radius: 8px; }
  .value { font-size: 48px; font-weight: bold; color: #2563eb; }
</style>
`;

// Generate it
import { createAPITemplateClient } from '@/lib/pdf-generation/apitemplate-client';

const client = createAPITemplateClient();
const pdf = await client.generateAndDownloadPDF(
  MY_TEMPLATE_HTML,
  MY_TEMPLATE_CSS,
  { title: 'My Report', description: 'Hello World', amount: '€10,000' },
  { fileName: 'my-report.pdf' }
);
```

## File Structure to Copy

Copy these files to your new project:

```
src/lib/pdf-generation/
├── apitemplate-client.ts      ⭐ Core API client (REQUIRED)
├── apitemplate-generator.ts   ⭐ Main generator (REQUIRED)
├── utils/
│   └── helpers.ts             ⭐ Formatting helpers (REQUIRED)
└── templates/
    └── your-template.ts       ⭐ Your custom template
```

## Essential Functions

```typescript
// Format currency
formatCurrency(1234.56, 'en')  // "€1,234.56"

// Format number
formatNumber(1234567)  // "1,234,567"

// Format percentage
formatPercentage(0.25)  // "25%"

// Generate filename
generatePDFFilename('Company', 'en')  // "Report_Company_2025-01-30.pdf"
```

## Common Patterns

### Pattern 1: Simple Report
```typescript
const data = {
  company: 'Acme Corp',
  revenue: formatCurrency(500000),
  date: formatDate(new Date())
};

const pdf = await client.generateAndDownloadPDF(html, css, data);
```

### Pattern 2: With Email
```typescript
await sendEmail({
  to: 'customer@example.com',
  subject: 'Your Report',
  attachments: [{
    filename: 'report.pdf',
    content: pdf,
    contentType: 'application/pdf'
  }]
});
```

### Pattern 3: With Validation
```typescript
const result = await generator.generateValueReportSafe(data, values);

if (result.success) {
  // Use result.pdf
} else {
  // Handle result.error
}
```

## Template Variables Cheat Sheet

```html
<!-- Simple variable -->
{{variable_name}}

<!-- Conditional -->
{{#if condition}}
  <p>Shown when true</p>
{{/if}}

<!-- Loop -->
{{#each items}}
  <li>{{name}}</li>
{{/each}}

<!-- Math helpers -->
{{add value 10}}
{{multiply value 2}}
```

## Styling Tips

```css
/* Page setup */
@page {
  size: A4;
  margin: 20mm;
}

/* Page breaks */
.page-break { page-break-after: always; }
.no-break { page-break-inside: avoid; }

/* Print colors */
.print-safe { color: #333; background: #f8fafc; }
```

## Testing

```typescript
// Test connection
const test = await generator.testConnection();
console.log(test.success ? '✅ Working' : '❌ Failed');

// Health check
const health = await generator.getHealthStatus();
console.log(health.status); // 'healthy' | 'degraded' | 'unhealthy'
```

## Troubleshooting

| Error | Solution |
|-------|----------|
| "API key not configured" | Set `APITEMPLATE_API_KEY` env var |
| "Request timeout" | Check network, increase timeout |
| "Invalid template" | Check HTML syntax |
| "Validation failed" | Check all required fields |

## Next Steps

1. ✅ Read the full [PDF_GENERATION_GUIDE.md](./PDF_GENERATION_GUIDE.md)
2. ✅ Customize the HTML template
3. ✅ Update the CSS styling
4. ✅ Add your brand colors
5. ✅ Test with real data

## Resources

- Full Documentation: `docs/PDF_GENERATION_GUIDE.md`
- APITemplate.io: https://apitemplate.io/docs
- Template Examples: `src/lib/pdf-generation/templates/`

---

**Questions?** Check the full guide or review the example templates in the codebase.
