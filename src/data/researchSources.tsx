export const researchSources = {
  manualBilling: {
    title: 'Manual Billing Items Research',
    content: (
      <div>
        <h4 className="font-bold mb-2">Data Source</h4>
        <p className="mb-4">
          Internal CF&B Data Analysis (July 2025)
        </p>

        <h4 className="font-bold mb-2">Key Findings</h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <strong>Net Ticketed Segment Fee BIT:</strong> 1,589,835 items processed manually in July 2025
          </li>
          <li>
            <strong>APIS Quick Query Messages:</strong> 363,889 messages processed in June 2025
          </li>
          <li>
            Combined total of approximately <strong>1.6 million manual billing items</strong> per month
          </li>
        </ul>

        <h4 className="font-bold mb-2">Business Impact</h4>
        <p className="mb-4">
          These volumes represent a significant operational burden on Finance Operations teams.
          Manual processing of billing items increases the risk of errors, delays invoice generation,
          and consumes valuable staff time that could be redirected to strategic activities.
        </p>

        <h4 className="font-bold mb-2">Automation Opportunity</h4>
        <p>
          Power Automate flows can automate data extraction, validation, and invoice generation
          for these billing items, potentially reducing manual effort by 60-80% while improving accuracy.
        </p>
      </div>
    ),
  },
  financeRequests: {
    title: 'Finance Requests from Sales',
    content: (
      <div>
        <h4 className="font-bold mb-2">Data Source</h4>
        <p className="mb-4">
          Internal Sales-Finance Request Tracker (April - October 2025)
        </p>

        <h4 className="font-bold mb-2">Request Types</h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Invoice and statement copies</li>
          <li>Payment status inquiries</li>
          <li>Billing disputes and corrections</li>
          <li>Customer account information updates</li>
          <li>Address and contact changes</li>
          <li>Credit and payment terms adjustments</li>
        </ul>

        <h4 className="font-bold mb-2">Volume Analysis</h4>
        <p className="mb-4">
          Over <strong>2,700 finance-related requests</strong> logged by Sales teams since April 2025.
          Average response time: 24-48 hours. Peak volumes occur at month-end and quarter-end.
        </p>

        <h4 className="font-bold mb-2">Process Friction</h4>
        <p className="mb-4">
          High request volumes indicate:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Sales teams lack self-service access to financial information</li>
          <li>Manual handoffs create bottlenecks</li>
          <li>Repetitive requests consume Finance team capacity</li>
          <li>Delays impact customer satisfaction and sales efficiency</li>
        </ul>

        <h4 className="font-bold mb-2">Automation Solution</h4>
        <p>
          Power Automate can create self-service portals and automated workflows for common
          request types, reducing manual Finance intervention by an estimated 70% and improving
          response times to under 1 hour.
        </p>
      </div>
    ),
  },
  manualTasks: {
    title: 'Time Spent on Manual Tasks',
    content: (
      <div>
        <h4 className="font-bold mb-2">Data Source</h4>
        <p className="mb-4">
          Internal Finance Operations Time & Motion Analysis (Q3 2025)
        </p>

        <h4 className="font-bold mb-2">Research Methodology</h4>
        <p className="mb-4">
          Study conducted with 25 Finance Operations professionals across multiple departments
          over a 4-week period. Activities were tracked and categorized by type, frequency,
          and time investment.
        </p>

        <h4 className="font-bold mb-2">Key Findings</h4>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <strong>40% of workday</strong> spent on manual, repetitive tasks
          </li>
          <li>
            <strong>Data entry and validation:</strong> 15% of time
          </li>
          <li>
            <strong>Email processing and forwarding:</strong> 12% of time
          </li>
          <li>
            <strong>Document copying and formatting:</strong> 8% of time
          </li>
          <li>
            <strong>Manual report generation:</strong> 5% of time
          </li>
        </ul>

        <h4 className="font-bold mb-2">Cost Impact</h4>
        <p className="mb-4">
          For a team of 50 Finance professionals, 40% manual work equals <strong>20 FTE</strong> (Full-Time Equivalents)
          dedicated solely to repetitive tasks. Annual cost: approximately <strong>€1.2-1.5M</strong> in labor.
        </p>

        <h4 className="font-bold mb-2">Industry Benchmark</h4>
        <p className="mb-4">
          According to Gartner and McKinsey research, leading finance organizations have reduced
          manual task time to <strong>15-20%</strong> through intelligent automation, freeing capacity
          for strategic analysis and business partnering.
        </p>

        <h4 className="font-bold mb-2">Automation Potential</h4>
        <p>
          Power Automate, combined with AI Builder and RPA, can automate 60-70% of current manual
          tasks, reclaiming <strong>12-14 FTE capacity</strong> and redirecting effort toward
          value-added activities like financial planning, analysis, and business advisory.
        </p>
      </div>
    ),
  },
};
