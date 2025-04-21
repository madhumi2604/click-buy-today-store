
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart, Product } from '../contexts/CartContext';
import { Badge } from '../components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  return (
    <div className="product-card group animate-slide-up">
      <div className="relative overflow-hidden">
        {/* Product image */}
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        
        {/* Wishlist button */}
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full z-10"
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </Button>
        
        {/* Discount badge */}
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {product.discount}% OFF
          </Badge>
        )}
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-white font-medium text-lg">Out of Stock</p>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        
        {/* Product name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-shop-primary hover:text-shop-secondary transition-colors line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mt-2 mb-3">
          <div className="flex text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
          
          {/* Stock status */}
          <div className="ml-auto">
            {product.inStock ? (
              <div className="flex items-center text-green-600 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                <span>In Stock</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500 text-xs">
                <XCircle className="w-3 h-3 mr-1" />
                <span>Out of Stock</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mt-3">
          <div>
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="font-semibold text-shop-primary">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-semibold text-shop-primary">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Add to cart button */}
          <Button 
            size="sm" 
            variant="outline"
            disabled={!product.inStock}
            onClick={() => product.inStock && addToCart(product)}
            className="btn-outline"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
