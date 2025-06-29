import { useState, useEffect } from 'react'
import { Invoice, Client, Notification, PredefinedItem, AppSettings } from '../types'
import * as storage from '../utils/storage'

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.loadInvoices()
      setInvoices(data)
    }
    loadData()
  }, [])

  const saveInvoices = async (newInvoices: Invoice[]) => {
    await storage.saveInvoices(newInvoices)
    setInvoices(newInvoices)
  }

  const addInvoice = async (invoice: Invoice) => {
    const newInvoices = [...invoices, invoice]
    await saveInvoices(newInvoices)
  }

  const updateInvoice = async (updatedInvoice: Invoice) => {
    const newInvoices = invoices.map(inv => 
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    )
    await saveInvoices(newInvoices)
  }

  const deleteInvoice = async (id: number) => {
    const newInvoices = invoices.filter(invoice => invoice.id !== id)
    await saveInvoices(newInvoices)
  }

  return {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    saveInvoices
  }
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.loadClients()
      setClients(data)
    }
    loadData()
  }, [])

  const saveClients = async (newClients: Client[]) => {
    await storage.saveClients(newClients)
    setClients(newClients)
  }

  const addClient = async (client: Client) => {
    const newClients = [...clients, client]
    await saveClients(newClients)
  }

  const updateClient = async (updatedClient: Client) => {
    const newClients = clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    )
    await saveClients(newClients)
  }

  const deleteClient = async (id: number) => {
    const newClients = clients.filter(client => client.id !== id)
    await saveClients(newClients)
  }

  return {
    clients,
    addClient,
    updateClient,
    deleteClient,
    saveClients
  }
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.loadNotifications()
      setNotifications(data)
    }
    loadData()
  }, [])

  const saveNotifications = async (newNotifications: Notification[]) => {
    await storage.saveNotifications(newNotifications)
    setNotifications(newNotifications)
  }

  const addNotification = async (notification: Notification) => {
    const newNotifications = [...notifications, notification]
    await saveNotifications(newNotifications)
  }

  return {
    notifications,
    addNotification,
    saveNotifications
  }
}

export const usePredefinedItems = () => {
  const [predefinedItems, setPredefinedItems] = useState<PredefinedItem[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.loadPredefinedItems()
      setPredefinedItems(data)
    }
    loadData()
  }, [])

  const savePredefinedItems = async (newItems: PredefinedItem[]) => {
    await storage.savePredefinedItems(newItems)
    setPredefinedItems(newItems)
  }

  const addPredefinedItem = async (item: PredefinedItem) => {
    const newItems = [...predefinedItems, item]
    await savePredefinedItems(newItems)
  }

  return {
    predefinedItems,
    addPredefinedItem,
    savePredefinedItems
  }
}

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>({
    invoiceNumberFormat: 'incremental',
    invoicePrefix: 'INV-',
    nextInvoiceNumber: 1,
    randomLength: 6,
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.loadAppSettings()
      setSettings(data)
    }
    loadData()
  }, [])

  const saveSettings = async (newSettings: AppSettings) => {
    await storage.saveAppSettings(newSettings)
    setSettings(newSettings)
  }

  const updateSettings = async (updatedSettings: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updatedSettings }
    await saveSettings(newSettings)
  }

  const generateInvoiceNumber = async (): Promise<string> => {
    if (settings.invoiceNumberFormat === 'incremental') {
      const newNumber = `${settings.invoicePrefix}${settings.nextInvoiceNumber.toString().padStart(4, '0')}`
      await updateSettings({ nextInvoiceNumber: settings.nextInvoiceNumber + 1 })
      return newNumber
    } else {
      // Generate random number
      const randomNum = Math.random().toString(36).substring(2, 2 + settings.randomLength).toUpperCase()
      return `${settings.invoicePrefix}${randomNum}`
    }
  }

  return {
    settings,
    updateSettings,
    saveSettings,
    generateInvoiceNumber
  }
}
