
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: string }) => {
  let color;
  switch (status) {
    case 'pending':
      color = "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      break;
    case 'processing':
      color = "bg-blue-100 text-blue-700 hover:bg-blue-100";
      break;
    case 'shipped':
      color = "bg-purple-100 text-purple-700 hover:bg-purple-100";
      break;
    case 'delivered':
      color = "bg-green-100 text-green-700 hover:bg-green-100";
      break;
    case 'cancelled':
      color = "bg-red-100 text-red-700 hover:bg-red-100";
      break;
    default:
      color = "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
  
  return (
    <Badge className={cn("font-normal", color)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const RecentOrders = () => {
  // Get the 5 most recent orders
  const recentOrders = [...orders].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 5);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
