/**
 * Test endpoint for API Template.io integration
 * Use this to verify the service is working before going live
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAPITemplateGenerator } from '@/lib/pdf-generation/apitemplate-generator';
import { LeadData, CalculatedValues } from '@/lib/value-calculator/types';

/**
 * GET /api/pdf/test
 * Test API Template.io connection and generate a sample PDF
 */
export async function GET(request: NextRequest) {
  try {
    const generator = getAPITemplateGenerator();
    
    // Test connection first
    const healthCheck = await generator.getHealthStatus();
    
    if (healthCheck.status === 'unhealthy') {
      return NextResponse.json({
        success: false,
        error: 'API Template.io service is unavailable',
        details: healthCheck.details
      }, { status: 503 });
    }

    // Generate a test PDF with sample data
    const sampleLeadData: LeadData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      organizationName: 'Sample Medical Association',
      jobTitle: 'Executive Director',
      phone: '+1-555-0123',
      industryType: 'medical',
      timeline: 'Within 3 months',
      language: 'en' as const,
      signatureAuthority: 50000,
      // Required calculator fields
      organizationSize: 150,
      adminStaffCount: 3,
      manualHoursPerWeek: 30,
      loadedLaborCost: 35,
      annualEvents: 12,
      avgMemberValue: 2500,
      currentRevenue: 500000,
      submittedAt: Date.now(),
    };

    const sampleCalculatedValues: CalculatedValues = {
      // Core Metrics
      totalAnnualHours: 1560,
      annualWaste: 72800,
      potentialFreedHours: 1404,
      laborCostAvoided: 65520,
      newRevenuePotential: 195000,
      totalValueCreated: 260520,
      
      // Pricing Intelligence
      pricing: {
        conservative: { percentage: 15, annualPrice: 39078, customerKeeps: 221442, roi: 567 },
        target: { percentage: 20, annualPrice: 52104, customerKeeps: 208416, roi: 400 },
        aggressive: { percentage: 25, annualPrice: 65130, customerKeeps: 195390, roi: 300 },
        premium: { percentage: 30, annualPrice: 78156, customerKeeps: 182364, roi: 233 }
      },
      
      // Sales Intelligence
      recommendedPhase: 'Growth',
      leadQualityScore: 'HIGH' as const,
    };

    // Generate test PDF
    const result = await generator.generateValueReportSafe(
      sampleLeadData,
      sampleCalculatedValues
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: 'Test PDF generation failed',
        details: result.error
      }, { status: 500 });
    }

    // Return PDF as download
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${result.filename}"`);
    headers.set('Content-Length', result.pdf!.length.toString());

    return new Response(new Uint8Array(result.pdf!), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('PDF test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * POST /api/pdf/test
 * Test with custom data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadData, calculatedValues } = body;

    if (!leadData || !calculatedValues) {
      return NextResponse.json({
        success: false,
        error: 'Missing leadData or calculatedValues in request body'
      }, { status: 400 });
    }

    const generator = getAPITemplateGenerator();
    const result = await generator.generateValueReportSafe(leadData, calculatedValues);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: 'PDF generation failed',
        details: result.error
      }, { status: 500 });
    }

    // Return PDF as download
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${result.filename}"`);
    headers.set('Content-Length', result.pdf!.length.toString());

    return new Response(new Uint8Array(result.pdf!), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('PDF test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}