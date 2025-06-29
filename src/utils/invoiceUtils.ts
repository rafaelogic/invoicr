import { Invoice, Client } from '../types'

export const getStatusColor = (status: Invoice['status']): string => {
  switch (status) {
    case 'draft': return 'bg-yellow-100 text-yellow-800'
    case 'sent': return 'bg-blue-100 text-blue-800'
    case 'paid': return 'bg-green-100 text-green-800'
    case 'overdue': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export const calculateInvoiceTotal = (invoice: Partial<Invoice>): number => {
  if (!invoice.items) return 0
  
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
  const taxAmount = (subtotal * (invoice.tax || 0)) / 100
  const discountAmount = (subtotal * (invoice.discount || 0)) / 100
  return subtotal + taxAmount - discountAmount
}

export const getTotalRevenue = (invoices: Invoice[]): number => {
  return invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
}

export const getPendingAmount = (invoices: Invoice[]): number => {
  return invoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.amount, 0)
}

export const getOverdueAmount = (invoices: Invoice[]): number => {
  return invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
}

export const calculateClientStats = (client: Client, invoices: Invoice[]): Client => {
  const clientInvoices = invoices.filter(inv => inv.clientId === client.id)
  const totalAmount = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  
  return {
    ...client,
    invoiceCount: clientInvoices.length,
    totalAmount
  }
}

export const updateAllClientStats = (clients: Client[], invoices: Invoice[]): Client[] => {
  return clients.map(client => calculateClientStats(client, invoices))
}
