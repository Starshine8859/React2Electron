
// Mock data for the application

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  inventory: number;
  status: 'active' | 'inactive';
  category: string;
  lastUpdated: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  date: string;
  trackingId?: string;
}

export interface DailySales {
  date: string;
  amount: number;
}

// Products data
export const products: Product[] = [
  {
    id: '1',
    sku: 'P00123',
    name: 'Wireless Headphones',
    price: 99.99,
    inventory: 45,
    status: 'active',
    category: 'Electronics',
    lastUpdated: '2025-04-01T10:30:00Z',
  },
  {
    id: '2',
    sku: 'P00456',
    name: 'Smart Watch',
    price: 149.99,
    inventory: 12,
    status: 'active',
    category: 'Electronics',
    lastUpdated: '2025-04-03T09:15:00Z',
  },
  {
    id: '3',
    sku: 'P00789',
    name: 'Laptop Stand',
    price: 29.99,
    inventory: 78,
    status: 'active',
    category: 'Accessories',
    lastUpdated: '2025-04-05T14:20:00Z',
  },
  {
    id: '4',
    sku: 'P00321',
    name: 'Bluetooth Speaker',
    price: 79.99,
    inventory: 5,
    status: 'active',
    category: 'Electronics',
    lastUpdated: '2025-04-06T11:45:00Z',
  },
  {
    id: '5',
    sku: 'P00654',
    name: 'Wireless Mouse',
    price: 24.99,
    inventory: 32,
    status: 'active',
    category: 'Accessories',
    lastUpdated: '2025-04-08T16:30:00Z',
  },
  {
    id: '6',
    sku: 'P00987',
    name: 'USB-C Hub',
    price: 49.99,
    inventory: 18,
    status: 'inactive',
    category: 'Accessories',
    lastUpdated: '2025-04-09T13:10:00Z',
  },
  {
    id: '7',
    sku: 'P00135',
    name: 'Phone Case',
    price: 19.99,
    inventory: 0,
    status: 'active',
    category: 'Accessories',
    lastUpdated: '2025-04-10T15:40:00Z',
  },
  {
    id: '8',
    sku: 'P00246',
    name: 'Wireless Charger',
    price: 34.99,
    inventory: 23,
    status: 'active',
    category: 'Electronics',
    lastUpdated: '2025-04-11T12:20:00Z',
  },
];

// Orders data
export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-0001',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    status: 'delivered',
    total: 149.99,
    items: 1,
    date: '2025-04-01T10:30:00Z',
    trackingId: 'TRK123456789',
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-0002',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    status: 'shipped',
    total: 99.99,
    items: 1,
    date: '2025-04-05T14:20:00Z',
    trackingId: 'TRK987654321',
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-0003',
    customer: {
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
    },
    status: 'processing',
    total: 129.98,
    items: 2,
    date: '2025-04-08T16:30:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-2025-0004',
    customer: {
      name: 'Bob Williams',
      email: 'bob.w@example.com',
    },
    status: 'pending',
    total: 49.99,
    items: 1,
    date: '2025-04-10T15:40:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD-2025-0005',
    customer: {
      name: 'Sarah Davis',
      email: 'sarah.d@example.com',
    },
    status: 'pending',
    total: 224.97,
    items: 3,
    date: '2025-04-11T12:20:00Z',
  },
  {
    id: '6',
    orderNumber: 'ORD-2025-0006',
    customer: {
      name: 'Mike Brown',
      email: 'mike.b@example.com',
    },
    status: 'cancelled',
    total: 79.99,
    items: 1,
    date: '2025-04-09T13:10:00Z',
  },
];

// Daily sales data
export const dailySales: DailySales[] = [
  { date: 'Apr 05', amount: 99.99 },
  { date: 'Apr 06', amount: 149.99 },
  { date: 'Apr 07', amount: 0 },
  { date: 'Apr 08', amount: 129.98 },
  { date: 'Apr 09', amount: 79.99 },
  { date: 'Apr 10', amount: 49.99 },
  { date: 'Apr 11', amount: 224.97 },
];

// Dashboard summary data
export const dashboardSummary = {
  totalSales: 734.91,
  pendingOrders: 2,
  lowStockAlerts: 2,
  totalOrders: orders.length
};
