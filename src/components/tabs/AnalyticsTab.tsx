import React, { useState, useMemo } from 'react'
import { TrendingUp, Clock, Bell, Archive, Calendar, BarChart } from 'lucide-react'
import { Invoice } from '../../types'
import { getTotalRevenue, getPendingAmount, getOverdueAmount, getStatusColor } from '../../utils/invoiceUtils'

interface AnalyticsTabProps {
  invoices: Invoice[]
}

interface ChartData {
  label: string
  value: number
  color: string
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ invoices }) => {
  const [chartView, setChartView] = useState<'yearly' | 'monthly'>('monthly')
  
  const totalRevenue = getTotalRevenue(invoices)
  const pendingAmount = getPendingAmount(invoices)
  const overdueAmount = getOverdueAmount(invoices)
  const draftCount = invoices.filter(inv => inv.status === 'draft').length

  // Calculate chart data based on view
  const chartData = useMemo(() => {
    const now = new Date()
    const data: ChartData[] = []

    if (chartView === 'monthly') {
      // Last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthInvoices = invoices.filter(inv => {
          const invDate = new Date(inv.createdAt)
          return invDate.getFullYear() === date.getFullYear() && 
                 invDate.getMonth() === date.getMonth()
        })
        
        data.push({
          label: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
          value: monthInvoices.reduce((sum, inv) => sum + inv.amount, 0),
          color: `hsl(${200 + i * 10}, 70%, 50%)`
        })
      }
    } else {
      // Last 5 years
      for (let i = 4; i >= 0; i--) {
        const year = now.getFullYear() - i
        const yearInvoices = invoices.filter(inv => {
          const invDate = new Date(inv.createdAt)
          return invDate.getFullYear() === year
        })
        
        data.push({
          label: year.toString(),
          value: yearInvoices.reduce((sum, inv) => sum + inv.amount, 0),
          color: `hsl(${200 + i * 20}, 70%, 50%)`
        })
      }
    }

    return data
  }, [invoices, chartView])

  const maxValue = Math.max(...chartData.map(d => d.value), 1)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-green-800">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Pending</p>
              <p className="text-2xl font-bold text-blue-800">${pendingAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-red-600 font-medium">Overdue</p>
              <p className="text-2xl font-bold text-red-800">${overdueAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-3">
            <Archive className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Drafts</p>
              <p className="text-2xl font-bold text-yellow-800">{draftCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Revenue Trends</h3>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartView('monthly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartView === 'monthly'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-1" />
              Monthly
            </button>
            <button
              onClick={() => setChartView('yearly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartView === 'yearly'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-1" />
              Yearly
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <div className="flex items-end justify-between h-full space-x-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full">
                  <div 
                    className="w-full rounded-t-md transition-all duration-500 ease-in-out hover:opacity-80"
                    style={{
                      height: `${(item.value / maxValue) * 200}px`,
                      backgroundColor: item.color,
                      minHeight: item.value > 0 ? '4px' : '0px'
                    }}
                    title={`${item.label}: $${item.value.toFixed(2)}`}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center font-medium">
                  {item.label}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  ${item.value.toFixed(0)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Legend */}
        <div className="mt-4 flex justify-center">
          <div className="text-sm text-gray-600">
            {chartView === 'monthly' ? 'Revenue by month (last 12 months)' : 'Revenue by year (last 5 years)'}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {invoices.slice(0, 5).map((invoice) => (
            <div key={invoice.id} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <span className="font-medium">{invoice.invoiceNumber}</span>
                <span className="text-gray-500 ml-2">{invoice.clientName}</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{new Date(invoice.createdAt).toLocaleDateString()}</span>
                <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
