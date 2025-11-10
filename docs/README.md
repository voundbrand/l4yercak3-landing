# L4YERCAK3 Documentation

Welcome to the L4YERCAK3 documentation! This folder contains comprehensive guides for implementing and customizing the system.

## 📚 Available Guides

### PDF Generation System

- **[PDF_GENERATION_GUIDE.md](./PDF_GENERATION_GUIDE.md)** - Complete guide to the PDF generation system
  - Architecture overview
  - APITemplate.io integration
  - Template creation
  - Styling best practices
  - Error handling
  - Performance optimization
  - Security best practices

- **[QUICK_START_PDF.md](./QUICK_START_PDF.md)** - 5-minute quick start guide
  - Setup instructions
  - Copy-paste templates
  - Common patterns
  - Troubleshooting

## 🚀 Quick Links

### For Developers

- **New to the system?** Start with [QUICK_START_PDF.md](./QUICK_START_PDF.md)
- **Need detailed info?** Check [PDF_GENERATION_GUIDE.md](./PDF_GENERATION_GUIDE.md)
- **Creating templates?** See the "Creating Your Own Template" section in the main guide

### For Integration

Copy these essential files to your project:
```
src/lib/pdf-generation/
├── apitemplate-client.ts      # Core API client
├── apitemplate-generator.ts   # Main generator
└── utils/helpers.ts           # Formatting utilities
```

## 🎯 Common Use Cases

### Generate a Simple PDF

```typescript
import { getAPITemplateGenerator } from '@/lib/pdf-generation/apitemplate-generator';

const generator = getAPITemplateGenerator();
const result = await generator.generateValueReportSafe(leadData, calculatedValues);
```

### Create Custom Template

```typescript
export const MY_TEMPLATE_HTML = `
<div class="page">
  <h1>{{title}}</h1>
  <p>{{content}}</p>
</div>
`;

export const MY_TEMPLATE_CSS = `
<style>
  .page { padding: 40px; }
  h1 { color: #2563eb; }
</style>
`;
```

### Send PDF via Email

```typescript
await sendEmail({
  to: 'customer@example.com',
  attachments: [{
    filename: 'report.pdf',
    content: pdfBuffer,
    contentType: 'application/pdf'
  }]
});
```

## 📖 Documentation Sections

### Architecture
- System overview
- Component structure
- API client design
- Error handling strategy

### Templates
- HTML template syntax
- CSS styling guide
- Variable interpolation
- Conditional rendering
- Loops and arrays

### Integration
- Environment setup
- API key configuration
- Error handling
- Email integration
- Testing

### Advanced Topics
- Performance optimization
- Caching strategies
- Security best practices
- Migration guides

## 🔧 Environment Setup

Required environment variables:

```bash
APITEMPLATE_API_KEY=your_api_key_here
APITEMPLATE_BASE_URL=https://api.apitemplate.io
```

## 🧪 Testing

```typescript
// Test API connection
const generator = getAPITemplateGenerator();
const test = await generator.testConnection();

if (test.success) {
  console.log('✅ PDF service is working');
} else {
  console.error('❌ Connection failed:', test.error);
}
```

## 📦 Dependencies

- `axios` - HTTP client for API requests
- `APITemplate.io` - PDF generation service

## 🎨 Customization

All templates are located in:
```
src/lib/pdf-generation/templates/
```

Edit the HTML and CSS to match your brand:
- Colors: Update in CSS variables
- Fonts: Change in `font-family` declarations
- Layout: Modify HTML structure
- Content: Update localized strings in `content/` folder

## 🌍 Internationalization

The system supports multiple languages:
- English (en)
- German (de)

Add new languages by:
1. Creating a new file in `src/lib/pdf-generation/content/`
2. Adding translations
3. Updating the `Language` type
4. Updating `getLocalizedContent()` function

## 🐛 Troubleshooting

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| API key error | Set `APITEMPLATE_API_KEY` environment variable |
| Timeout | Check network connectivity |
| Invalid template | Validate HTML syntax |
| Validation failed | Check required fields are provided |
| PDF not generated | Review logs for detailed error messages |

For more troubleshooting tips, see the [full guide](./PDF_GENERATION_GUIDE.md#troubleshooting).

## 🔗 External Resources

- [APITemplate.io Documentation](https://apitemplate.io/docs)
- [Handlebars Template Syntax](https://handlebarsjs.com)
- [CSS Print Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print)
- [PDF Design Best Practices](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)

## 📞 Support

Need help?

1. Check the [Quick Start Guide](./QUICK_START_PDF.md)
2. Review the [Complete Documentation](./PDF_GENERATION_GUIDE.md)
3. Look at example templates in `src/lib/pdf-generation/templates/`
4. Check APITemplate.io service status

## 📝 Contributing

When adding new features:

1. Update relevant documentation
2. Add code examples
3. Include troubleshooting tips
4. Test with multiple scenarios
5. Update this README if needed

## 🗂️ File Structure

```
docs/
├── README.md                   # This file - documentation index
├── PDF_GENERATION_GUIDE.md     # Complete PDF generation guide
└── QUICK_START_PDF.md          # 5-minute quick start

src/lib/pdf-generation/
├── apitemplate-client.ts       # API client
├── apitemplate-generator.ts    # Main generator
├── index.ts                    # Public exports
├── templates/                  # HTML/CSS templates
│   ├── simple-value-report.ts
│   ├── value-report-html.ts
│   └── ...
├── content/                    # Localized content
│   ├── en.ts
│   ├── de.ts
│   └── ...
└── utils/                      # Helper utilities
    ├── helpers.ts
    └── styles.ts
```

## ✨ Features

- ✅ Beautiful, professional PDFs
- ✅ HTML/CSS based templates
- ✅ Bilingual support (EN/DE)
- ✅ Automatic retry logic
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Email integration ready
- ✅ Production-tested
- ✅ Scalable architecture
- ✅ Easy to customize

---

**Last Updated:** 2025-01-30
**Version:** 1.0.0
**Maintained by:** L4YERCAK3 Team
