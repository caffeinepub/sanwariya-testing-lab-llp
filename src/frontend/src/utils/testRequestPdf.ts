import { format } from 'date-fns';
import { COMPANY_INFO, getFullAddress } from '@/lib/companyInfo';
import type { TestRequest } from '@/backend';

/**
 * Generates an HTML report for a test request and opens it in a new window for printing
 * @param request - The test request data
 */
export function generateTestRequestReport(request: TestRequest): void {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Request Report - ${request.id}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .header {
      border-bottom: 3px solid #e85d04;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .company-name {
      font-size: 24px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 10px;
    }
    
    .company-info {
      font-size: 12px;
      color: #666;
      line-height: 1.8;
    }
    
    .report-title {
      font-size: 20px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 25px;
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 12px;
      padding-bottom: 5px;
      border-bottom: 1px solid #ddd;
    }
    
    .field {
      margin-bottom: 10px;
      display: flex;
      gap: 10px;
    }
    
    .field-label {
      font-weight: bold;
      min-width: 180px;
      color: #555;
    }
    
    .field-value {
      flex: 1;
      color: #333;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 10px;
      color: #999;
      text-align: center;
    }
    
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background-color: #e85d04;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .print-button:hover {
      background-color: #d14d00;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .print-button {
        display: none;
      }
      
      .header {
        border-bottom-color: #000;
      }
    }
  </style>
</head>
<body>
  <button class="print-button" onclick="window.print()">Print / Save as PDF</button>
  
  <div class="header">
    <div class="company-name">${COMPANY_INFO.name}</div>
    <div class="company-info">
      ${getFullAddress()}<br>
      Email: ${COMPANY_INFO.email}<br>
      Phone: ${COMPANY_INFO.phones.join(', ')}<br>
      GSTIN: ${COMPANY_INFO.gstin}
    </div>
  </div>
  
  <div class="report-title">Test Request Report</div>
  
  <div class="section">
    <div class="section-title">Request Information</div>
    <div class="field">
      <div class="field-label">Request ID:</div>
      <div class="field-value">${request.id}</div>
    </div>
    <div class="field">
      <div class="field-label">Customer Name:</div>
      <div class="field-value">${request.customerName}</div>
    </div>
    ${request.company ? `
    <div class="field">
      <div class="field-label">Company:</div>
      <div class="field-value">${request.company}</div>
    </div>
    ` : ''}
    <div class="field">
      <div class="field-label">Phone:</div>
      <div class="field-value">${request.phone}</div>
    </div>
    ${request.email ? `
    <div class="field">
      <div class="field-label">Email:</div>
      <div class="field-value">${request.email}</div>
    </div>
    ` : ''}
  </div>
  
  <div class="section">
    <div class="section-title">Test Details</div>
    <div class="field">
      <div class="field-label">Test Item Type:</div>
      <div class="field-value">${request.testItemType}</div>
    </div>
    ${request.standards ? `
    <div class="field">
      <div class="field-label">Standards/Requirements:</div>
      <div class="field-value">${request.standards}</div>
    </div>
    ` : ''}
    ${request.message ? `
    <div class="field">
      <div class="field-label">Message/Details:</div>
      <div class="field-value">${request.message}</div>
    </div>
    ` : ''}
    ${request.preferredDate ? `
    <div class="field">
      <div class="field-label">Preferred Date:</div>
      <div class="field-value">${format(new Date(Number(request.preferredDate) / 1_000_000), 'MMMM d, yyyy')}</div>
    </div>
    ` : ''}
    <div class="field">
      <div class="field-label">Submitted Date:</div>
      <div class="field-value">${format(new Date(Number(request.submittedAt) / 1_000_000), 'MMMM d, yyyy')}</div>
    </div>
  </div>
  
  <div class="footer">
    Generated on ${format(new Date(), 'MMMM d, yyyy')} at ${format(new Date(), 'h:mm a')}
  </div>
</body>
</html>
  `;

  // Open in new window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    throw new Error('Failed to open print window. Please allow pop-ups for this site.');
  }
}

/**
 * Downloads the test request report as a printable HTML file
 * Users can then use their browser's "Print to PDF" feature
 * @param request - The test request data
 */
export function downloadTestRequestPdf(request: TestRequest): void {
  try {
    generateTestRequestReport(request);
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
}
