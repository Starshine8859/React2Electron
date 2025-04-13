import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { t, formatCurrency } from "@/lib/i18n";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onStatusChange: (product: Product, status: "active" | "inactive") => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  products, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterStock, setFilterStock] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const filteredProducts = products.filter((product) => {
    if (filterStatus !== "all" && product.status !== filterStatus) {
      return false;
    }
    
    if (filterStock === "low" && product.inventory > 10) {
      return false;
    } else if (filterStock === "out" && product.inventory > 0) {
      return false;
    }
    
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative md:w-1/3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchProducts")}
            className="pl-10 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[130px] bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allStatuses")}</SelectItem>
              <SelectItem value="active">{t("active")}</SelectItem>
              <SelectItem value="inactive">{t("inactive")}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStock} onValueChange={setFilterStock}>
            <SelectTrigger className="w-[130px] bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder={t("inventory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allStock")}</SelectItem>
              <SelectItem value="low">{t("lowStock")}</SelectItem>
              <SelectItem value="out">{t("outOfStock")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-900">
            <TableRow>
              <TableHead className="h-10">{t("sku")}</TableHead>
              <TableHead>{t("product")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("price")}</TableHead>
              <TableHead>{t("inventory")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("lastUpdated")}</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <TableCell className="font-mono">{product.sku}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-medium">{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {product.inventory <= 5 && (
                      <AlertTriangle size={14} className="text-amber-500" />
                    )}
                    {product.inventory}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={product.status === "active" ? "default" : "secondary"}
                    className={product.status === "active" 
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800" 
                      : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"}
                  >
                    {product.status === "active" ? t("active") : t("inactive")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(product.lastUpdated), { addSuffix: true })}
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
                      <DropdownMenuItem onClick={() => onEdit(product)}>
                        {t("edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(product)}>
                        {t("delete")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => 
                        onStatusChange(
                          product, 
                          product.status === "active" ? "inactive" : "active"
                        )
                      }>
                        {product.status === "active" ? t("deactivate") : t("activate")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {t("noProductsFound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductTable;
