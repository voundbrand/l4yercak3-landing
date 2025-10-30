# API Template.io Integration for L4YERCAK3 Value Reports

This document describes the integration of API Template.io for generating beautiful PDF value reports based on the "do-more-with-less" page content.

## Overview

We've replaced the manual PDF generation system with API Template.io's professional PDF generation service. This provides:

- **Beautiful, professional PDFs** with modern design
- **Reliable cloud-based generation** with 99.9% uptime
- **Chart and visualization support** using ApexCharts
- **Responsive templates** that work across different data sizes
- **Multi-language support** (English and German)

## Architecture

### Core Components

1. **APITemplateClient** (`src/lib/pdf-generation/apitemplate-client.ts`)
   - HTTP client for API Template.io REST API
   - Handles authentication, request formatting, and error handling
   - Supports both template-based and HTML-based PDF generation

2. **Value Report HTML Template** (`src/lib/pdf-generation/templates/value-report-html.ts`)
   - Beautiful 4-page HTML template with embedded CSS
   - Uses Jinja2 templating syntax for dynamic content
   - Includes ApexCharts for data visualization
   - Responsive design optimized for PDF output

3. **APITemplateValueReportGenerator** (`src/lib/pdf-generation/apitemplate-generator.ts`)
   - Main service class that orchestrates PDF generation
   - Transforms calculator data into template format
   - Handles validation, error recovery, and health monitoring

4. **Template Preview System** (`src/lib/pdf-generation/template-preview.ts`)
   - Development utilities for testing templates
   - Sample data generation for different scenarios
   - HTML preview generation for debugging

## Setup Instructions

### 1. Get API Template.io API Key

1. Sign up at [apitemplate.io](https://apitemplate.io)
2. Navigate to API Integration section
3. Copy your API key

### 2. Configure Environment Variables

Add to your `.env.local`:

```bash
# API Template.io Configuration
APITEMPLATE_API_KEY=your_api_key_here
APITEMPLATE_BASE_URL=https://rest.apitemplate.io
```

### 3. Test the Integration

Visit the development preview page:
```
http://localhost:3000/dev/pdf-preview
```

Or test the API directly:
```bash
curl http://localhost:3000/api/pdf/test
```

## Template Structure

The PDF report consists of 4 pages:

### Page 1: Executive Summary
- Organization information and contact details
- Total value opportunity highlight
- Key metrics overview
- Executive summary text

### Page 2: Current Waste Analysis
- Breakdown of manual work costs
- Task-by-task analysis with automation potential
- Visual representation of time allocation
- Strategic impact statement

### Page 3: Revenue Growth Opportunities
- Conservative revenue projections
- Growth opportunity breakdown (members, programs, partnerships)
- Interactive growth chart
- ROI timeline

### Page 4: Implementation Roadmap
- 4-phase implementation timeline
- ROI projections by month
- Next steps and call-to-action
- Contact information

## Data Flow

```
Value Calculator → Bridge Layer → API Template.io → Beautiful PDF
```

1. **Calculator Data**: Raw form inputs and calculations
2. **Bridge Layer**: Transforms data into template-friendly format
3. **Template Engine**: API Template.io processes HTML/CSS with data
4. **PDF Output**: Professional, branded PDF report

## Template Variables

The template uses these key variables:

### Lead Information
- `fullName`, `email`, `organizationName`, `jobTitle`
- `phone`, `industryType`, `timeline`
- `signatureAuthority`

### Financial Metrics
- `totalValueCreated`, `laborCostAvoided`, `conservativeNewRevenue`
- `annualWaste`, `potentialFreedHours`, `potentialFreedWeeklyHours`
- `memberRevenue`, `newProgramRevenue`, `partnershipRevenue`

### Task Breakdown
- `taskBreakdown` object with categories:
  - `eventCoordination`, `memberCommunication`
  - `complianceReporting`, `financialAdmin`, `dataManagement`

### Formatting Helpers
- `formatCurrency()`, `formatHours()`, `formatPercentage()`
- `reportDate`, `companyName`, `companyWebsite`

## Error Handling

The system includes comprehensive error handling:

1. **Validation Errors**: Input data validation before PDF generation
2. **API Errors**: Network issues, authentication failures, service downtime
3. **Template Errors**: Malformed templates or data transformation issues
4. **Fallback Mechanisms**: Graceful degradation when service is unavailable

## Monitoring & Health Checks

### Health Check Endpoint
```
GET /api/value-report/generate
```

Returns service status:
```json
{
  "status": "healthy",
  "services": {
    "email": "operational",
    "pdf": "operational"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Service Status Levels
- **healthy**: All systems operational
- **degraded**: Service available but with issues
- **unhealthy**: Service unavailable

## Development Workflow

### 1. Template Development
1. Edit HTML template in `value-report-html.ts`
2. Use preview page at `/dev/pdf-preview` to test changes
3. Generate test PDFs with sample data
4. Iterate on design and layout

### 2. Data Integration
1. Modify data transformation in `transformDataForTemplate()`
2. Add new template variables as needed
3. Update validation logic in `validateInputData()`
4. Test with different calculator scenarios

### 3. Testing
1. Use test scenarios in `template-preview.ts`
2. Test API endpoint at `/api/pdf/test`
3. Verify error handling with invalid data
4. Check multi-language support

## Performance Considerations

- **Generation Time**: ~2-5 seconds per PDF
- **File Size**: ~500KB-2MB depending on content
- **Rate Limits**: 100 requests per 10 seconds per IP
- **Caching**: PDFs are not cached (always fresh data)

## Security

- API keys stored in environment variables
- No sensitive data logged
- PDF URLs expire after 1 hour
- HTTPS-only communication

## Troubleshooting

### Common Issues

1. **"API key invalid"**
   - Check `APITEMPLATE_API_KEY` environment variable
   - Verify key is active in API Template.io dashboard

2. **"Template rendering failed"**
   - Check template syntax (Jinja2)
   - Verify all required data fields are present
   - Use preview page to debug template issues

3. **"Service unavailable"**
   - Check API Template.io service status
   - Verify network connectivity
   - Check rate limits

### Debug Steps

1. Check health endpoint: `/api/value-report/generate`
2. Test with sample data: `/api/pdf/test`
3. Use preview page: `/dev/pdf-preview`
4. Check server logs for detailed error messages

## Migration from Old System

The old manual PDF generation system has been replaced but can be restored if needed:

1. **Backup**: Old templates are preserved in `templates/` directory
2. **Rollback**: Change import in `route.ts` back to `ValueReportGenerator`
3. **Hybrid**: Both systems can run simultaneously during transition

## Future Enhancements

1. **Template Versioning**: A/B test different template designs
2. **Custom Branding**: Organization-specific templates
3. **Interactive Elements**: Clickable links and form fields
4. **Analytics**: Track PDF engagement and conversion
5. **Batch Generation**: Generate multiple reports simultaneously

## Support

For issues with this integration:

1. Check this documentation
2. Review server logs
3. Test with `/api/pdf/test` endpoint
4. Contact API Template.io support for service issues
5. Create GitHub issue for code-related problems

---

**Last Updated**: January 2024  
**Version**: 1.0  
**Maintainer**: L4YERCAK3 Development Team