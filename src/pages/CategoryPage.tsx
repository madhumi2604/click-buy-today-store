
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategory, getCategories } from '../data/products';
import { Product } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const categories = getCategories();
  
  useEffect(() => {
    if (!categoryName || !categories.includes(categoryName)) {
      // If category doesn't exist, redirect to 404
      navigate('/not-found');
      return;
    }
    
    // Get products for this category
    const categoryProducts = getProductsByCategory(categoryName);
    setProducts(categoryProducts);
  }, [categoryName, categories, navigate]);
  
  const handleBackToProducts = () => {
    navigate('/products');
  };
  
  return (
    <div className="container-custom py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBackToProducts} className="mr-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-shop-primary">{categoryName}</h1>
      </div>
      
      {products.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-6">
            Found {products.length} {products.length === 1 ? 'product' : 'products'} in {categoryName}
          </p>
          
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-3">No products found</h3>
          <p className="text-gray-500 mb-6">
            There are no products available in this category at the moment.
          </p>
          <Button onClick={handleBackToProducts}>
            Back to Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
