import React, { useState } from 'react'
import { Hash, User } from 'lucide-react'
import { AppSettings } from '../../types'

interface SettingsTabProps {
  settings: AppSettings
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ 
  settings, 
  onUpdateSettings 
}) => {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    onUpdateSettings(localSettings)
  }

  const handleReset = () => {
    setLocalSettings(settings)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* User Information Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">User Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={localSettings.firstName}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    firstName: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={localSettings.lastName}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    lastName: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            {/* Preview */}
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <p className="font-medium text-lg">
                {localSettings.firstName || localSettings.lastName 
                  ? `${localSettings.firstName} ${localSettings.lastName}`.trim()
                  : 'Your Name'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Number Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <Hash className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Invoice Number Settings</h3>
          </div>
          
          <div className="space-y-4">
            {/* Invoice Number Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number Format
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="invoiceNumberFormat"
                    value="incremental"
                    checked={localSettings.invoiceNumberFormat === 'incremental'}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      invoiceNumberFormat: e.target.value as 'incremental' | 'random'
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm">Incremental (INV-0001, INV-0002, ...)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="invoiceNumberFormat"
                    value="random"
                    checked={localSettings.invoiceNumberFormat === 'random'}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      invoiceNumberFormat: e.target.value as 'incremental' | 'random'
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm">Random (INV-A1B2C3, INV-X7Y8Z9, ...)</span>
                </label>
              </div>
            </div>

            {/* Invoice Prefix */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Prefix
              </label>
              <input
                type="text"
                value={localSettings.invoicePrefix}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  invoicePrefix: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="INV-"
              />
              <p className="text-xs text-gray-500 mt-1">
                This prefix will be added to all invoice numbers
              </p>
            </div>

            {/* Next Invoice Number (only for incremental) */}
            {localSettings.invoiceNumberFormat === 'incremental' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Invoice Number
                </label>
                <input
                  type="number"
                  value={localSettings.nextInvoiceNumber}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    nextInvoiceNumber: parseInt(e.target.value) || 1
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The next invoice will use this number
                </p>
              </div>
            )}

            {/* Random Length (only for random) */}
            {localSettings.invoiceNumberFormat === 'random' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Random Code Length
                </label>
                <input
                  type="number"
                  value={localSettings.randomLength}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    randomLength: parseInt(e.target.value) || 6
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="3"
                  max="10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Length of the random alphanumeric code (3-10 characters)
                </p>
              </div>
            )}

            {/* Preview */}
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <p className="font-mono text-lg">
                {localSettings.invoiceNumberFormat === 'incremental' 
                  ? `${localSettings.invoicePrefix}${localSettings.nextInvoiceNumber.toString().padStart(4, '0')}`
                  : `${localSettings.invoicePrefix}${'A'.repeat(localSettings.randomLength)}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
