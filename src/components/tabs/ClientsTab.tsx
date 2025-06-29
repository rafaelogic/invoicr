import React, { useMemo } from 'react'
import { Plus, User, ArrowLeft, Eye, Settings, Trash2 } from 'lucide-react'
import { Client, Invoice } from '../../types'

interface ClientsTabProps {
  clients: Client[]
  invoices?: Invoice[]
  onViewClient: (client: Client) => void
  onCreateClient: () => void
  onEditClientDefaults: (client: Client) => void
  onDeleteClient: (clientId: number) => void
  showClientForm: boolean
  clientForm: {
    name: string
    email: string
    address: string
  }
  onClientFormChange: (field: string, value: string) => void
  onSaveClient: () => void
  onCloseClientForm: () => void
  onBackToWelcome: () => void
}

export const ClientsTab: React.FC<ClientsTabProps> = ({
  clients,
  invoices = [],
  onViewClient,
  onCreateClient,
  onEditClientDefaults,
  onDeleteClient,
  showClientForm,
  clientForm,
  onClientFormChange,
  onSaveClient,
  onCloseClientForm,
  onBackToWelcome
}) => {
  // Calculate client stats dynamically
  const clientsWithStats = useMemo(() => {
    return clients.map(client => {
      const clientInvoices = invoices.filter(inv => inv.clientId === client.id)
      const totalAmount = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0)
      
      return {
        ...client,
        invoiceCount: clientInvoices.length,
        totalAmount
      }
    })
  }, [clients, invoices])

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToWelcome}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        </div>
        
        <button
          onClick={onCreateClient}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {/* Client Form Modal */}
      {showClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Client</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => onClientFormChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => onClientFormChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={clientForm.address}
                    onChange={(e) => onClientFormChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter address"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onCloseClientForm}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onSaveClient}
                  disabled={!clientForm.name.trim() || !clientForm.email.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clients Grid */}
      {clientsWithStats.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No clients yet</h3>
          <p className="text-gray-600 mb-6">
            Add your first client to start creating invoices
          </p>
          <button
            onClick={onCreateClient}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Add Your First Client
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientsWithStats.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {client.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{client.email}</p>
                    {client.address && (
                      <p className="text-sm text-gray-500">{client.address}</p>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{client.invoiceCount || 0}</p>
                    <p className="text-xs text-gray-500">Invoices</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ₱{(client.totalAmount || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewClient(client)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => onEditClientDefaults(client)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    title="Configure rate settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${client.name}? This will also delete all their invoices.`)) {
                        onDeleteClient(client.id)
                      }
                    }}
                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                    title="Delete client"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
