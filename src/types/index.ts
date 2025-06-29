export interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
  rateType?: 'monthly' | 'daily' | 'friday' | 'hourly' | 'overtimeWeekday' | 'overtimeWeekend' | 'custom'
}

export interface PredefinedItem {
  id: number
  name: string
  description: string
  rate: number
  category?: string
}

export interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

export interface Invoice {
  id: number
  invoiceNumber: string
  clientId: number
  clientName: string
  clientEmail: string
  amount: number
  description: string
  details?: string
  dueDate: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  createdAt: string
  updatedAt?: string
  items: InvoiceItem[]
  notes?: string
  tax?: number
  discount?: number
  currency: string
  showRateJumbotron?: boolean
}

export interface Notification {
  id: number
  invoiceId: number
  reminderDate: string
  createdAt: string
}

export interface RateStructure {
  monthly: number
  daily: number
  friday: number
  hourly: number
  overtimeWeekday: number
  overtimeWeekend: number
}

export interface ClientCustomDefaults {
  tableHeaders: {
    description: string
    quantity: string
    rate: string
    amount: string
  }
  rateStructure: RateStructure
  jumbotronRates: {
    showJumbotron: boolean
    monthlyLabel: string
    dailyLabel: string
    fridayLabel: string
    hourlyLabel: string
  }
  defaultItems: {
    id: number
    name: string
    description: string
    rate: number
    rateType: 'monthly' | 'daily' | 'friday' | 'hourly' | 'overtimeWeekday' | 'overtimeWeekend' | 'custom'
    category?: string
  }[]
  defaultCurrency: string
  defaultTax: number
  defaultDiscount: number
  defaultNotes: string
}

export interface Client {
  id: number
  name: string
  email: string
  address?: string
  invoiceCount: number
  totalAmount: number
  customDefaults?: ClientCustomDefaults
}

export type TabType = 'welcome' | 'clients' | 'client-detail' | 'analytics' | 'settings'

export type AppView = 'welcome' | 'clients' | 'client-detail' | 'invoice-form' | 'analytics' | 'settings'

export interface AppSettings {
  invoiceNumberFormat: 'incremental' | 'random'
  invoicePrefix: string
  nextInvoiceNumber: number
  randomLength: number
  firstName: string
  lastName: string
}
