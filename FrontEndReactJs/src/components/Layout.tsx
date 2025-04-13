
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package2, 
  ShoppingCart, 
  Settings as SettingsIcon,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/i18n";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}>
        {/* Logo and Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">ShopFlow</h1>}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <Menu size={20} />
          </Button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {/* <NavItem icon={<LayoutDashboard />} to="/" label={t('dashboard')} collapsed={collapsed} /> */}
            <NavItem icon={<Package2 />} to="/products" label={t('products')} collapsed={collapsed} />
            <NavItem icon={<ShoppingCart />} to="/orders" label={t('orders')} collapsed={collapsed} />
            {/* <NavItem icon={<SettingsIcon />} to="/settings" label={t('settings')} collapsed={collapsed} /> */}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs text-center">
          {!collapsed && <span>ShopFlow v1.0</span>}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-lg font-medium dark:text-white">ShopFlow Command Center</h1>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="p-4 dark:bg-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  label: string;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, to, label, collapsed }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => cn(
          "flex items-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
          isActive && "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium",
          collapsed ? "justify-center" : "justify-start"
        )}
      >
        <span className="w-5 h-5">{icon}</span>
        {!collapsed && <span className="ml-2">{label}</span>}
      </NavLink>
    </li>
  );
};

export default Layout;
