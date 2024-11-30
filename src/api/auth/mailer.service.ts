// src/api/auth/mailer.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use the email from .env
        pass: process.env.EMAIL_PASS, // Use the app password from .env
      },
    });
  }

  // Method to send an email with text and HTML content
  async sendMail(to: string, subject: string, textContent: string, htmlContent?: string): Promise<void> {
    try {
      this.logger.log(`Sending email to ${to} with subject "${subject}"`);
      const info = await this.transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Use email from .env
        to,
        subject,
        text: textContent,
        html: htmlContent,
      });

      this.logger.log(`Email sent successfully: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`, error.stack);
      throw error;
    }
  }
}


