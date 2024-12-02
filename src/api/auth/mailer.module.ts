// src/api/auth/mailer.module.ts

import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

// Module for handling email-related operations like password reset
@Module({
  providers: [MailerService], // Provides MailerService for use in other modules
  exports: [MailerService], // Export MailerService for use in other modules
})
export class MailerModule {}
