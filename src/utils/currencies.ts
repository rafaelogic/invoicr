import { Currency } from '../types'

const rawCurrencies: Currency[] = [
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '��' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '��' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '��' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '��' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '��' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨�' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨�' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '��' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '�🇿' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '��' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '�🇬' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '��' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '��' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '��' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '��' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '�🇺' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮�' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '��' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '��' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '��' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '��' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '��' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '��' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '��' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: '£', flag: '🇧' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '��' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '��' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '��' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '��' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '��' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '��' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '��' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '��' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '��' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '��' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '��' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '��' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '��' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '��' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '��' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '��' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '��' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '��' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '��' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '��' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '��' }
]

// Put Philippine Peso first, then sort the rest alphabetically
export const currencies: Currency[] = [
  rawCurrencies.find(c => c.code === 'PHP')!,
  ...rawCurrencies.filter(c => c.code !== 'PHP').sort((a, b) => a.name.localeCompare(b.name))
]

export const getCurrencySymbol = (currencyCode: string): string => {
  const currency = currencies.find(c => c.code === currencyCode)
  return currency?.symbol || currencyCode
}
