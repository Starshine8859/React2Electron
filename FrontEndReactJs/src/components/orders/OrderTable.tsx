import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Truck, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Order } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { t, formatCurrency } from "@/lib/i18n";

interface OrderTableProps {
  orders: Order[];
  onUpdateOrder: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onUpdateOrder }) => {
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  
  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false;
    }
    
    if (
      searchTerm &&
      !order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  const handleMarkAsShipped = (order: Order) => {
    setSelectedOrder(order);
    setTrackingId(order.trackingId || "");
    setIsTrackingDialogOpen(true);
  };
  
  const handleUpdateTracking = () => {
    if (selectedOrder) {
      const updatedOrder: Order = { 
        ...selectedOrder, 
        status: "shipped", 
        trackingId 
      };
      onUpdateOrder(updatedOrder);
      
      setIsTrackingDialogOpen(false);
      toast({
        title: t("orderUpdated"),
        description: `${t("order")} ${selectedOrder.orderNumber} ${t("shipped").toLowerCase()}`
      });
    }
  };
  
  const handleMarkAsDelivered = (order: Order) => {
    const updatedOrder: Order = { ...order, status: "delivered" };
    onUpdateOrder(updatedOrder);
    
    toast({
      title: t("orderUpdated"),
      description: `${t("order")} ${order.orderNumber} ${t("delivered").toLowerCase()}`
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative md:w-1/3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchOrders")}
            className="pl-10 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder={t("filterByStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="pending">{t("pending")}</SelectItem>
            <SelectItem value="processing">{t("processing")}</SelectItem>
            <SelectItem value="shipped">{t("shipped")}</SelectItem>
            <SelectItem value="delivered">{t("delivered")}</SelectItem>
            <SelectItem value="cancelled">{t("cancelled")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-900">
            <TableRow>
              <TableHead className="h-10">{t("orderNumber")}</TableHead>
              <TableHead>{t("customer")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("items")}</TableHead>
              <TableHead>{t("total")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <TableCell className="font-mono font-medium">{order.orderNumber}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleMarkAsShipped(order)}
                        disabled={order.status === 'shipped' || order.status === 'delivered' || order.status === 'cancelled'}>
                        <Truck className="mr-2 h-4 w-4" />
                        {t("markAsShipped")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMarkAsDelivered(order)}
                        disabled={order.status !== 'shipped'}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {t("markAsDelivered")}
                      </DropdownMenuItem>
                      <DropdownMenuItem>{t("viewDetails")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {t("noOrdersFound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("updateTracking")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("order")}: {selectedOrder?.orderNumber}</p>
              <Input
                placeholder={t("enterTrackingId")}
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTrackingDialogOpen(false)}
              className="border-gray-200 dark:border-gray-700">
              {t("cancel")}
            </Button>
            <Button onClick={handleUpdateTracking}
              className="bg-blue-500 hover:bg-blue-600 text-white">
              {t("updateAndShip")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const OrderStatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let label: string;
  let className = "";
  
  switch (status) {
    case 'pending':
      variant = "outline";
      label = t("pending");
      className = "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800";
      break;
    case 'processing':
      variant = "secondary";
      label = t("processing");
      className = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
      break;
    case 'shipped':
      variant = "default";
      label = t("shipped");
      className = "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800";
      break;
    case 'delivered':
      variant = "default";
      label = t("delivered");
      className = "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800";
      break;
    case 'cancelled':
      variant = "destructive";
      label = t("cancelled");
      className = "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
      break;
    default:
      label = status;
  }
  
  return <Badge variant={variant} className={className}>{label}</Badge>;
};

export default OrderTable;
