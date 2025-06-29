import React, { useState } from 'react'
import { ArrowLeft, Plus, FileText, Settings, Edit3, Eye, Trash2, DollarSign, Calendar } from 'lucide-react'
import { Client, Invoice } from '../types'
import { getCurrencySymbol } from '../utils/currencies'
import { getStatusColor } from '../utils/invoiceUtils'

interface ClientDetailPageProps {
  client: Client
  invoices: Invoice[]
  onBack: () => void
  onCreateInvoice: (clientId: number) => void
  onEditInvoice: (invoice: Invoice) => void
  onViewInvoice: (invoice: Invoice) => void
  onDeleteInvoice: (invoiceId: number) => void
  onEditClientDefaults: (client: Client) => void
}

export const ClientDetailPage: React.FC<ClientDetailPageProps> = ({
  client,
  invoices,
  onBack,
  onCreateInvoice,
  onEditInvoice,
  onViewInvoice,
  onDeleteInvoice,
  onEditClientDefaults
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const clientInvoices = invoices.filter(invoice => invoice.clientId === client.id)
  
  const filteredInvoices = clientInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalAmount = clientInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = clientInvoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  
  const pendingAmount = totalAmount - paidAmount

  const defaultRates = client.customDefaults?.rateStructure
  const currency = client.customDefaults?.defaultCurrency || 'USD'
  const currencySymbol = getCurrencySymbol(currency)

  const formatAmount = (amount: number) => `${currencySymbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
            <p className="text-gray-600">{client.email}</p>
            {client.address && <p className="text-sm text-gray-500">{client.address}</p>}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => onEditClientDefaults(client)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
            Rate Settings
          </button>
          <button
            onClick={() => onCreateInvoice(client.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Invoices</p>
              <p className="text-2xl font-bold text-blue-800">{clientInvoices.length}</p>
            </div>
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Earned</p>
              <p className="text-2xl font-bold text-green-800">{formatAmount(totalAmount)}</p>
            </div>
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Paid</p>
              <p className="text-2xl font-bold text-emerald-800">{formatAmount(paidAmount)}</p>
            </div>
            <Calendar className="h-6 w-6 text-emerald-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-orange-800">{formatAmount(pendingAmount)}</p>
            </div>
            <Calendar className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Rate Structure Display */}
      {defaultRates && client.customDefaults?.jumbotronRates?.showJumbotron && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Rate Structure</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">{client.customDefaults.jumbotronRates.monthlyLabel}</p>
              <p className="text-xl font-bold text-blue-800">{formatAmount(defaultRates.monthly)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{client.customDefaults.jumbotronRates.dailyLabel}</p>
              <p className="text-xl font-bold text-blue-800">{formatAmount(defaultRates.daily)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{client.customDefaults.jumbotronRates.fridayLabel}</p>
              <p className="text-xl font-bold text-blue-800">{formatAmount(defaultRates.friday)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{client.customDefaults.jumbotronRates.hourlyLabel}</p>
              <p className="text-xl font-bold text-blue-800">{formatAmount(defaultRates.hourly)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h2 className="text-xl font-semibold text-gray-800">Invoices</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {clientInvoices.length === 0 ? 'No invoices yet' : 'No invoices match your search'}
              </h3>
              <p className="text-gray-600 mb-6">
                {clientInvoices.length === 0 
                  ? 'Create your first invoice for this client'
                  : 'Try adjusting your search criteria'
                }
              </p>
              {clientInvoices.length === 0 && (
                <button
                  onClick={() => onCreateInvoice(client.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Create First Invoice
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Invoice #</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-blue-600">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {invoice.description || 'No description'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {formatAmount(invoice.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => onViewInvoice(invoice)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="View Invoice"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onEditInvoice(invoice)}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                            title="Edit Invoice"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDeleteInvoice(invoice.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete Invoice"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
