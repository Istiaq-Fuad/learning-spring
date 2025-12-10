"use client";

import { useState, useCallback } from "react";
import ProductList from "@/components/ProductList";
import AddProductForm from "@/components/AddProductForm";
import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Product Management
                </h1>
                <p className="text-gray-600">
                  Manage your product inventory with ease
                </p>
              </div>
            </div>
            <AddProductForm onProductAdded={handleProductAdded} />
          </div>
          <Separator className="mt-6" />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <ProductList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
