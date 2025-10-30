# API Template.io Setup Guide

## Quick Start

Follow these steps to get your beautiful PDF value reports working with API Template.io:

### 1. Get Your API Key

1. Go to [apitemplate.io](https://apitemplate.io) and sign up for an account
2. Navigate to the **API Integration** section in your dashboard
3. Copy your API key

### 2. Configure Environment Variables

Add your API key to `.env.local`:

```bash
# API Template.io Configuration
APITEMPLATE_API_KEY=your_actual_api_key_here
APITEMPLATE_BASE_URL=https://rest.apitemplate.io
```

### 3. Test the Integration

#### Option A: Quick Test
Visit: `http://localhost:3000/api/pdf/test`

This will download a sample PDF with test data.

#### Option B: Development Preview
Visit: `http://localhost:3000/dev/pdf-preview`

This gives you a visual interface to:
- Preview templates with different data scenarios
- Generate test PDFs
- Debug template issues

### 4. Verify Everything Works

1. **Health Check**: Visit `http://localhost:3000/api/value-report/generate`
   - Should return `{"status": "healthy", "services": {"email": "operational", "pdf": "operational"}}`

2. **Generate Test PDF**: 
   ```bash
   curl http://localhost:3000/api/pdf/test -o test-report.pdf
   ```

3. **Check Your Value Calculator**: 
   - Go to your value calculator page
   - Fill out the form and submit
   - You should receive a beautiful PDF via email

## What You Get

### Beautiful 4-Page PDF Reports
1. **Executive Summary** - Total value opportunity with key metrics
2. **Current Waste Analysis** - Breakdown of manual work costs
3. **Revenue Growth Opportunities** - Conservative projections with charts
4. **Implementation Roadmap** - Timeline and next steps

### Professional Features
- Modern, clean design with your L4YERCAK3 branding
- Interactive charts and visualizations
- Multi-language support (English/German)
- Mobile-responsive templates
- Professional typography and layout

### Reliable Service
- 99.9% uptime guarantee
- Fast generation (2-5 seconds)
- Automatic error handling and fallbacks
- Rate limiting protection

## Troubleshooting

### "API key invalid" Error
- Double-check your `APITEMPLATE_API_KEY` in `.env.local`
- Make sure there are no extra spaces or quotes
- Verify the key is active in your API Template.io dashboard

### "Service unavailable" Error
- Check [API Template.io status page](https://status.apitemplate.io)
- Verify your internet connection
- Try the health check endpoint

### Template Issues
- Use the preview page at `/dev/pdf-preview` to debug
- Check the browser console for JavaScript errors
- Verify all data fields are present

### Need Help?
1. Check the detailed documentation in `API_TEMPLATE_INTEGRATION.md`
2. Test with the `/api/pdf/test` endpoint
3. Review server logs for detailed error messages
4. Contact API Template.io support for service issues

## Next Steps

Once everything is working:

1. **Customize the Template**: Edit `src/lib/pdf-generation/templates/value-report-html.ts`
2. **Add Your Branding**: Update colors, fonts, and logos in the CSS
3. **Test Different Scenarios**: Use the preview page with various data sets
4. **Monitor Performance**: Check the health endpoint regularly
5. **Scale Up**: Consider upgrading your API Template.io plan for higher limits

## Cost Considerations

API Template.io pricing is based on usage:
- **Free Tier**: 50 PDFs/month
- **Starter**: $19/month for 500 PDFs
- **Professional**: $49/month for 2,000 PDFs
- **Enterprise**: Custom pricing for higher volumes

Each value report generation counts as 1 PDF.

---

**You're all set!** Your value calculator now generates beautiful, professional PDF reports that will impress your leads and help close more deals. 🎉