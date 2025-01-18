interface EmailTemplateProps {
  name: string;
  message: string;
  senderEmail: string;
}

export function generateEmailTemplate({ name, message, senderEmail }: EmailTemplateProps): string {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              background-color: #f8fafc;
              padding: 0;
              margin: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            .card {
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              padding: 32px;
              margin-bottom: 24px;
            }
            .header {
              text-align: center;
              margin-bottom: 32px;
            }
            .logo {
              font-size: 24px;
              font-weight: 700;
              color: #2563eb;
              margin-bottom: 16px;
            }
            .title {
              font-size: 20px;
              font-weight: 600;
              color: #1a1a1a;
              margin: 0 0 8px 0;
            }
            .subtitle {
              color: #64748b;
              font-size: 16px;
              margin: 0;
            }
            .message-container {
              background-color: #f8fafc;
              border-radius: 8px;
              padding: 24px;
              margin: 24px 0;
              border: 1px solid #e2e8f0;
            }
            .message-text {
              margin: 0;
              color: #334155;
              white-space: pre-wrap;
            }
            .sender-info {
              display: block;
              margin-top: 24px;
              padding-top: 24px;
              border-top: 1px solid #e2e8f0;
            }
            .sender-label {
              color: #64748b;
              font-size: 14px;
              margin-bottom: 4px;
            }
            .sender-value {
              color: #334155;
              font-weight: 500;
            }
            .footer {
              text-align: center;
              color: #64748b;
              font-size: 14px;
              margin-top: 32px;
            }
            .highlight {
              color: #2563eb;
            }
            @media (max-width: 600px) {
              .container {
                padding: 20px;
              }
              .card {
                padding: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <div class="logo">✉️</div>
                <h1 class="title">New Message Received</h1>
                <p class="subtitle">You have received a new contact form submission</p>
              </div>
  
              <div class="message-container">
                <p class="message-text">${message.replace(/\n/g, '<br>')}</p>
              </div>
  
              <div class="sender-info">
                <p class="sender-label">From</p>
                <p class="sender-value">${name} <span class="highlight">&lt;${senderEmail}&gt;</span></p>
              </div>
            </div>
  
            <div class="footer">
              This message was sent securely through your website contact form.
              <br>
              © ${new Date().getFullYear()} Your Company. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;
}
