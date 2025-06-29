import React from 'react'
import { Printer } from 'lucide-react'
import { Invoice, AppSettings } from '../../types'
import { getCurrencySymbol } from '../../utils/currencies'
import { getStatusColor } from '../../utils/invoiceUtils'

interface InvoiceViewModalProps {
  invoice: Invoice | null
  settings: AppSettings
  onClose: () => void
  onEdit?: (invoice: Invoice) => void
  onScheduleNotification?: (invoiceId: number, reminderDate: string) => void
}

export const InvoiceViewModal: React.FC<InvoiceViewModalProps> = ({
  invoice,
  settings,
  onClose,
  onEdit,
  onScheduleNotification
}) => {
  if (!invoice) return null

  const getUserName = () => {
    if (settings.firstName || settings.lastName) {
      return `${settings.firstName} ${settings.lastName}`.trim()
    }
    return 'Your Name'
  }

  const handlePrint = () => {
    // Create a clean print-friendly version of the invoice
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${invoice.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 40px; color: #333; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { margin-bottom: 40px; padding-bottom: 30px; }
            .invoice-title { font-size: 2.5em; font-weight: bold; color: #333; margin-bottom: 10px; }
            .invoice-number { font-size: 1.2em; color: #666; margin-bottom: 20px; }
            .created-date { color: #666; font-size: 0.9em; }
            .from-billto-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; border-bottom: 1px solid #ddd; padding-bottom: 30px; }
            .from-section h3, .billto-section h3 { font-size: 1.1em; font-weight: bold; color: #333; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
            .company-name { font-weight: bold; color: #333; margin-bottom: 5px; }
            .invoice-details-section { margin-bottom: 40px; }
            .invoice-details-section h3 { font-size: 1.1em; font-weight: bold; color: #333; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
            .invoice-details-content { color: #555; line-height: 1.6; }
            .services-section { margin-bottom: 40px; }
            .services-section h3 { font-size: 1.1em; font-weight: bold; color: #333; margin-bottom: 15px; }
            .services-content { background: #f8f9fa; padding: 20px; border-radius: 6px; color: #555; white-space: pre-wrap; line-height: 1.6; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .items-table th { background-color: #f8f9fa; font-weight: bold; color: #333; }
            .items-table td { color: #555; }
            .items-table .text-right { text-align: right; }
            .totals-section { border-top: 1px solid #ddd; padding-top: 20px; }
            .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .total-label { color: #666; }
            .total-value { color: #333; font-weight: 500; }
            .final-total { font-weight: bold; font-size: 1.1em; border-top: 2px solid #333; padding-top: 15px; margin-top: 15px; }
            .notes-section { margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 6px; }
            .notes-section h3 { font-size: 1.1em; font-weight: bold; color: #333; margin-bottom: 15px; }
            .notes-content { color: #555; white-space: pre-wrap; line-height: 1.6; }
            @media print { 
              body { margin: 0; padding: 20px; } 
              .container { box-shadow: none; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="invoice-title">Invoice #${invoice.invoiceNumber}</div>
              <div class="created-date">Created on ${new Date(invoice.createdAt).toLocaleDateString()}</div>
            </div>
            
            <div class="from-billto-section">
              <div class="from-section">
                <h3>From</h3>
                <div class="company-name">${getUserName()}</div>
              </div>
              <div class="billto-section">
                <h3>Bill To</h3>
                <div class="company-name">${invoice.clientName}</div>
              </div>
            </div>

            ${invoice.details ? `
              <div class="services-section">
                <h3>Invoice Details</h3>
                <div class="services-content">${invoice.details}</div>
              </div>
            ` : ''}

            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">Rate</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">${getCurrencySymbol(invoice.currency)}${item.rate.toFixed(2)}</td>
                    <td class="text-right">${getCurrencySymbol(invoice.currency)}${(item.quantity * item.rate).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals-section">
              <div class="total-row">
                <span class="total-label">Subtotal:</span>
                <span class="total-value">${getCurrencySymbol(invoice.currency)}${invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0).toFixed(2)}</span>
              </div>
              ${invoice.tax && invoice.tax > 0 ? `
                <div class="total-row">
                  <span class="total-label">Tax (${invoice.tax}%):</span>
                  <span class="total-value">${getCurrencySymbol(invoice.currency)}${((invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * (invoice.tax || 0)) / 100).toFixed(2)}</span>
                </div>
              ` : ''}
              ${invoice.discount && invoice.discount > 0 ? `
                <div class="total-row">
                  <span class="total-label">Discount (${invoice.discount}%):</span>
                  <span class="total-value">-${getCurrencySymbol(invoice.currency)}${((invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * (invoice.discount || 0)) / 100).toFixed(2)}</span>
                </div>
              ` : ''}
              <div class="total-row final-total">
                <span class="total-label">Total:</span>
                <span class="total-value">${getCurrencySymbol(invoice.currency)}${invoice.amount.toFixed(2)}</span>
              </div>
            </div>

            ${invoice.notes ? `
              <div class="notes-section">
                <h3>Notes</h3>
                <div class="notes-content">${invoice.notes}</div>
              </div>
            ` : ''}

          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Invoice #{invoice.invoiceNumber}</h2>
              <p className="text-gray-600">Created on {new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              {onEdit && (
                <button
                  onClick={() => onEdit(invoice)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
              {onScheduleNotification && (
                <button
                  onClick={() => {
                    const reminderDate = prompt('Enter reminder date (YYYY-MM-DD):')
                    if (reminderDate) {
                      onScheduleNotification(invoice.id, reminderDate)
                    }
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Schedule Reminder
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 uppercase tracking-wide">From</h3>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-gray-900">{getUserName()}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 uppercase tracking-wide">Bill To</h3>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-gray-900">{invoice.clientName}</div>
              </div>
            </div>
          </div>

          <div>
            <strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </div>

           {/* Invoice Details */}
          {invoice.details && (
            <div className="my-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{invoice.details}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Qty</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {getCurrencySymbol(invoice.currency)}{item.rate.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {getCurrencySymbol(invoice.currency)}{(item.quantity * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2 text-right">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">
                  {getCurrencySymbol(invoice.currency)}{invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0).toFixed(2)}
                </span>
              </div>
              {invoice.tax && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({invoice.tax}%):</span>
                  <span className="text-gray-900">
                    {getCurrencySymbol(invoice.currency)}{((invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * (invoice.tax || 0)) / 100).toFixed(2)}
                  </span>
                </div>
              )}
              {invoice.discount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount ({invoice.discount}%):</span>
                  <span className="text-gray-900">
                    -{getCurrencySymbol(invoice.currency)}{((invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * (invoice.discount || 0)) / 100).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>{getCurrencySymbol(invoice.currency)}{invoice.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
