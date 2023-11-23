export interface sendMailNodemailerInterface {
  to: string;
  subject: string;
  body: string;
}

export interface NodemailerResponseInterface {
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
