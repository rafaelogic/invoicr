import React, { useState, useEffect } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { Client, ClientCustomDefaults } from '../../types'
import { currencies } from '../../utils/currencies'

interface ClientDefaultsModalProps {
  client: Client
  isOpen: boolean
  onClose: () => void
  onSave: (client: Client, defaults: ClientCustomDefaults) => void
}

export const ClientDefaultsModal: React.FC<ClientDefaultsModalProps> = ({
  client,
  isOpen,
  onClose,
  onSave
}) => {
  const [defaults, setDefaults] = useState<ClientCustomDefaults>({
    defaultCurrency: 'PHP',
    defaultTax: 0,
    defaultDiscount: 0,
    defaultNotes: '',
    tableHeaders: {
      description: 'Description',
      quantity: 'Quantity',
      rate: 'Rate',
      amount: 'Amount'
    },
    rateStructure: {
      hourly: 0,
      daily: 0,
      monthly: 0,
      friday: 0,
      overtimeWeekday: 0,
      overtimeWeekend: 0
    },
    jumbotronRates: {
      showJumbotron: false,
      hourlyLabel: 'Hourly Rate',
      dailyLabel: 'Daily Rate',
      monthlyLabel: 'Monthly Rate',
      fridayLabel: 'Friday Rate'
    },
    defaultItems: []
  })

  // Reset defaults when client changes or modal opens
  useEffect(() => {
    if (isOpen && client) {
      setDefaults(client.customDefaults || {
        defaultCurrency: 'PHP',
        defaultTax: 0,
        defaultDiscount: 0,
        defaultNotes: '',
        tableHeaders: {
          description: 'Description',
          quantity: 'Quantity',
          rate: 'Rate',
          amount: 'Amount'
        },
        rateStructure: {
          hourly: 0,
          daily: 0,
          monthly: 0,
          friday: 0,
          overtimeWeekday: 0,
          overtimeWeekend: 0
        },
        jumbotronRates: {
          showJumbotron: false,
          hourlyLabel: 'Hourly Rate',
          dailyLabel: 'Daily Rate',
          monthlyLabel: 'Monthly Rate',
          fridayLabel: 'Friday Rate'
        },
        defaultItems: []
      })
    }
  }, [isOpen, client])

  if (!isOpen) return null

  const handleRateChange = (field: string, value: number) => {
    setDefaults(prev => ({
      ...prev,
      rateStructure: {
        ...{
          hourly: 0,
          daily: 0,
          monthly: 0,
          friday: 0,
          overtimeWeekday: 0,
          overtimeWeekend: 0
        },
        ...prev.rateStructure,
        [field]: value
      }
    }))
  }

  const handleJumbotronChange = (field: string, value: any) => {
    setDefaults(prev => ({
      ...prev,
      jumbotronRates: {
        ...{
          showJumbotron: false,
          hourlyLabel: 'Hourly Rate',
          dailyLabel: 'Daily Rate',
          monthlyLabel: 'Monthly Rate',
          fridayLabel: 'Friday Rate'
        },
        ...prev.jumbotronRates,
        [field]: value
      }
    }))
  }

  const handleAddDefaultItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      rate: 0,
      rateType: 'hourly' as const
    }
    setDefaults(prev => ({
      ...prev,
      defaultItems: [...prev.defaultItems, newItem]
    }))
  }

  const handleRemoveDefaultItem = (index: number) => {
    setDefaults(prev => ({
      ...prev,
      defaultItems: prev.defaultItems.filter((_, i) => i !== index)
    }))
  }

  const handleDefaultItemChange = (index: number, field: string, value: any) => {
    setDefaults(prev => ({
      ...prev,
      defaultItems: prev.defaultItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleSave = () => {
    onSave(client, defaults)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Client Defaults - {client.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Basic Defaults */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Defaults</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency
                </label>
                <select
                  value={defaults.defaultCurrency}
                  onChange={(e) => setDefaults(prev => ({ ...prev, defaultCurrency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Tax (%)
                </label>
                <input
                  type="number"
                  value={defaults.defaultTax}
                  onChange={(e) => setDefaults(prev => ({ ...prev, defaultTax: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Discount (%)
                </label>
                <input
                  type="number"
                  value={defaults.defaultDiscount}
                  onChange={(e) => setDefaults(prev => ({ ...prev, defaultDiscount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Notes
              </label>
              <textarea
                value={defaults.defaultNotes}
                onChange={(e) => setDefaults(prev => ({ ...prev, defaultNotes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Default notes to include in invoices"
              />
            </div>
          </div>

          {/* Rate Structure */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rate Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate
                </label>
                <input
                  type="number"
                  value={defaults.rateStructure?.hourly || 0}
                  onChange={(e) => handleRateChange('hourly', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Rate
                </label>
                <input
                  type="number"
                  value={defaults.rateStructure?.daily || 0}
                  onChange={(e) => handleRateChange('daily', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rate
                </label>
                <input
                  type="number"
                  value={defaults.rateStructure?.monthly || 0}
                  onChange={(e) => handleRateChange('monthly', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Friday Rate
                </label>
                <input
                  type="number"
                  value={defaults.rateStructure?.friday || 0}
                  onChange={(e) => handleRateChange('friday', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overtime Weekday Rate
                </label>
                <input
                  type="number"
                  value={defaults.rateStructure?.overtimeWeekday || 0}
                  onChange={(e) => handleRateChange('overtimeWeekday', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overtime Weekend Rate
                </label>
                <input
                  type="number"
                  value={defaults.rateStructure?.overtimeWeekend || 0}
                  onChange={(e) => handleRateChange('overtimeWeekend', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Jumbotron Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rate Jumbotron Display</h3>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={defaults.jumbotronRates?.showJumbotron || false}
                  onChange={(e) => handleJumbotronChange('showJumbotron', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show rate structure on invoices
                </span>
              </label>
            </div>

            {defaults.jumbotronRates?.showJumbotron && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Label
                  </label>
                  <input
                    type="text"
                    value={defaults.jumbotronRates?.hourlyLabel || 'Hourly Rate'}
                    onChange={(e) => handleJumbotronChange('hourlyLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Label
                  </label>
                  <input
                    type="text"
                    value={defaults.jumbotronRates?.dailyLabel || 'Daily Rate'}
                    onChange={(e) => handleJumbotronChange('dailyLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Label
                  </label>
                  <input
                    type="text"
                    value={defaults.jumbotronRates?.monthlyLabel || 'Monthly Rate'}
                    onChange={(e) => handleJumbotronChange('monthlyLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Friday Label
                  </label>
                  <input
                    type="text"
                    value={defaults.jumbotronRates?.fridayLabel || 'Friday Rate'}
                    onChange={(e) => handleJumbotronChange('fridayLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Default Items */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Default Invoice Items</h3>
              <button
                onClick={handleAddDefaultItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {defaults.defaultItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleDefaultItemChange(index, 'description', e.target.value)}
                      placeholder="Item description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleDefaultItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                      placeholder="Rate"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={item.rateType}
                      onChange={(e) => handleDefaultItemChange(index, 'rateType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="monthly">Monthly</option>
                      <option value="friday">Friday</option>
                      <option value="overtimeWeekday">Overtime Weekday</option>
                      <option value="overtimeWeekend">Overtime Weekend</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleRemoveDefaultItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {defaults.defaultItems.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No default items yet. Add items that will be automatically included in new invoices.
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
