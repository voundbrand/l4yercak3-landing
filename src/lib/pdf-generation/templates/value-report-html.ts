/**
 * HTML template for L4YERCAK3 Value Report
 * Beautiful, professional design based on the go-to-market page content
 */

export const VALUE_REPORT_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{organizationName}} - Value Report</title>
</head>
<body>
    <!-- Page 1: Executive Summary -->
    <div class="page">
        <div class="header">
            <div class="logo">{{companyName}}</div>
            <div class="report-type">Value Assessment Report</div>
        </div>
        
        <div class="hero-section">
            <h1 class="main-title">Your Hidden Value Opportunity</h1>
            <div class="organization-info">
                <h2>{{organizationName}}</h2>
                <p>Prepared for {{fullName}}, {{jobTitle}}</p>
                <p class="report-date">{{reportDate}}</p>
            </div>
        </div>

        <div class="value-highlight">
            <div class="total-value">
                <div class="value-amount">€{{totalValueCreated | number_format}}</div>
                <div class="value-label">Total Annual Value Opportunity</div>
            </div>
            
            <div class="value-breakdown">
                <div class="breakdown-item">
                    <div class="breakdown-amount">€{{laborCostAvoided | number_format}}</div>
                    <div class="breakdown-label">Labor Cost Avoided</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-amount">€{{conservativeNewRevenue | number_format}}</div>
                    <div class="breakdown-label">New Revenue Potential</div>
                </div>
            </div>
        </div>

        <div class="executive-summary">
            <h3>Executive Summary</h3>
            <p>Your organization is currently losing <strong>€{{annualWaste | number_format}}</strong> annually to manual processes that could be automated. This represents <strong>{{potentialFreedHours | number_format}} hours</strong> of strategic capacity locked away in repetitive tasks.</p>
            
            <p>By implementing L4YERCAK3's automation platform, your team could redirect this capacity toward revenue-generating activities, potentially creating <strong>€{{conservativeNewRevenue | number_format}}</strong> in new annual revenue.</p>
            
            <div class="key-metrics">
                <div class="metric">
                    <div class="metric-value">{{potentialFreedWeeklyHours | number_format}}</div>
                    <div class="metric-label">Hours/Week Freed</div>
                </div>
                <div class="metric">
                    <div class="metric-value">{{newMembersAcquired | number_format}}</div>
                    <div class="metric-label">New Members Possible</div>
                </div>
                <div class="metric">
                    <div class="metric-value">90%</div>
                    <div class="metric-label">Automation Potential</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page 2: Current Waste Analysis -->
    <div class="page">
        <div class="page-header">
            <h2>Where Your Value Is Hidden</h2>
            <p>Analysis of manual processes consuming your team's strategic capacity</p>
        </div>

        <div class="waste-analysis">
            <div class="waste-overview">
                <div class="waste-amount">€{{annualWaste | number_format}}</div>
                <div class="waste-label">Annual Cost of Manual Work</div>
                <div class="waste-hours">{{potentialFreedHours | number_format}} hours trapped in repetitive tasks</div>
            </div>

            <div class="task-breakdown">
                <h3>Task Breakdown Analysis</h3>
                
                {% for task_name, task_data in taskBreakdown.items() %}
                <div class="task-item">
                    <div class="task-header">
                        <div class="task-name">
                            {% if task_name == 'eventCoordination' %}Event Coordination{% endif %}
                            {% if task_name == 'memberCommunication' %}Member Communication{% endif %}
                            {% if task_name == 'complianceReporting' %}Compliance & Reporting{% endif %}
                            {% if task_name == 'financialAdmin' %}Financial Administration{% endif %}
                            {% if task_name == 'dataManagement' %}Data Management{% endif %}
                        </div>
                        <div class="task-cost">€{{task_data.annualCost | number_format}}/year</div>
                    </div>
                    <div class="task-details">
                        <div class="task-hours">{{task_data.annualHours | number_format}} hours annually</div>
                        <div class="task-percentage">{{task_data.percentage}}% of total manual work</div>
                    </div>
                    <div class="automation-potential">
                        <div class="automation-bar">
                            <div class="automation-fill" style="width: 90%"></div>
                        </div>
                        <div class="automation-text">90% automation potential</div>
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>

        <div class="impact-statement">
            <h3>The Strategic Impact</h3>
            <p>These {{potentialFreedHours | number_format}} hours represent more than cost savings—they're your pathway to growth. Instead of copying data and managing spreadsheets, your team could focus on:</p>
            
            <div class="growth-activities">
                <div class="activity">Member recruitment and retention strategies</div>
                <div class="activity">Strategic partnership development</div>
                <div class="activity">New program creation and expansion</div>
                <div class="activity">Revenue optimization initiatives</div>
                <div class="activity">Board-level strategic planning</div>
            </div>
        </div>
    </div>

    <!-- Page 3: Revenue Growth Opportunities -->
    <div class="page">
        <div class="page-header">
            <h2>Your Revenue Growth Potential</h2>
            <p>Conservative projections based on freed strategic capacity</p>
        </div>

        <div class="revenue-opportunities">
            <div class="opportunity-overview">
                <div class="total-revenue">€{{conservativeNewRevenue | number_format}}</div>
                <div class="revenue-label">Conservative Annual Revenue Potential</div>
            </div>

            <div class="revenue-breakdown">
                <div class="revenue-item">
                    <div class="revenue-icon">👥</div>
                    <div class="revenue-content">
                        <div class="revenue-title">Member Growth</div>
                        <div class="revenue-description">{{newMembersAcquired}} new members acquired through focused recruitment</div>
                        <div class="revenue-amount">€{{memberRevenue | number_format}}</div>
                    </div>
                </div>

                <div class="revenue-item">
                    <div class="revenue-icon">🚀</div>
                    <div class="revenue-content">
                        <div class="revenue-title">Program Expansion</div>
                        <div class="revenue-description">2-3 new premium programs developed with freed capacity</div>
                        <div class="revenue-amount">€{{newProgramRevenue | number_format}}</div>
                    </div>
                </div>

                <div class="revenue-item">
                    <div class="revenue-icon">🤝</div>
                    <div class="revenue-content">
                        <div class="revenue-title">Partnership Development</div>
                        <div class="revenue-description">2 corporate sponsorships secured through strategic outreach</div>
                        <div class="revenue-amount">€{{partnershipRevenue | number_format}}</div>
                    </div>
                </div>

                <div class="revenue-item">
                    <div class="revenue-icon">🔒</div>
                    <div class="revenue-content">
                        <div class="revenue-title">Member Retention</div>
                        <div class="revenue-description">5% churn reduction through improved member experience</div>
                        <div class="revenue-amount">€{{churnReductionRevenue | number_format}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="growth-chart">
            <h3>Growth Trajectory</h3>
            <div class="chart-container">
                <div id="growthChart"></div>
            </div>
        </div>
    </div>

    <!-- Page 4: Implementation Roadmap -->
    <div class="page">
        <div class="page-header">
            <h2>Your Path to Value Realization</h2>
            <p>Strategic implementation roadmap for {{organizationName}}</p>
        </div>

        <div class="implementation-timeline">
            <div class="timeline-item">
                <div class="timeline-marker">1</div>
                <div class="timeline-content">
                    <div class="timeline-title">Assessment & Planning</div>
                    <div class="timeline-duration">Week 1-2</div>
                    <div class="timeline-description">Deep dive into your current processes and identify quick wins</div>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">2</div>
                <div class="timeline-content">
                    <div class="timeline-title">Pilot Implementation</div>
                    <div class="timeline-duration">Week 3-6</div>
                    <div class="timeline-description">Start with highest-impact automation (typically event management)</div>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">3</div>
                <div class="timeline-content">
                    <div class="timeline-title">Expansion Phase</div>
                    <div class="timeline-duration">Month 2-3</div>
                    <div class="timeline-description">Roll out member communication and compliance automation</div>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-marker">4</div>
                <div class="timeline-content">
                    <div class="timeline-title">Full Optimization</div>
                    <div class="timeline-duration">Month 4-6</div>
                    <div class="timeline-description">Complete automation suite with advanced analytics and reporting</div>
                </div>
            </div>
        </div>

        <div class="roi-projection">
            <h3>ROI Projection</h3>
            <div class="roi-timeline">
                <div class="roi-period">
                    <div class="roi-month">Month 1</div>
                    <div class="roi-value">Break-even</div>
                </div>
                <div class="roi-period">
                    <div class="roi-month">Month 3</div>
                    <div class="roi-value">150% ROI</div>
                </div>
                <div class="roi-period">
                    <div class="roi-month">Month 6</div>
                    <div class="roi-value">300% ROI</div>
                </div>
                <div class="roi-period">
                    <div class="roi-month">Year 1</div>
                    <div class="roi-value">500% ROI</div>
                </div>
            </div>
        </div>

        <div class="next-steps">
            <h3>Ready to Get Started?</h3>
            <p>Your {{timeline}} timeline aligns perfectly with our implementation approach. Let's discuss how to unlock your €{{totalValueCreated | number_format}} value opportunity.</p>
            
            <div class="cta-section">
                <div class="cta-primary">
                    <div class="cta-title">Schedule Your Strategy Session</div>
                    <div class="cta-description">30-minute consultation to map your specific implementation plan</div>
                </div>
                <div class="contact-info">
                    <div>{{companyWebsite}}</div>
                    <div>{{supportEmail}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Chart Scripts -->
    <script>
        // Growth projection chart
        if (typeof ApexCharts !== 'undefined') {
            const growthData = {
                series: [{
                    name: 'Current State',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: 'With L4YERCAK3',
                    data: [0, {{memberRevenue/12 | round}}, {{(memberRevenue + newProgramRevenue)/12 | round}}, {{(memberRevenue + newProgramRevenue + partnershipRevenue/4)/12 | round}}, {{(memberRevenue + newProgramRevenue + partnershipRevenue/2)/12 | round}}, {{(memberRevenue + newProgramRevenue + partnershipRevenue)/12 | round}}, {{conservativeNewRevenue/12 | round}}, {{conservativeNewRevenue/12 | round}}, {{conservativeNewRevenue/12 | round}}, {{conservativeNewRevenue/12 | round}}, {{conservativeNewRevenue/12 | round}}, {{conservativeNewRevenue/12 | round}}]
                }],
                chart: {
                    type: 'area',
                    height: 300,
                    animations: { enabled: false },
                    toolbar: { show: false }
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yaxis: {
                    labels: {
                        formatter: function(value) {
                            return '€' + value.toLocaleString();
                        }
                    }
                },
                colors: ['#e5e7eb', '#3b82f6'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.3,
                    }
                }
            };

            new ApexCharts(document.querySelector("#growthChart"), growthData).render();
        }
    </script>
</body>
</html>
`;

export const VALUE_REPORT_CSS = `
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
    
    /* Revenue Opportunities */
    .opportunity-overview {
        text-align: center;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 40px;
        border-radius: 16px;
        margin-bottom: 40px;
    }
    
    .total-revenue {
        font-size: 56px;
        font-weight: 700;
        margin-bottom: 8px;
    }
    
    .revenue-label {
        font-size: 18px;
        opacity: 0.9;
        font-weight: 500;
    }
    
    .revenue-breakdown {
        display: grid;
        gap: 20px;
        margin-bottom: 40px;
    }
    
    .revenue-item {
        display: flex;
        align-items: center;
        background: white;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        gap: 20px;
    }
    
    .revenue-icon {
        font-size: 32px;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f0f9ff;
        border-radius: 50%;
    }
    
    .revenue-content {
        flex: 1;
    }
    
    .revenue-title {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
    }
    
    .revenue-description {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }
    
    .revenue-amount {
        font-size: 20px;
        font-weight: 700;
        color: #10b981;
    }
    
    /* Growth Chart */
    .growth-chart {
        background: #f9fafb;
        padding: 32px;
        border-radius: 12px;
    }
    
    .growth-chart h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #1f2937;
        text-align: center;
    }
    
    .chart-container {
        height: 300px;
    }
    
    /* Implementation Timeline */
    .implementation-timeline {
        margin-bottom: 40px;
    }
    
    .timeline-item {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 32px;
    }
    
    .timeline-marker {
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
        flex-shrink: 0;
    }
    
    .timeline-content {
        flex: 1;
    }
    
    .timeline-title {
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
    }
    
    .timeline-duration {
        font-size: 14px;
        color: #3b82f6;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .timeline-description {
        font-size: 16px;
        color: #6b7280;
    }
    
    /* ROI Projection */
    .roi-projection {
        background: #f0fdf4;
        padding: 32px;
        border-radius: 12px;
        margin-bottom: 40px;
    }
    
    .roi-projection h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #166534;
        text-align: center;
    }
    
    .roi-timeline {
        display: flex;
        justify-content: space-between;
        gap: 16px;
    }
    
    .roi-period {
        text-align: center;
        background: white;
        padding: 20px;
        border-radius: 8px;
        flex: 1;
        border: 2px solid #bbf7d0;
    }
    
    .roi-month {
        font-size: 14px;
        color: #166534;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .roi-value {
        font-size: 20px;
        font-weight: 700;
        color: #15803d;
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
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
`;