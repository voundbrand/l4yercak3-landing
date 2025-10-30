/**
 * Simplified HTML template for testing API Template.io integration
 * No complex filters or JavaScript - just basic Jinja2 templating
 * Now supports localization (English/German)
 */

export const SIMPLE_VALUE_REPORT_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{organizationName}} - Value Report</title>
</head>
<body>
    <!-- Page 1: Title and Value Overview -->
    <div class="page">
        <div class="header">
            <div class="logo">{{companyName}}</div>
            <div class="report-type">{{content.reportTitle}}</div>
        </div>
        
        <div class="hero-section">
            <h1 class="main-title">{{content.page1.title}}</h1>
            <div class="organization-info">
                <h2>{{organizationName}}</h2>
                <p>{{content.page1.preparedFor}} {{fullName}}, {{jobTitle}}</p>
                <p class="report-date">{{reportDate}}</p>
            </div>
        </div>

        <div class="value-highlight">
            <div class="total-value">
                <div class="value-amount">{{totalValueCreated}}</div>
                <div class="value-label">{{content.page1.totalValueLabel}}</div>
            </div>
            
            <div class="value-breakdown">
                <div class="breakdown-item">
                    <div class="breakdown-amount">{{laborCostAvoided}}</div>
                    <div class="breakdown-label">{{content.page1.laborCostLabel}}</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-amount">{{conservativeNewRevenue}}</div>
                    <div class="breakdown-label">{{content.page1.newRevenueLabel}}</div>
                </div>
            </div>
        </div>

        <div class="key-metrics-overview">
            <div class="key-metrics">
                <div class="metric">
                    <div class="metric-value">{{potentialFreedWeeklyHours}}</div>
                    <div class="metric-label">{{content.page1.keyMetrics.hoursFreedLabel}}</div>
                </div>
                <div class="metric">
                    <div class="metric-value">{{newMembersAcquired}}</div>
                    <div class="metric-label">{{content.page1.keyMetrics.newMembersLabel}}</div>
                </div>
                <div class="metric">
                    <div class="metric-value">90{{content.common.percent}}</div>
                    <div class="metric-label">{{content.page1.keyMetrics.automationLabel}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page 2: Executive Summary -->
    <div class="page">
        <div class="page-header">
            <h2>{{content.page1.executiveSummaryTitle}}</h2>
        </div>

        <div class="executive-summary-full">
            <div class="summary-text">
                <p>{{executiveSummaryText}}</p>
            </div>
            
            <div class="summary-highlights">
                <div class="highlight-box">
                    <div class="highlight-number">{{potentialFreedHours}}</div>
                    <div class="highlight-label">{{content.common.hours}} {{content.page1.keyMetrics.hoursFreedLabel}}</div>
                </div>
                <div class="highlight-box">
                    <div class="highlight-number">{{annualWaste}}</div>
                    <div class="highlight-label">{{content.page2.wasteOverview.title}}</div>
                </div>
                <div class="highlight-box">
                    <div class="highlight-number">{{conservativeNewRevenue}}</div>
                    <div class="highlight-label">{{content.page1.newRevenueLabel}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page 3: Where Your Value Is Hidden -->
    <div class="page">
        <div class="page-header">
            <h2>{{content.page2.title}}</h2>
            <p>{{content.page2.subtitle}}</p>
        </div>

        <div class="waste-analysis">
            <div class="waste-overview">
                <div class="waste-amount">{{annualWaste}}</div>
                <div class="waste-label">{{content.page2.wasteOverview.title}}</div>
                <div class="waste-hours">{{potentialFreedHours}} {{content.page2.wasteOverview.subtitle}}</div>
            </div>

            <div class="task-breakdown">
                <h3>{{content.page2.taskBreakdown.title}}</h3>
                
                <div class="task-item">
                    <div class="task-header">
                        <div class="task-name">{{content.page2.taskBreakdown.eventCoordination}}</div>
                        <div class="task-cost">{{taskBreakdown.eventCoordination.annualCost}}{{content.common.year}}</div>
                    </div>
                    <div class="task-details">
                        <div class="task-hours">{{taskBreakdown.eventCoordination.annualHours}} {{content.page2.taskBreakdown.hoursAnnually}}</div>
                        <div class="task-percentage">{{taskBreakdown.eventCoordination.percentage}}{{content.common.percent}} {{content.page2.taskBreakdown.percentOfWork}}</div>
                    </div>
                    <div class="automation-potential">
                        <div class="automation-bar">
                            <div class="automation-fill" style="width: 90%"></div>
                        </div>
                        <div class="automation-text">90{{content.common.percent}} {{content.page2.taskBreakdown.automationPotential}}</div>
                    </div>
                </div>

                <div class="task-item">
                    <div class="task-header">
                        <div class="task-name">{{content.page2.taskBreakdown.memberCommunication}}</div>
                        <div class="task-cost">{{taskBreakdown.memberCommunication.annualCost}}{{content.common.year}}</div>
                    </div>
                    <div class="task-details">
                        <div class="task-hours">{{taskBreakdown.memberCommunication.annualHours}} {{content.page2.taskBreakdown.hoursAnnually}}</div>
                        <div class="task-percentage">{{taskBreakdown.memberCommunication.percentage}}{{content.common.percent}} {{content.page2.taskBreakdown.percentOfWork}}</div>
                    </div>
                    <div class="automation-potential">
                        <div class="automation-bar">
                            <div class="automation-fill" style="width: 85%"></div>
                        </div>
                        <div class="automation-text">85{{content.common.percent}} {{content.page2.taskBreakdown.automationPotential}}</div>
                    </div>
                </div>

                <div class="task-item">
                    <div class="task-header">
                        <div class="task-name">{{content.page2.taskBreakdown.complianceReporting}}</div>
                        <div class="task-cost">{{taskBreakdown.complianceReporting.annualCost}}{{content.common.year}}</div>
                    </div>
                    <div class="task-details">
                        <div class="task-hours">{{taskBreakdown.complianceReporting.annualHours}} {{content.page2.taskBreakdown.hoursAnnually}}</div>
                        <div class="task-percentage">{{taskBreakdown.complianceReporting.percentage}}{{content.common.percent}} {{content.page2.taskBreakdown.percentOfWork}}</div>
                    </div>
                    <div class="automation-potential">
                        <div class="automation-bar">
                            <div class="automation-fill" style="width: 95%"></div>
                        </div>
                        <div class="automation-text">95{{content.common.percent}} {{content.page2.taskBreakdown.automationPotential}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page 4: Strategic Impact -->
    <div class="page">
        <div class="page-header">
            <h2>{{content.page2.impactStatement.title}}</h2>
        </div>

        <div class="impact-statement-full">
            <div class="impact-description">
                <p>{{impactDescription}}</p>
            </div>
            
            <div class="growth-activities">
                <div class="activity">{{impactActivity1}}</div>
                <div class="activity">{{impactActivity2}}</div>
                <div class="activity">{{impactActivity3}}</div>
                <div class="activity">{{impactActivity4}}</div>
                <div class="activity">{{impactActivity5}}</div>
            </div>

            <div class="impact-visual">
                <div class="before-after">
                    <div class="before">
                        <h4>{{content.page2.wasteOverview.description}}</h4>
                        <div class="waste-items">
                            <div class="waste-item">📊 {{content.page2.taskBreakdown.dataManagement}}</div>
                            <div class="waste-item">📧 {{content.page2.taskBreakdown.memberCommunication}}</div>
                            <div class="waste-item">📅 {{content.page2.taskBreakdown.eventCoordination}}</div>
                            <div class="waste-item">📋 {{content.page2.taskBreakdown.complianceReporting}}</div>
                        </div>
                    </div>
                    <div class="after">
                        <h4>{{content.page1.keyMetrics.hoursFreedLabel}}</h4>
                        <div class="growth-items">
                            <div class="growth-item">🚀 {{impactActivity1}}</div>
                            <div class="growth-item">🤝 {{impactActivity2}}</div>
                            <div class="growth-item">💡 {{impactActivity3}}</div>
                            <div class="growth-item">💰 {{impactActivity4}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page 5: Your Path to Value Realization -->
    <div class="page">
        <div class="page-header">
            <h2>{{content.page3.title}}</h2>
            <p>{{content.page3.subtitle}} {{organizationName}}</p>
        </div>

        <div class="next-steps-full">
            <div class="ready-section">
                <h3>{{content.page3.readyTitle}}</h3>
                <p>{{readyDescription}}</p>
            </div>
            
            <div class="implementation-preview">
                <h4>Implementation Timeline</h4>
                <div class="timeline-steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-title">Assessment</div>
                            <div class="step-description">Deep dive analysis</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-title">Pilot</div>
                            <div class="step-description">Quick wins implementation</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <div class="step-title">Scale</div>
                            <div class="step-description">Full automation rollout</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <div class="step-title">Optimize</div>
                            <div class="step-description">Continuous improvement</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <div class="cta-primary">
                    <div class="cta-title">{{content.page3.ctaTitle}}</div>
                    <div class="cta-description">{{content.page3.ctaDescription}}</div>
                </div>
                <div class="contact-info">
                    <div>{{companyWebsite}}</div>
                    <div>{{supportEmail}}</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const SIMPLE_VALUE_REPORT_CSS = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
        color: #1f2937;
        background: white;
        -webkit-font-smoothing: antialiased;
    }
    
    .page {
        min-height: 297mm; /* A4 height */
        max-height: 297mm;
        width: 210mm; /* A4 width */
        padding: 20mm;
        page-break-after: always;
        page-break-inside: avoid;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
    }
    
    .page:last-child {
        page-break-after: avoid;
    }
    
    /* Header Styles */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 60px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e5e7eb;
    }
    
    .logo {
        font-size: 24px;
        font-weight: 700;
        color: #3b82f6;
        letter-spacing: -0.5px;
    }
    
    .report-type {
        font-size: 14px;
        color: #6b7280;
        font-weight: 500;
    }
    
    .page-header {
        margin-bottom: 40px;
        text-align: center;
    }
    
    .page-header h2 {
        font-size: 32px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 8px;
    }
    
    .page-header p {
        font-size: 16px;
        color: #6b7280;
    }
    
    /* Hero Section */
    .hero-section {
        text-align: center;
        margin-bottom: 60px;
    }
    
    .main-title {
        font-size: 48px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 40px;
        line-height: 1.2;
    }
    
    .organization-info h2 {
        font-size: 28px;
        font-weight: 600;
        color: #3b82f6;
        margin-bottom: 8px;
    }
    
    .organization-info p {
        font-size: 16px;
        color: #6b7280;
        margin-bottom: 4px;
    }
    
    .report-date {
        font-size: 14px !important;
        color: #9ca3af !important;
    }
    
    /* Value Highlight */
    .value-highlight {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        padding: 40px;
        border-radius: 16px;
        margin-bottom: 60px;
        text-align: center;
    }
    
    .total-value {
        margin-bottom: 40px;
    }
    
    .value-amount {
        font-size: 64px;
        font-weight: 700;
        margin-bottom: 8px;
        line-height: 1;
    }
    
    .value-label {
        font-size: 18px;
        opacity: 0.9;
        font-weight: 500;
    }
    
    .value-breakdown {
        display: flex;
        justify-content: space-around;
        gap: 40px;
    }
    
    .breakdown-item {
        flex: 1;
    }
    
    .breakdown-amount {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 4px;
    }
    
    .breakdown-label {
        font-size: 14px;
        opacity: 0.8;
    }
    
    /* Executive Summary */
    .executive-summary {
        background: #f9fafb;
        padding: 40px;
        border-radius: 12px;
        border-left: 4px solid #3b82f6;
    }
    
    .executive-summary h3 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #1f2937;
    }
    
    .executive-summary p {
        font-size: 16px;
        margin-bottom: 16px;
        color: #4b5563;
    }
    
    .key-metrics {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        gap: 20px;
    }
    
    .metric {
        text-align: center;
        background: white;
        padding: 20px;
        border-radius: 8px;
        flex: 1;
    }
    
    .metric-value {
        font-size: 28px;
        font-weight: 700;
        color: #3b82f6;
        margin-bottom: 4px;
    }
    
    .metric-label {
        font-size: 12px;
        color: #6b7280;
        font-weight: 500;
    }
    
    /* Waste Analysis */
    .waste-analysis {
        margin-bottom: 40px;
    }
    
    .waste-overview {
        text-align: center;
        background: #fef2f2;
        border: 2px solid #fecaca;
        padding: 40px;
        border-radius: 12px;
        margin-bottom: 40px;
    }
    
    .waste-amount {
        font-size: 48px;
        font-weight: 700;
        color: #dc2626;
        margin-bottom: 8px;
    }
    
    .waste-label {
        font-size: 18px;
        color: #991b1b;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .waste-hours {
        font-size: 16px;
        color: #7f1d1d;
    }
    
    /* Task Breakdown */
    .task-breakdown h3 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 24px;
        color: #1f2937;
    }
    
    .task-item {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 16px;
    }
    
    .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    
    .task-name {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
    }
    
    .task-cost {
        font-size: 18px;
        font-weight: 700;
        color: #dc2626;
    }
    
    .task-details {
        display: flex;
        gap: 24px;
        margin-bottom: 16px;
        font-size: 14px;
        color: #6b7280;
    }
    
    .automation-potential {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .automation-bar {
        flex: 1;
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .automation-fill {
        height: 100%;
        background: #10b981;
        border-radius: 4px;
    }
    
    .automation-text {
        font-size: 12px;
        color: #10b981;
        font-weight: 600;
    }
    
    /* Impact Statement */
    .impact-statement {
        background: #f0f9ff;
        padding: 32px;
        border-radius: 12px;
        border-left: 4px solid #0ea5e9;
    }
    
    .impact-statement h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #0c4a6e;
    }
    
    .impact-statement p {
        font-size: 16px;
        color: #0369a1;
        margin-bottom: 20px;
    }
    
    .growth-activities {
        display: grid;
        gap: 8px;
    }
    
    .activity {
        padding: 8px 12px;
        background: white;
        border-radius: 6px;
        font-size: 14px;
        color: #0369a1;
        border-left: 3px solid #0ea5e9;
    }
    
    /* Next Steps */
    .next-steps {
        background: #fefce8;
        padding: 32px;
        border-radius: 12px;
        border: 2px solid #fde047;
    }
    
    .next-steps h3 {
        font-size: 24px;
        font-weight: 600;
        color: #a16207;
        margin-bottom: 16px;
    }
    
    .next-steps p {
        font-size: 16px;
        color: #92400e;
        margin-bottom: 24px;
    }
    
    .cta-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        padding: 24px;
        border-radius: 8px;
        border: 1px solid #fbbf24;
    }
    
    .cta-primary {
        flex: 1;
    }
    
    .cta-title {
        font-size: 20px;
        font-weight: 700;
        color: #92400e;
        margin-bottom: 4px;
    }
    
    .cta-description {
        font-size: 14px;
        color: #a16207;
    }
    
    .contact-info {
        text-align: right;
        font-size: 14px;
        color: #a16207;
        font-weight: 500;
    }
    
    .contact-info div {
        margin-bottom: 4px;
    }
    
    /* New page-specific styles */
    .key-metrics-overview {
        margin-top: 40px;
    }
    
    .executive-summary-full {
        padding: 40px 0;
    }
    
    .summary-text {
        font-size: 18px;
        line-height: 1.8;
        margin-bottom: 40px;
    }
    
    .summary-highlights {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 40px;
    }
    
    .highlight-box {
        flex: 1;
        text-align: center;
        background: #f0f9ff;
        padding: 30px 20px;
        border-radius: 12px;
        border: 2px solid #0ea5e9;
    }
    
    .highlight-number {
        font-size: 32px;
        font-weight: 700;
        color: #0369a1;
        margin-bottom: 8px;
    }
    
    .highlight-label {
        font-size: 14px;
        color: #0369a1;
        font-weight: 500;
    }
    
    .impact-statement-full {
        padding: 20px 0;
    }
    
    .impact-description {
        font-size: 18px;
        line-height: 1.8;
        margin-bottom: 30px;
    }
    
    .impact-visual {
        margin-top: 40px;
    }
    
    .before-after {
        display: flex;
        gap: 40px;
        margin-top: 30px;
    }
    
    .before, .after {
        flex: 1;
        padding: 20px;
        border-radius: 12px;
    }
    
    .before {
        background: #fef2f2;
        border: 2px solid #fecaca;
    }
    
    .after {
        background: #f0fdf4;
        border: 2px solid #bbf7d0;
    }
    
    .before h4, .after h4 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: center;
    }
    
    .before h4 {
        color: #991b1b;
    }
    
    .after h4 {
        color: #166534;
    }
    
    .waste-items, .growth-items {
        display: grid;
        gap: 8px;
    }
    
    .waste-item, .growth-item {
        padding: 8px 12px;
        background: white;
        border-radius: 6px;
        font-size: 14px;
    }
    
    .waste-item {
        color: #991b1b;
        border-left: 3px solid #dc2626;
    }
    
    .growth-item {
        color: #166534;
        border-left: 3px solid #10b981;
    }
    
    .next-steps-full {
        padding: 20px 0;
    }
    
    .ready-section {
        margin-bottom: 40px;
    }
    
    .ready-section h3 {
        font-size: 28px;
        font-weight: 600;
        color: #a16207;
        margin-bottom: 16px;
    }
    
    .ready-section p {
        font-size: 18px;
        color: #92400e;
        line-height: 1.8;
    }
    
    .implementation-preview {
        margin-bottom: 40px;
        background: #f9fafb;
        padding: 30px;
        border-radius: 12px;
    }
    
    .implementation-preview h4 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #1f2937;
        text-align: center;
    }
    
    .timeline-steps {
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }
    
    .step {
        flex: 1;
        text-align: center;
    }
    
    .step-number {
        width: 40px;
        height: 40px;
        background: #3b82f6;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
        margin: 0 auto 12px;
    }
    
    .step-title {
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
    }
    
    .step-description {
        font-size: 12px;
        color: #6b7280;
    }
    
    /* Print Styles */
    @media print {
        .page {
            margin: 0;
            padding: 20mm;
            min-height: 297mm;
            max-height: 297mm;
            width: 210mm;
        }
        
        body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
        }
        
        @page {
            size: A4;
            margin: 0;
        }
    }
</style>
`;