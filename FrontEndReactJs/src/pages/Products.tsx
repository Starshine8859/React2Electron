
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";
import { Product, products as initialProducts } from "@/lib/data";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  
  // Calculate pagination details
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Update page handler
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  
  // Create or update a product with useCallback for optimization
  const handleSaveProduct = useCallback((productData: Partial<Product>) => {
    if (currentProduct) {
      // Update existing product
      setProducts(prevProducts => prevProducts.map(p => 
        p.id === currentProduct.id 
          ? { ...p, ...productData, lastUpdated: new Date().toISOString() } 
          : p
      ));
      toast.success(t("productUpdated"));
    } else {
      // Create new product
      const newProduct: Product = {
        id: Date.now().toString(),
        sku: productData.sku || `SKU-${Date.now()}`,
        name: productData.name || "New Product",
        category: productData.category || "Uncategorized",
        price: productData.price || 0,
        inventory: productData.inventory || 0,
        status: productData.status || "active",
        lastUpdated: new Date().toISOString()
      };
      setProducts(prevProducts => [...prevProducts, newProduct]);
      toast.success(t("productAdded"));
    }
    setIsFormOpen(false);
    setCurrentProduct(undefined);
  }, [currentProduct]);
  
  // Edit a product
  const handleEditProduct = useCallback((product: Product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  }, []);
  
  // Delete a product
  const handleDeleteClick = useCallback((product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  }, []);
  
  const confirmDelete = useCallback(() => {
    if (currentProduct) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== currentProduct.id));
      setIsDeleteDialogOpen(false);
      setCurrentProduct(undefined);
      toast.success(t("productDeleted"));
    }
  }, [currentProduct]);
  
  // Change product status
  const handleStatusChange = useCallback((product: Product, status: "active" | "inactive") => {
    setProducts(prevProducts => prevProducts.map(p => 
      p.id === product.id 
        ? { ...p, status, lastUpdated: new Date().toISOString() } 
        : p
    ));
    toast.success(`${product.name} ${status === "active" ? t("active") : t("inactive")}`);
  }, []);
  
  // Add product button click handler
  const handleAddProductClick = useCallback(() => {
    setCurrentProduct(undefined);
    setIsFormOpen(true);
  }, []);
  
  // Close form handler
  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);
  
  // Close delete dialog handler
  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">{t("products")}</h2>
        <Button onClick={handleAddProductClick}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addProduct")}
        </Button>
      </div>
      
      <ProductTable 
        products={paginatedProducts} 
        onEdit={handleEditProduct}
        onDelete={handleDeleteClick}
        onStatusChange={handleStatusChange}
      />
      
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum: number;
                
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  if (i < 4) {
                    pageNum = i + 1;
                  } else {
                    return (
                      <PaginationItem key={i}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                } else if (currentPage >= totalPages - 2) {
                  if (i === 0) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  } else {
                    pageNum = totalPages - 4 + i;
                  }
                } else {
                  if (i === 0) {
                    pageNum = 1;
                  } else if (i === 1) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  } else if (i === 2) {
                    pageNum = currentPage;
                  } else if (i === 3) {
                    pageNum = currentPage + 1;
                  } else {
                    return (
                      <PaginationItem key={i}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                }
                
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={pageNum === currentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      <ProductForm 
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveProduct}
        product={currentProduct}
      />
      
      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={confirmDelete}
        product={currentProduct}
      />
    </div>
  );
};

export default Products;
