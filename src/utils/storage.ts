import { Invoice, Client, Notification, PredefinedItem, AppSettings } from '../types'

export const storageKeys = {
  invoices: 'invoices',
  clients: 'clients',
  notifications: 'notifications',
  predefinedItems: 'predefinedItems',
  appSettings: 'appSettings'
} as const

export const loadInvoices = async (): Promise<Invoice[]> => {
  try {
    const result = await chrome.storage.local.get([storageKeys.invoices])
    return result.invoices || []
  } catch (error) {
    console.error('Error loading invoices:', error)
    return []
  }
}

export const saveInvoices = async (invoices: Invoice[]): Promise<void> => {
  try {
    await chrome.storage.local.set({ [storageKeys.invoices]: invoices })
  } catch (error) {
    console.error('Error saving invoices:', error)
    throw error
  }
}

export const loadClients = async (): Promise<Client[]> => {
  try {
    const result = await chrome.storage.local.get([storageKeys.clients])
    return result.clients || []
  } catch (error) {
    console.error('Error loading clients:', error)
    return []
  }
}

export const saveClients = async (clients: Client[]): Promise<void> => {
  try {
    await chrome.storage.local.set({ [storageKeys.clients]: clients })
  } catch (error) {
    console.error('Error saving clients:', error)
    throw error
  }
}

export const loadNotifications = async (): Promise<Notification[]> => {
  try {
    const result = await chrome.storage.local.get([storageKeys.notifications])
    return result.notifications || []
  } catch (error) {
    console.error('Error loading notifications:', error)
    return []
  }
}

export const saveNotifications = async (notifications: Notification[]): Promise<void> => {
  try {
    await chrome.storage.local.set({ [storageKeys.notifications]: notifications })
  } catch (error) {
    console.error('Error saving notifications:', error)
    throw error
  }
}

export const loadPredefinedItems = async (): Promise<PredefinedItem[]> => {
  try {
    const result = await chrome.storage.local.get([storageKeys.predefinedItems])
    return result.predefinedItems || []
  } catch (error) {
    console.error('Error loading predefined items:', error)
    return []
  }
}

export const savePredefinedItems = async (items: PredefinedItem[]): Promise<void> => {
  try {
    await chrome.storage.local.set({ [storageKeys.predefinedItems]: items })
  } catch (error) {
    console.error('Error saving predefined items:', error)
    throw error
  }
}

export const loadAppSettings = async (): Promise<AppSettings> => {
  try {
    const result = await chrome.storage.local.get([storageKeys.appSettings])
    return result.appSettings || {
      invoiceNumberFormat: 'incremental',
      invoicePrefix: 'INV-',
      nextInvoiceNumber: 1,
      randomLength: 6,
      firstName: '',
      lastName: ''
    }
  } catch (error) {
    console.error('Error loading app settings:', error)
    return {
      invoiceNumberFormat: 'incremental',
      invoicePrefix: 'INV-',
      nextInvoiceNumber: 1,
      randomLength: 6,
      firstName: '',
      lastName: ''
    }
  }
}

export const saveAppSettings = async (settings: AppSettings): Promise<void> => {
  try {
    await chrome.storage.local.set({ [storageKeys.appSettings]: settings })
  } catch (error) {
    console.error('Error saving app settings:', error)
    throw error
  }
}
