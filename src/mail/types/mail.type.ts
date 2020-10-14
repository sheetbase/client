export interface MailOptions {
  mailEndpoint?: string;
}

export interface MailingData {
  recipient: string;
  subject?: string;
  body?: string;
  options?: {
    attachments?: unknown[];
    bcc?: string;
    cc?: string;
    from?: string;
    htmlBody?: string;
    inlineImages?: {};
    name?: string;
    noReply?: boolean;
    replyTo?: string;
  };
}

export interface MailSentResult {
  threadId: string;
}

export interface MailingQuota {
  remainingDailyQuota: number;
}

export type MailingThread = {};
