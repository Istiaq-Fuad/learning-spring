"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { api, Product } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ShoppingCart } from "lucide-react";

interface ProductListProps {
  onRefresh?: () => void;
}

export default function ProductList({ onRefresh }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await api.getProducts();
      setProducts(fetchedProducts);
      if (fetchedProducts.length === 0) {
        toast.info("No products found", {
          description: "Get started by adding your first product.",
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch products";
      setError(errorMessage);
      toast.error("Failed to load products", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Expose refresh function to parent
  useEffect(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Button onClick={fetchProducts} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 mb-4">
          Get started by adding your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products ({products.length})</h2>
        <Button onClick={fetchProducts} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {product.brand} • {product.category}
                  </CardDescription>
                </div>
                <Badge
                  variant={product.productAvailable ? "default" : "secondary"}
                >
                  {product.productAvailable ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {product.imageData && (
                <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden relative">
                  <Image
                    src={`data:${product.imageType};base64,${product.imageData}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      Stock: {product.stockQuantity}
                    </div>
                    <div className="text-xs text-gray-400">
                      Released: {formatDate(product.releaseDate)}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                disabled={
                  !product.productAvailable || product.stockQuantity === 0
                }
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.productAvailable && product.stockQuantity > 0
                  ? "Add to Cart"
                  : "Out of Stock"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
