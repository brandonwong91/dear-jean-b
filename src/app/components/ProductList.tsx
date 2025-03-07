"use client";

import { useEffect, useState } from "react";

interface Product {
  name: string;
  brand: string;
  description: string;
  price: string;
  location: string;
  timestamp: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleProductClick = (product: Product) => {
    const searchQuery = encodeURIComponent(
      `${product.name} ${product.brand} Hello Kitty`
    );
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProducts(data.products);
      } catch (err) {
        setError("Failed to load products ♡");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 text-center">
        <div className="animate-pulse text-pink-400">Loading products... ♪</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 text-center">
        <div className="text-pink-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-500 mb-4 text-center">
        Latest Hello Kitty Collaborations ♡
      </h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-full">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-none w-72 bg-white/90 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <h3 className="text-lg font-semibold text-pink-600 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                In collaboration with {product.brand}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-pink-500 mb-1">
                {product.price}
              </p>
              <p className="text-sm text-gray-600">
                Available at {product.location}
              </p>
              <p className="text-xs text-gray-400 mt-2 italic">
                {formatTimeAgo(product.timestamp)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
