import React, { useState } from 'react'
import { 
  Invoice, 
  Client, 
  AppView, 
  ClientCustomDefaults,
  AppSettings
} from './types'
import { 
  WelcomePage,
  ClientsTab,
  ClientDetailPage,
  InvoiceViewModal,
  InvoiceFormModal,
  ClientDefaultsModal,
  AnalyticsTab,
  SettingsTab,
  StatusModal,
  SupportContact
} from './components'
import { useInvoices, useClients, useNotifications, useAppSettings } from './hooks/useData'

const App: React.FC = () => {
  // Data hooks
  const { invoices, addInvoice, updateInvoice, deleteInvoice } = useInvoices()
  const { clients, addClient, updateClient, deleteClient } = useClients()
  const { addNotification } = useNotifications()
  const { settings, updateSettings, generateInvoiceNumber } = useAppSettings()

  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('welcome')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Modal States
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)
  const [showClientDefaultsModal, setShowClientDefaultsModal] = useState(false)
  const [editingClientDefaults, setEditingClientDefaults] = useState<Client | null>(null)
  
  // Status Modal State
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  })

  // Form States
  const [showClientForm, setShowClientForm] = useState(false)
  const [showInvoiceForm, setShowInvoiceForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)

  // Client form state
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    address: ''
  })

  // Invoice form state
  const [invoiceForm, setInvoiceForm] = useState<Invoice>({
    id: 0,
    invoiceNumber: '',
    clientId: 0,
    clientName: '',
    clientEmail: '',
    amount: 0,
    description: '',
    details: '',
    dueDate: '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    currency: 'PHP',
    tax: 0,
    discount: 0,
    notes: ''
  })

  // Status Modal Helper Functions
  const showSuccessModal = (title: string, message: string) => {
    setStatusModal({
      isOpen: true,
      type: 'success',
      title,
      message
    })
  }

  const showErrorModal = (title: string, message: string) => {
    setStatusModal({
      isOpen: true,
      type: 'error',
      title,
      message
    })
  }

  const closeStatusModal = () => {
    setStatusModal(prev => ({ ...prev, isOpen: false }))
  }

  // Navigation functions
  const handleNavigateToClients = () => {
    setCurrentView('clients')
  }

  const handleCreateClient = () => {
    setShowClientForm(true)
    setCurrentView('clients')
  }

  const handleViewClient = (client: Client) => {
    setSelectedClient(client)
    setCurrentView('client-detail')
  }

  const handleBackToClients = () => {
    setSelectedClient(null)
    setCurrentView('clients')
  }

  const handleBackToWelcome = () => {
    setCurrentView('welcome')
    setSelectedClient(null)
  }

  // Invoice functions
  const handleCreateInvoice = async (clientId: number) => {
    const client = clients.find(c => c.id === clientId)
    if (!client) return

    const invoiceNumber = await generateInvoiceNumber()

    const newInvoice: Invoice = {
      id: 0,
      invoiceNumber,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      amount: 0,
      description: '',
      details: '',
      dueDate: '',
      status: 'draft',
      createdAt: new Date().toISOString(),
      currency: client.customDefaults?.defaultCurrency || 'PHP',
      tax: client.customDefaults?.defaultTax || 0,
      discount: client.customDefaults?.defaultDiscount || 0,
      notes: client.customDefaults?.defaultNotes || '',
      items: client.customDefaults?.defaultItems?.map(item => ({
        description: item.description,
        quantity: 1,
        rate: item.rate,
        amount: item.rate,
        rateType: item.rateType
      })) || [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      showRateJumbotron: client.customDefaults?.jumbotronRates?.showJumbotron || false
    }
    
    setInvoiceForm(newInvoice)
    setEditingInvoice(null)
    setShowInvoiceForm(true)
  }

  const handleEditInvoice = (invoice: Invoice) => {
    setInvoiceForm(invoice)
    setEditingInvoice(invoice)
    setShowInvoiceForm(true)
  }

  const handleSaveInvoice = async () => {
    try {
      const total = invoiceForm.items.reduce((sum, item) => sum + item.amount, 0)
      const taxAmount = (total * (invoiceForm.tax || 0)) / 100
      const discountAmount = (total * (invoiceForm.discount || 0)) / 100
      const finalAmount = total + taxAmount - discountAmount

      const invoiceData = {
        ...invoiceForm,
        amount: finalAmount,
        id: editingInvoice ? editingInvoice.id : Date.now(),
        invoiceNumber: editingInvoice ? invoiceForm.invoiceNumber : await generateInvoiceNumber(),
        updatedAt: new Date().toISOString()
      }

      if (editingInvoice) {
        await updateInvoice(invoiceData)
      } else {
        await addInvoice(invoiceData)
      }

      setShowInvoiceForm(false)
      setEditingInvoice(null)
      showSuccessModal(
        editingInvoice ? 'Invoice Updated!' : 'Invoice Created!', 
        editingInvoice ? 'Invoice has been successfully updated.' : 'New invoice has been successfully created.'
      )
    } catch (error) {
      console.error('Error saving invoice:', error)
      showErrorModal('Error Saving Invoice', 'There was an error saving the invoice. Please try again.')
    }
  }

  const handleDeleteInvoice = async (invoiceId: number) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(invoiceId)
        showSuccessModal('Invoice Deleted!', 'Invoice has been successfully deleted.')
      } catch (error) {
        console.error('Error deleting invoice:', error)
        showErrorModal('Error Deleting Invoice', 'There was an error deleting the invoice. Please try again.')
      }
    }
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setViewingInvoice(invoice)
  }

  // Invoice form handlers
  const handleInvoiceFormChange = (field: string, value: any) => {
    setInvoiceForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleInvoiceItemChange = (index: number, field: string, value: any) => {
    setInvoiceForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleAddInvoiceItem = () => {
    setInvoiceForm(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }))
  }

  const handleRemoveInvoiceItem = (index: number) => {
    setInvoiceForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  // Client form functions
  const handleClientFormChange = (field: string, value: string) => {
    setClientForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveClient = async () => {
    try {
      const newClient: Client = {
        id: Date.now(),
        name: clientForm.name,
        email: clientForm.email,
        address: clientForm.address,
        invoiceCount: 0,
        totalAmount: 0
      }

      await addClient(newClient)
      setClientForm({ name: '', email: '', address: '' })
      setShowClientForm(false)
      showSuccessModal('Client Added!', 'Client has been successfully added to your system.')
    } catch (error) {
      console.error('Error saving client:', error)
      showErrorModal('Error Adding Client', 'There was an error adding the client. Please try again.')
    }
  }

  const handleDeleteClient = async (clientId: number) => {
    if (confirm('Are you sure you want to delete this client? This will also delete all their invoices.')) {
      try {
        // Delete all invoices for this client first
        const clientInvoices = invoices.filter(invoice => invoice.clientId === clientId)
        for (const invoice of clientInvoices) {
          await deleteInvoice(invoice.id)
        }
        
        // Then delete the client
        await deleteClient(clientId)
        
        // If we're currently viewing this client, go back to clients list
        if (selectedClient?.id === clientId) {
          handleBackToClients()
        }
        
        showSuccessModal('Client Deleted!', 'Client and all their invoices have been successfully deleted.')
      } catch (error) {
        console.error('Error deleting client:', error)
        showErrorModal('Error Deleting Client', 'There was an error deleting the client. Please try again.')
      }
    }
  }

  const handleEditClientDefaults = (client: Client) => {
    setEditingClientDefaults(client)
    setShowClientDefaultsModal(true)
  }

  const handleSaveClientDefaults = async (client: Client, defaults: ClientCustomDefaults) => {
    try {
      const updatedClient = {
        ...client,
        customDefaults: defaults
      }
      
      await updateClient(updatedClient)
      
      // Update selectedClient if it's the same client
      if (selectedClient?.id === client.id) {
        setSelectedClient(updatedClient)
      }
      
      setShowClientDefaultsModal(false)
      setEditingClientDefaults(null)
      showSuccessModal('Client Settings Updated!', 'Client default settings have been successfully updated.')
    } catch (error) {
      console.error('Error updating client defaults:', error)
      showErrorModal('Error Updating Settings', 'There was an error updating client settings. Please try again.')
    }
  }

  const scheduleNotification = async (invoiceId: number, reminderDate: string) => {
    try {
      const notification = {
        id: Date.now(),
        invoiceId,
        reminderDate,
        createdAt: new Date().toISOString()
      }
      
      await addNotification(notification)
      await chrome.alarms.create(`invoice-reminder-${notification.id}`, {
        when: new Date(reminderDate).getTime()
      })

      showSuccessModal('Reminder Scheduled!', 'Invoice reminder has been successfully scheduled.')
    } catch (error) {
      console.error('Error scheduling notification:', error)
      showErrorModal('Error Scheduling Reminder', 'There was an error scheduling the reminder. Please try again.')
    }
  }

  // Settings wrapper to show status modal
  const handleUpdateSettings = async (updatedSettings: Partial<AppSettings>) => {
    try {
      await updateSettings(updatedSettings)
      showSuccessModal('Settings Updated!', 'Your settings have been successfully saved.')
    } catch (error) {
      console.error('Error updating settings:', error)
      showErrorModal('Error Updating Settings', 'There was an error saving your settings. Please try again.')
    }
  }

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return (
          <WelcomePage
            onNavigateToClients={handleNavigateToClients}
            onCreateClient={handleCreateClient}
            onNavigateToSettings={() => setCurrentView('settings')}
            clientsCount={clients.length}
            invoicesCount={invoices.length}
          />
        )

      case 'clients':
        return (
          <ClientsTab
            clients={clients}
            invoices={invoices}
            onViewClient={handleViewClient}
            onCreateClient={() => setShowClientForm(true)}
            onEditClientDefaults={handleEditClientDefaults}
            onDeleteClient={handleDeleteClient}
            showClientForm={showClientForm}
            clientForm={clientForm}
            onClientFormChange={handleClientFormChange}
            onSaveClient={handleSaveClient}
            onCloseClientForm={() => {
              setShowClientForm(false)
              setClientForm({ name: '', email: '', address: '' })
            }}
            onBackToWelcome={handleBackToWelcome}
          />
        )

      case 'client-detail':
        return selectedClient ? (
          <ClientDetailPage
            client={selectedClient}
            invoices={invoices}
            onBack={handleBackToClients}
            onCreateInvoice={handleCreateInvoice}
            onEditInvoice={handleEditInvoice}
            onViewInvoice={handleViewInvoice}
            onDeleteInvoice={handleDeleteInvoice}
            onEditClientDefaults={handleEditClientDefaults}
          />
        ) : null

      case 'analytics':
        return (
          <AnalyticsTab
            invoices={invoices}
          />
        )

      case 'settings':
        return (
          <SettingsTab
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Invoicr</h1>
          </div>

          {/* Navigation */}
          {currentView !== 'welcome' && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('clients')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'clients' || currentView === 'client-detail'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Clients
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'settings'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Settings
              </button>
              <button
                onClick={handleBackToWelcome}
                className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Home
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        {renderCurrentView()}

        {/* Modals */}
        {viewingInvoice && (
          <InvoiceViewModal
            invoice={viewingInvoice}
            settings={settings}
            onClose={() => setViewingInvoice(null)}
            onEdit={handleEditInvoice}
            onScheduleNotification={scheduleNotification}
          />
        )}

        {showInvoiceForm && (
          <InvoiceFormModal
            isOpen={showInvoiceForm}
            invoice={invoiceForm}
            onClose={() => {
              setShowInvoiceForm(false)
              setEditingInvoice(null)
            }}
            onSave={handleSaveInvoice}
            onChange={handleInvoiceFormChange}
            onItemChange={handleInvoiceItemChange}
            onAddItem={handleAddInvoiceItem}
            onRemoveItem={handleRemoveInvoiceItem}
            isEditing={!!editingInvoice}
          />
        )}

        {showClientDefaultsModal && editingClientDefaults && (
          <ClientDefaultsModal
            client={editingClientDefaults}
            isOpen={showClientDefaultsModal}
            onClose={() => {
              setShowClientDefaultsModal(false)
              setEditingClientDefaults(null)
            }}
            onSave={handleSaveClientDefaults}
          />
        )}

        {/* Status Modal */}
        <StatusModal
          isOpen={statusModal.isOpen}
          type={statusModal.type}
          title={statusModal.title}
          message={statusModal.message}
          onClose={closeStatusModal}
        />

        {/* Support Contact Footer */}
        <SupportContact 
          appName="Invoicr"
          version="1.0.0"
        />
      </div>
    </div>
  )
}

export default App
