// Background script for handling notifications and alarms

interface InvoiceNotification {
  id: number
  invoiceId: number
  reminderDate: string
  createdAt: string
}

interface Invoice {
  id: number
  invoiceNumber: string
  clientName: string
  clientEmail: string
  amount: number
  description: string
  dueDate: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  createdAt: string
  updatedAt?: string
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Invoicr extension installed')
})

// Handle extension icon click - open options page directly
chrome.action.onClicked.addListener(async () => {
  await chrome.runtime.openOptionsPage()
})

// Handle alarm events for invoice reminders
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name?.startsWith('invoice-reminder-')) {
    const notificationId = alarm.name.replace('invoice-reminder-', '')
    
    try {
      // Get stored data
      const result = await chrome.storage.local.get(['invoices', 'notifications'])
      const invoices: Invoice[] = result.invoices || []
      const notifications: InvoiceNotification[] = result.notifications || []
      
      // Find the notification
      const notification = notifications.find(n => n.id.toString() === notificationId)
      if (!notification) return
      
      // Find the associated invoice
      const invoice = invoices.find(inv => inv.id === notification.invoiceId)
      if (!invoice) return
      
      // Create notification
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Invoice Reminder - Invoicr',
        message: `Don't forget about invoice ${invoice.invoiceNumber} for ${invoice.clientName}. Due: ${invoice.dueDate}`,
        buttons: [
          { title: 'View Invoice' },
          { title: 'Mark as Sent' }
        ]
      })
      
    } catch (error) {
      console.error('Error handling alarm:', error)
    }
  }
})

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    // Open options page to view invoice
    await chrome.runtime.openOptionsPage()
  } else if (buttonIndex === 1) {
    // Mark invoice as sent (this would need more complex logic to identify which invoice)
    console.log('Mark as sent clicked')
  }
  
  // Clear the notification
  await chrome.notifications.clear(notificationId)
})

// Handle notification clicks
chrome.notifications.onClicked.addListener(async (notificationId) => {
  // Open options page
  await chrome.runtime.openOptionsPage()
  await chrome.notifications.clear(notificationId)
})

// Clean up old alarms and notifications periodically
chrome.alarms.create('cleanup', { periodInMinutes: 60 * 24 }) // Daily cleanup

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'cleanup') {
    try {
      const result = await chrome.storage.local.get(['notifications'])
      const notifications: InvoiceNotification[] = result.notifications || []
      
      // Remove expired notifications (older than the reminder date)
      const now = new Date()
      const activeNotifications = notifications.filter(n => 
        new Date(n.reminderDate) > now
      )
      
      if (activeNotifications.length !== notifications.length) {
        await chrome.storage.local.set({ notifications: activeNotifications })
      }
    } catch (error) {
      console.error('Error during cleanup:', error)
    }
  }
})
