/**
 * HTML template for L4YERCAK3 Founder Value Report
 * Professional design for funded founders/technical builders
 */

export const FOUNDER_REPORT_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{companyName}} - Build Sprint Value Report</title>
</head>
<body>
    <!-- Page 1: Executive Summary -->
    <div class="page">
        <div class="header">
            <div class="logo">L4YERCAK3</div>
            <div class="report-type">Build Sprint Value Report</div>
        </div>

        <div class="hero-section">
            <h1 class="main-title">Your Build Sprint Advantage</h1>
            <div class="organization-info">
                <h2>{{companyName}}</h2>
                <p>Prepared for {{fullName}}, {{role}}</p>
                <p class="report-date">{{reportDate}}</p>
            </div>
        </div>

        <div class="value-highlight">
            <div class="total-value">
                <div class="value-amount">€{{totalFirstYearValue | number_format}}</div>
                <div class="value-label">Total First-Year Value</div>
            </div>

            <div class="value-breakdown">
                <div class="breakdown-item">
                    <div class="breakdown-amount">{{monthsSaved}} months</div>
                    <div class="breakdown-label">Time to Launch Saved</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-amount">€{{burnSaved | number_format}}</div>
                    <div class="breakdown-label">Burn Rate Saved</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-amount">{{roiMultiple}}x</div>
                    <div class="breakdown-label">ROI Multiple</div>
                </div>
            </div>
        </div>

        <div class="executive-summary">
            <h3>Executive Summary</h3>
            <p>As a <strong>{{fundingStage}}</strong> stage startup with <strong>{{runwayMonths}} months</strong> of runway, time-to-market is critical. Building infrastructure yourself would take <strong>{{selfBuildMonths}} months</strong> and consume <strong>€{{hiringCost | number_format}}</strong> in developer hiring costs.</p>

            <p>With Build Sprint, you launch in <strong>12 weeks</strong> with production-ready infrastructure, saving <strong>{{monthsSaved}} months</strong> and <strong>€{{burnSaved | number_format}}</strong> in burn rate. This extends your effective runway by <strong>{{runwayExtension}} months</strong>.</p>

            <div class="key-metrics">
                <div class="metric">
                    <div class="metric-value">12</div>
                    <div class="metric-label">Weeks to Launch</div>
                </div>
                <div class="metric">
                    <div class="metric-value">€{{buildSprintCost | number_format}}</div>
                    <div class="metric-label">Build Sprint Investment</div>
                </div>
                <div class="metric">
                    <div class="metric-value">{{competitorRisk}}</div>
                    <div class="metric-label">Market Timing Risk</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page 2: Time & Runway Analysis -->
    <div class="page">
        <div class="page-header">
            <h2>Time to Launch & Runway Impact</h2>
            <p>How Build Sprint accelerates your path to market</p>
        </div>

        <div class="time-comparison">
            <div class="comparison-overview">
                <div class="comparison-item diy">
                    <div class="comparison-label">DIY / Hire & Build</div>
                    <div class="comparison-value">{{selfBuildMonths}} months</div>
                    <div class="comparison-detail">Including ~2 months for hiring</div>
                </div>
                <div class="comparison-arrow">→</div>
                <div class="comparison-item build-sprint">
                    <div class="comparison-label">With Build Sprint</div>
                    <div class="comparison-value">12 weeks</div>
                    <div class="comparison-detail">Launch-ready product</div>
                </div>
            </div>

            <div class="savings-callout">
                <div class="savings-value">{{monthsSaved}} months saved</div>
                <div class="savings-detail">Every month saved = €{{monthlyBurn | number_format}} in burn rate preserved</div>
            </div>
        </div>

        <div class="runway-impact">
            <h3>Runway Impact Analysis</h3>

            <div class="runway-visual">
                <div class="runway-bar">
                    <div class="runway-current" style="width: 100%">
                        <span class="runway-label">Current Runway: {{runwayMonths}} months</span>
                    </div>
                </div>
                <div class="runway-bar extended">
                    <div class="runway-extended" style="width: calc(100% + {{runwayExtensionPercent}}%)">
                        <span class="runway-label">Effective with Build Sprint: {{effectiveRunway}} months</span>
                    </div>
                </div>
            </div>

            <div class="runway-details">
                <div class="runway-detail-item">
                    <div class="detail-label">Burn Rate Saved</div>
                    <div class="detail-value">€{{burnSaved | number_format}}</div>
                    <div class="detail-calc">({{monthsSaved}} months × €{{monthlyBurn | number_format}}/mo)</div>
                </div>
                <div class="runway-detail-item">
                    <div class="detail-label">Runway Extension</div>
                    <div class="detail-value">+{{runwayExtension}} months</div>
                    <div class="detail-calc">More time to find product-market fit</div>
                </div>
            </div>
        </div>

        <div class="opportunity-cost-callout">
            <h4>⚠️ The Cost of Delay</h4>
            <p>Every month you spend building infrastructure, your competitors are:</p>
            <div class="activities-grid">
                <div class="activity">Acquiring customers</div>
                <div class="activity">Learning from users</div>
                <div class="activity">Iterating on product</div>
                <div class="activity">Raising their next round</div>
            </div>
        </div>
    </div>

    <!-- Page 3: Cost Comparison -->
    <div class="page">
        <div class="page-header">
            <h2>Cost Comparison: Hiring vs Build Sprint</h2>
            <p>Your investment options analyzed</p>
        </div>

        <div class="cost-comparison">
            <div class="cost-option hiring">
                <div class="option-header">
                    <div class="option-icon">👥</div>
                    <h4>Hire & Build In-House</h4>
                </div>
                <div class="option-costs">
                    <div class="cost-item">
                        <span class="cost-label">Developer Hiring ({{developerCount}})</span>
                        <span class="cost-value">€{{hiringCost | number_format}}/year</span>
                    </div>
                    <div class="cost-item">
                        <span class="cost-label">Hiring Time Cost</span>
                        <span class="cost-value">~2 months delay</span>
                    </div>
                    <div class="cost-item">
                        <span class="cost-label">Infrastructure Build Time</span>
                        <span class="cost-value">{{infrastructureMonths}} months</span>
                    </div>
                    <div class="cost-item">
                        <span class="cost-label">Burn During Build</span>
                        <span class="cost-value">€{{burnDuringBuild | number_format}}</span>
                    </div>
                    <div class="cost-total">
                        <span class="cost-label">Total First Year</span>
                        <span class="cost-value">€{{totalDIYCost | number_format}}</span>
                    </div>
                </div>
            </div>

            <div class="vs-divider">VS</div>

            <div class="cost-option build-sprint">
                <div class="option-header">
                    <div class="option-icon">🚀</div>
                    <h4>Build Sprint</h4>
                </div>
                <div class="option-costs">
                    <div class="cost-item">
                        <span class="cost-label">Build Sprint Package</span>
                        <span class="cost-value">€{{buildSprintCost | number_format}}</span>
                    </div>
                    <div class="cost-item highlight">
                        <span class="cost-label">Time to Launch</span>
                        <span class="cost-value">12 weeks</span>
                    </div>
                    <div class="cost-item highlight">
                        <span class="cost-label">Infrastructure</span>
                        <span class="cost-value">Included</span>
                    </div>
                    <div class="cost-item highlight">
                        <span class="cost-label">Expert Guidance</span>
                        <span class="cost-value">Included</span>
                    </div>
                    <div class="cost-total savings">
                        <span class="cost-label">Total Investment</span>
                        <span class="cost-value">€{{buildSprintCost | number_format}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="savings-summary">
            <div class="savings-box">
                <div class="savings-icon">💰</div>
                <div class="savings-content">
                    <div class="savings-title">First Year Savings</div>
                    <div class="savings-amount">€{{firstYearSavings | number_format}}</div>
                    <div class="savings-breakdown">Hiring avoided + Burn saved - Build Sprint investment</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page 4: What You Get & Next Steps -->
    <div class="page">
        <div class="page-header">
            <h2>What You Get with Build Sprint</h2>
            <p>Production-ready infrastructure in 12 weeks</p>
        </div>

        <div class="infrastructure-grid">
            {{#each infrastructure}}
            <div class="infrastructure-item {{#if enabled}}enabled{{/if}}">
                <div class="infra-header">
                    <div class="infra-icon">{{icon}}</div>
                    <div class="infra-name">{{name}}</div>
                </div>
                {{#if enabled}}
                <div class="infra-details">
                    <div class="infra-time-saved">{{weeksSaved}} weeks saved</div>
                    <ul class="infra-features">
                        {{#each features}}
                        <li>{{this}}</li>
                        {{/each}}
                    </ul>
                </div>
                {{else}}
                <div class="infra-not-needed">Not required for your product</div>
                {{/if}}
            </div>
            {{/each}}
        </div>

        <div class="build-sprint-tiers">
            <h3>Build Sprint Packages</h3>
            <div class="tier-recommendation">
                Based on your {{fundingStage}} stage, we recommend: <strong>{{recommendedTier}}</strong>
            </div>
            <div class="tiers-grid">
                <div class="tier {{#if starterRecommended}}recommended{{/if}}">
                    <div class="tier-name">Starter</div>
                    <div class="tier-price">€7,500</div>
                    <div class="tier-for">For: Bootstrapped / Pre-seed</div>
                </div>
                <div class="tier {{#if growthRecommended}}recommended{{/if}}">
                    <div class="tier-name">Growth</div>
                    <div class="tier-price">€15,000</div>
                    <div class="tier-for">For: Seed funded</div>
                </div>
                <div class="tier {{#if scaleRecommended}}recommended{{/if}}">
                    <div class="tier-name">Scale</div>
                    <div class="tier-price">€25,000</div>
                    <div class="tier-for">For: Series A+</div>
                </div>
            </div>
        </div>

        <div class="next-steps">
            <h3>Ready to Ship Faster?</h3>
            <p>Your {{primaryGoal}} with {{timelineUrgency}} timeline aligns perfectly with Build Sprint. Let's discuss how to get you launched.</p>

            <div class="cta-section">
                <div class="cta-primary">
                    <div class="cta-title">Book Your Strategy Call</div>
                    <div class="cta-description">15-minute consultation to map your specific implementation plan</div>
                </div>
                <div class="contact-info">
                    <div>l4yercak3.com</div>
                    <div>hello@l4yercak3.com</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const FOUNDER_REPORT_CSS = `
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
        min-height: 100vh;
        padding: 40px;
        page-break-after: always;
        position: relative;
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

    /* Time Comparison */
    .time-comparison {
        margin-bottom: 40px;
    }

    .comparison-overview {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 30px;
    }

    .comparison-item {
        flex: 1;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
    }

    .comparison-item.diy {
        background: #fef2f2;
        border: 2px solid #fecaca;
    }

    .comparison-item.build-sprint {
        background: #f0fdf4;
        border: 2px solid #bbf7d0;
    }

    .comparison-label {
        font-size: 14px;
        font-weight: 600;
        color: #6b7280;
        margin-bottom: 8px;
    }

    .comparison-value {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 8px;
    }

    .comparison-item.diy .comparison-value {
        color: #dc2626;
    }

    .comparison-item.build-sprint .comparison-value {
        color: #16a34a;
    }

    .comparison-detail {
        font-size: 12px;
        color: #6b7280;
    }

    .comparison-arrow {
        font-size: 36px;
        color: #3b82f6;
        font-weight: bold;
    }

    .savings-callout {
        text-align: center;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 24px;
        border-radius: 12px;
    }

    .savings-value {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
    }

    .savings-detail {
        font-size: 14px;
        opacity: 0.9;
    }

    /* Runway Impact */
    .runway-impact {
        margin-bottom: 40px;
    }

    .runway-impact h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
        color: #1f2937;
    }

    .runway-visual {
        margin-bottom: 30px;
    }

    .runway-bar {
        height: 40px;
        background: #e5e7eb;
        border-radius: 8px;
        margin-bottom: 16px;
        position: relative;
        overflow: visible;
    }

    .runway-current {
        height: 100%;
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0 16px;
    }

    .runway-extended {
        height: 100%;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0 16px;
    }

    .runway-label {
        color: white;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
    }

    .runway-details {
        display: flex;
        gap: 24px;
    }

    .runway-detail-item {
        flex: 1;
        background: #f9fafb;
        padding: 24px;
        border-radius: 8px;
        text-align: center;
    }

    .detail-label {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }

    .detail-value {
        font-size: 28px;
        font-weight: 700;
        color: #10b981;
        margin-bottom: 8px;
    }

    .detail-calc {
        font-size: 12px;
        color: #9ca3af;
    }

    /* Opportunity Cost Callout */
    .opportunity-cost-callout {
        background: #fffbeb;
        border: 2px solid #fde68a;
        padding: 24px;
        border-radius: 12px;
    }

    .opportunity-cost-callout h4 {
        font-size: 18px;
        font-weight: 600;
        color: #92400e;
        margin-bottom: 12px;
    }

    .opportunity-cost-callout p {
        font-size: 14px;
        color: #a16207;
        margin-bottom: 16px;
    }

    .activities-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
    }

    .activity {
        background: white;
        padding: 12px;
        border-radius: 6px;
        text-align: center;
        font-size: 13px;
        color: #92400e;
        border: 1px solid #fde68a;
    }

    /* Cost Comparison */
    .cost-comparison {
        display: flex;
        align-items: stretch;
        gap: 24px;
        margin-bottom: 40px;
    }

    .cost-option {
        flex: 1;
        padding: 24px;
        border-radius: 12px;
    }

    .cost-option.hiring {
        background: #fef2f2;
        border: 2px solid #fecaca;
    }

    .cost-option.build-sprint {
        background: #f0fdf4;
        border: 2px solid #bbf7d0;
    }

    .option-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
    }

    .option-icon {
        font-size: 24px;
    }

    .option-header h4 {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
    }

    .option-costs {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .cost-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }

    .cost-item.highlight {
        background: rgba(16, 185, 129, 0.1);
        padding: 8px 12px;
        margin: 0 -12px;
        border-radius: 6px;
        border: none;
    }

    .cost-label {
        font-size: 14px;
        color: #6b7280;
    }

    .cost-value {
        font-size: 14px;
        font-weight: 600;
        color: #1f2937;
    }

    .cost-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 2px solid rgba(0,0,0,0.1);
    }

    .cost-total .cost-label {
        font-weight: 700;
        color: #1f2937;
    }

    .cost-total .cost-value {
        font-size: 24px;
    }

    .cost-total.savings .cost-value {
        color: #16a34a;
    }

    .vs-divider {
        display: flex;
        align-items: center;
        font-size: 24px;
        font-weight: 700;
        color: #9ca3af;
    }

    /* Savings Summary */
    .savings-summary {
        margin-top: 24px;
    }

    .savings-box {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 32px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 24px;
    }

    .savings-icon {
        font-size: 48px;
    }

    .savings-title {
        font-size: 16px;
        opacity: 0.9;
        margin-bottom: 8px;
    }

    .savings-amount {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 8px;
    }

    .savings-breakdown {
        font-size: 14px;
        opacity: 0.8;
    }

    /* Infrastructure Grid */
    .infrastructure-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 40px;
    }

    .infrastructure-item {
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        background: #f9fafb;
    }

    .infrastructure-item.enabled {
        background: white;
        border-color: #3b82f6;
    }

    .infra-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
    }

    .infra-icon {
        font-size: 24px;
    }

    .infra-name {
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
    }

    .infra-time-saved {
        font-size: 14px;
        font-weight: 600;
        color: #10b981;
        margin-bottom: 8px;
    }

    .infra-features {
        margin: 0;
        padding-left: 16px;
    }

    .infra-features li {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 4px;
    }

    .infra-not-needed {
        font-size: 12px;
        color: #9ca3af;
        font-style: italic;
    }

    /* Build Sprint Tiers */
    .build-sprint-tiers {
        margin-bottom: 40px;
    }

    .build-sprint-tiers h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #1f2937;
    }

    .tier-recommendation {
        background: #f0f9ff;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
        color: #0369a1;
    }

    .tiers-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .tier {
        padding: 24px;
        border-radius: 12px;
        text-align: center;
        border: 2px solid #e5e7eb;
        background: white;
    }

    .tier.recommended {
        border-color: #3b82f6;
        background: #f0f9ff;
    }

    .tier-name {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #1f2937;
    }

    .tier-price {
        font-size: 28px;
        font-weight: 700;
        color: #3b82f6;
        margin-bottom: 8px;
    }

    .tier-for {
        font-size: 12px;
        color: #6b7280;
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

    /* Print Styles */
    @media print {
        .page {
            margin: 0;
            padding: 20px;
        }

        body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
        }
    }
</style>
`;
