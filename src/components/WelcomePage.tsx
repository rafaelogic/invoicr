import React from 'react'
import { Users, FileText, TrendingUp, Plus, Settings } from 'lucide-react'

interface WelcomePageProps {
  onNavigateToClients: () => void
  onCreateClient: () => void
  onNavigateToSettings: () => void
  clientsCount: number
  invoicesCount: number
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onNavigateToClients,
  onCreateClient,
  onNavigateToSettings,
  clientsCount,
  invoicesCount
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Invoicr</h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional invoice management made simple
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Clients</p>
              <p className="text-3xl font-bold text-blue-800">{clientsCount}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Invoices</p>
              <p className="text-3xl font-bold text-green-800">{invoicesCount}</p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">This Month</p>
              <p className="text-3xl font-bold text-purple-800">₱0</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Getting Started</h2>
        
        {/* Settings Guide */}
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Settings className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Setup Your Profile</h3>
              <p className="text-gray-600 mb-4">
                Before creating your first invoice, we recommend setting up your profile information in Settings. 
                This will ensure your name appears correctly on all invoices.
              </p>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Add your first and last name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Customize invoice number format</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Set your preferred invoice prefix</span>
                </div>
              </div>
              <button
                onClick={onNavigateToSettings}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Go to Settings
              </button>
            </div>
          </div>
        </div>
        
        {clientsCount === 0 ? (
          <div className="text-center py-8">
            <div className="mb-6">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Let's create your first client
              </h3>
              <p className="text-gray-600 mb-6">
                Start by adding a client to organize your invoices and set up custom rate structures.
              </p>
            </div>
            
            <button
              onClick={onCreateClient}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              Create Your First Client
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Manage Clients</h3>
              <p className="text-gray-600 mb-4">
                View all your clients, edit their details, and configure custom rate structures.
              </p>
              <button
                onClick={onNavigateToClients}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View Clients →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Plus className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Add New Client</h3>
              <p className="text-gray-600 mb-4">
                Add another client to expand your business and create more invoices.
              </p>
              <button
                onClick={onCreateClient}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Add Client →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features Overview */}
      <div className="mt-8 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Client Management</h3>
            <p className="text-sm text-gray-600">Organize clients with custom rate structures</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Invoicing</h3>
            <p className="text-sm text-gray-600">Auto-calculate using predefined rates</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">Track earnings and client performance</p>
          </div>
        </div>
      </div>
    </div>
  )
}
