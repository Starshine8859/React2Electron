
export type Locale = 'en' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

interface CurrencyConfig {
  symbol: string;
  position: 'prefix' | 'suffix';
  decimalSeparator: string;
  thousandsSeparator: string;
}

// Currency configuration by locale
const currencyConfigs: Record<Locale, CurrencyConfig> = {
  en: {
    symbol: '$',
    position: 'prefix',
    decimalSeparator: '.',
    thousandsSeparator: ',',
  },
  de: {
    symbol: '€',
    position: 'suffix',
    decimalSeparator: ',',
    thousandsSeparator: '.',
  },
};

// Translation dictionary
const translations: Translations = {
  // Common
  search: {
    en: 'Search',
    de: 'Suchen',
  },
  actions: {
    en: 'Actions',
    de: 'Aktionen',
  },
  
  // Navigation
  dashboard: {
    en: 'Dashboard',
    de: 'Dashboard',
  },
  products: {
    en: 'Products',
    de: 'Produkte',
  },
  orders: {
    en: 'Orders',
    de: 'Bestellungen',
  },
  settings: {
    en: 'Settings',
    de: 'Einstellungen',
  },

  // Products
  product: {
    en: 'Product',
    de: 'Produkt',
  },
  addProduct: {
    en: 'Add Product',
    de: 'Produkt hinzufügen',
  },
  editProduct: {
    en: 'Edit Product',
    de: 'Produkt bearbeiten',
  },
  deleteProduct: {
    en: 'Delete Product',
    de: 'Produkt löschen',
  },
  sku: {
    en: 'SKU',
    de: 'Artikelnummer',
  },
  name: {
    en: 'Name',
    de: 'Name',
  },
  category: {
    en: 'Category',
    de: 'Kategorie',
  },
  price: {
    en: 'Price',
    de: 'Preis',
  },
  inventory: {
    en: 'Inventory',
    de: 'Bestand',
  },
  status: {
    en: 'Status',
    de: 'Status',
  },
  lastUpdated: {
    en: 'Last Updated',
    de: 'Zuletzt aktualisiert',
  },
  active: {
    en: 'Active',
    de: 'Aktiv',
  },
  inactive: {
    en: 'Inactive',
    de: 'Inaktiv',
  },
  allStatuses: {
    en: 'All Statuses',
    de: 'Alle Status',
  },
  allStock: {
    en: 'All Stock',
    de: 'Alle Bestände',
  },
  lowStock: {
    en: 'Low Stock',
    de: 'Niedriger Bestand',
  },
  outOfStock: {
    en: 'Out of Stock',
    de: 'Nicht verfügbar',
  },
  searchProducts: {
    en: 'Search products...',
    de: 'Produkte suchen...',
  },
  noProductsFound: {
    en: 'No products found.',
    de: 'Keine Produkte gefunden.',
  },
  save: {
    en: 'Save',
    de: 'Speichern',
  },
  cancel: {
    en: 'Cancel',
    de: 'Abbrechen',
  },
  delete: {
    en: 'Delete',
    de: 'Löschen',
  },
  confirmDelete: {
    en: 'Are you sure you want to delete this product?',
    de: 'Sind Sie sicher, dass Sie dieses Produkt löschen möchten?',
  },
  edit: {
    en: 'Edit',
    de: 'Bearbeiten',
  },
  view: {
    en: 'View',
    de: 'Ansehen',
  },
  activate: {
    en: 'Activate',
    de: 'Aktivieren',
  },
  deactivate: {
    en: 'Deactivate',
    de: 'Deaktivieren',
  },
  productAdded: {
    en: 'Product added successfully',
    de: 'Produkt erfolgreich hinzugefügt',
  },
  productUpdated: {
    en: 'Product updated successfully',
    de: 'Produkt erfolgreich aktualisiert',
  },
  productDeleted: {
    en: 'Product deleted successfully',
    de: 'Produkt erfolgreich gelöscht',
  },
  
  // Orders
  order: {
    en: 'Order',
    de: 'Bestellung',
  },
  orderNumber: {
    en: 'Order Number',
    de: 'Bestellnummer',
  },
  customer: {
    en: 'Customer',
    de: 'Kunde',
  },
  items: {
    en: 'Items',
    de: 'Artikel',
  },
  total: {
    en: 'Total',
    de: 'Gesamt',
  },
  date: {
    en: 'Date',
    de: 'Datum',
  },
  pending: {
    en: 'Pending',
    de: 'Ausstehend',
  },
  processing: {
    en: 'Processing',
    de: 'In Bearbeitung',
  },
  shipped: {
    en: 'Shipped',
    de: 'Versendet',
  },
  delivered: {
    en: 'Delivered',
    de: 'Geliefert',
  },
  cancelled: {
    en: 'Cancelled',
    de: 'Storniert',
  },
  searchOrders: {
    en: 'Search orders...',
    de: 'Bestellungen suchen...',
  },
  noOrdersFound: {
    en: 'No orders found.',
    de: 'Keine Bestellungen gefunden.',
  },
  filterByStatus: {
    en: 'Filter by status',
    de: 'Nach Status filtern',
  },
  markAsShipped: {
    en: 'Mark as Shipped',
    de: 'Als versendet markieren',
  },
  markAsDelivered: {
    en: 'Mark as Delivered',
    de: 'Als geliefert markieren',
  },
  viewDetails: {
    en: 'View Details',
    de: 'Details anzeigen',
  },
  updateTracking: {
    en: 'Update Tracking Information',
    de: 'Tracking-Informationen aktualisieren',
  },
  trackingId: {
    en: 'Tracking ID',
    de: 'Tracking-ID',
  },
  enterTrackingId: {
    en: 'Enter tracking ID',
    de: 'Tracking-ID eingeben',
  },
  updateAndShip: {
    en: 'Update & Ship',
    de: 'Aktualisieren & Versenden',
  },
  orderUpdated: {
    en: 'Order Updated',
    de: 'Bestellung aktualisiert',
  },
  
  // Theme
  theme: {
    en: 'Theme',
    de: 'Thema',
  },
  lightTheme: {
    en: 'Light',
    de: 'Hell',
  },
  darkTheme: {
    en: 'Dark',
    de: 'Dunkel',
  },
  
  // Pagination
  previous: {
    en: 'Previous',
    de: 'Zurück',
  },
  next: {
    en: 'Next',
    de: 'Weiter',
  },
  page: {
    en: 'Page',
    de: 'Seite',
  },
  of: {
    en: 'of',
    de: 'von',
  },
  
  // Language
  language: {
    en: 'Language',
    de: 'Sprache',
  },
  english: {
    en: 'English',
    de: 'Englisch',
  },
  german: {
    en: 'German',
    de: 'Deutsch',
  },
};

export type TranslationKey = keyof typeof translations;

let currentLocale: Locale = 'en';

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

export const getLocale = (): Locale => currentLocale;

export const t = (key: TranslationKey): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return String(key);
  }
  return translations[key][currentLocale];
};

/**
 * Format a number as currency according to the current locale settings
 * @param value - The numeric value to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, decimals = 2): string => {
  const config = currencyConfigs[currentLocale];
  
  // Format the number with appropriate separators
  let [integerPart, decimalPart] = value.toFixed(decimals).split('.');
  
  // Add thousands separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
  
  // Combine with decimal part using the correct decimal separator
  const formattedValue = decimalPart 
    ? `${integerPart}${config.decimalSeparator}${decimalPart}`
    : integerPart;
  
  // Add the currency symbol in the correct position
  if (config.position === 'prefix') {
    return `${config.symbol}${formattedValue}`;
  } else {
    return `${formattedValue} ${config.symbol}`;
  }
};
