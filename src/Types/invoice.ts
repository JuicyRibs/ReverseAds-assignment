export interface Invoices {
  invoices: Invoice[];
}

export interface Invoice {
  title: string;
  items: InvoiceItem[];
  note: string;
  recipient: string;
  status: 'fulfilled' | 'outstanding' | 'late' | 'pending' | string;
}

export interface InvoiceItem {
  key: string;
  amount?: number;
  unit?: string;
  price?: number;
}
