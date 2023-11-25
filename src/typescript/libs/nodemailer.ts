export interface SendEmailWithNodemailer {
  to: string;
  subject: string;
  body: string;
}

export interface NodemailerResponse {
  accepted?: string[];
  rejected?: string[];
  ehlo?: string[];
  envelopeTime?: number;
  messageTime?: number;
  messageSize?: number;
  response?: string;
  envelope?: {
    from?: string;
    to?: string[];
  };
  messageId?: string;
}
