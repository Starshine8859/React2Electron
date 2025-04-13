
import React from "react";
import { 
  DollarSign, 
  Package, 
  AlertTriangle,
  ShoppingCart
} from "lucide-react";
import StatCard from "@/components/Dashboard/StatCard";
import OrdersChart from "@/components/Dashboard/OrdersChart";
import RecentOrders from "@/components/Dashboard/RecentOrders";
import { dashboardSummary } from "@/lib/data";

const Index = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Sales" 
          value={`$${dashboardSummary.totalSales.toFixed(2)}`}
          icon={<DollarSign size={18} />}
          trend={{ value: 12.5, positive: true }}
        />
        
        <StatCard 
          title="Pending Orders" 
          value={dashboardSummary.pendingOrders}
          icon={<ShoppingCart size={18} />}
        />
        
        <StatCard 
          title="Low Stock Alerts" 
          value={dashboardSummary.lowStockAlerts}
          icon={<AlertTriangle size={18} />}
        />
        
        <StatCard 
          title="Total Orders" 
          value={dashboardSummary.totalOrders}
          icon={<Package size={18} />}
          trend={{ value: 4.3, positive: true }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <OrdersChart />
      </div>
      
      <RecentOrders />
    </div>
  );
};

export default Index;
