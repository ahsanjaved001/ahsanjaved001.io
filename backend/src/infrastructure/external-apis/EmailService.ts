import nodemailer from 'nodemailer';
import { MessageEntity } from '../../domains/message/entities/MessageEntity';
import { AppError } from '../../shared/errors';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig | null = null;
  private isInitialized: boolean = false;
  private initializationAttempted: boolean = false;

  constructor() {
    // Don't initialize in constructor - wait for lazy initialization
  }

  private async initializeTransporter(): Promise<boolean> {
    // If already initialized successfully, return true
    if (this.isInitialized && this.transporter) {
      return true;
    }

    // If we've already attempted initialization and failed, don't try again
    if (this.initializationAttempted && !this.isInitialized) {
      return false;
    }

    this.initializationAttempted = true;
    try {
      // Get email configuration from environment variables
      const emailConfig = process.env.EMAIL_CONFIG;

      if (!emailConfig) {
        console.warn('❌ EMAIL_CONFIG not found in environment variables');
        console.warn(
          '📝 Please create a .env file with EMAIL_CONFIG={"host":"smtp.gmail.com","port":587,"secure":false,"auth":{"user":"your-email@gmail.com","pass":"your-app-password"}}'
        );
        return false;
      }

      // Validate JSON format
      try {
        this.config = JSON.parse(emailConfig);
      } catch (jsonError) {
        console.error('❌ Invalid EMAIL_CONFIG JSON format:', jsonError);
        console.warn(
          '📝 Expected format: {"host":"smtp.gmail.com","port":587,"secure":false,"auth":{"user":"your-email@gmail.com","pass":"your-app-password"}}'
        );
        return false;
      }

      // Validate required fields
      if (
        !this.config ||
        !this.config.host ||
        !this.config.port ||
        !this.config.auth?.user ||
        !this.config.auth?.pass
      ) {
        console.error('❌ EMAIL_CONFIG missing required fields');
        console.warn('📝 Required fields: host, port, auth.user, auth.pass');
        return false;
      }

      this.transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port,
        secure: this.config.port === 465, // true for 465, false for other ports
        auth: {
          user: this.config.auth.user,
          pass: this.config.auth.pass,
        },
      });

      console.log('✅ Gmail SMTP service initialized successfully');
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Gmail SMTP service:', error);
      this.transporter = null;
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Send email notification for new message via Gmail SMTP
   */
  async sendMessageNotification(
    message: MessageEntity,
    recipientEmail: string
  ): Promise<boolean> {
    // Lazy initialization - only initialize when needed
    const isInitialized = await this.initializeTransporter();

    if (!isInitialized || !this.transporter) {
      console.warn('Gmail SMTP service not available, skipping notification');
      return false;
    }

    try {
      const emailContent = this.generateMessageNotificationEmail(message);

      const mailOptions = {
        from: `"Portfolio Contact Form" <${this.config!.auth.user}>`,
        to: recipientEmail,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('✅ Email notification sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send email notification:', error);
      throw new AppError('Failed to send email notification', 500);
    }
  }

  /**
   * Generate email content for message notification
   */
  private generateMessageNotificationEmail(message: MessageEntity) {
    const subject = `New Message from ${message.name} - ${message.subject || 'Contact Form'}`;

    const text = `
New message received from your portfolio contact form:

From: ${message.name}
Email: ${message.email}
Subject: ${message.subject || 'No subject'}
Date: ${message.getFormattedCreatedAt()}

Message:
${message.message}

---
This message was sent from your portfolio contact form.
    `.trim();

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Message from Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #7c3aed; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #7c3aed; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .label { font-weight: bold; color: #7c3aed; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 New Message from Portfolio</h1>
        </div>
        <div class="content">
            <p>You have received a new message from your portfolio contact form:</p>
            
            <div class="message-box">
                <p><span class="label">From:</span> ${message.name}</p>
                <p><span class="label">Email:</span> <a href="mailto:${message.email}">${message.email}</a></p>
                <p><span class="label">Subject:</span> ${message.subject || 'No subject'}</p>
                <p><span class="label">Date:</span> ${message.getFormattedCreatedAt()}</p>
            </div>
            
            <div class="message-box">
                <p><span class="label">Message:</span></p>
                <p style="white-space: pre-wrap;">${message.message}</p>
            </div>
            
            <div style="margin-top: 20px;">
                <a href="mailto:${message.email}" style="background: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Reply to ${message.name}
                </a>
            </div>
        </div>
        <div class="footer">
            <p>This message was sent from your portfolio contact form.</p>
        </div>
    </div>
</body>
</html>
    `.trim();

    return { subject, text, html };
  }

  /**
   * Get email service status
   */
  getServiceStatus() {
    return {
      isAvailable: this.isInitialized && this.transporter !== null,
      isInitialized: this.isInitialized,
    };
  }

  /**
   * Debug configuration (for troubleshooting)
   */
  debugConfiguration(): void {
    console.log('🔍 Email Service Debug:');
    console.log('EMAIL_CONFIG exists:', !!process.env.EMAIL_CONFIG);
    console.log(
      'NOTIFICATION_EMAIL:',
      process.env.NOTIFICATION_EMAIL || 'NOT SET'
    );
    console.log('Is initialized:', this.isInitialized);
    console.log('Transporter available:', !!this.transporter);
  }
}

export const emailService = new EmailService();
