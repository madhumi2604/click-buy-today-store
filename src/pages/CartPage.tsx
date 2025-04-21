
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { 
  Trash2, 
  ShoppingBasket, 
  ChevronLeft, 
  MinusCircle, 
  PlusCircle,
  ShieldCheck,
  Truck,
  Clock
} from 'lucide-react';
import { Separator } from '../components/ui/separator';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Shipping calculation (fake)
  const shippingCost = cartTotal > 50 ? 0 : 9.99;
  const taxRate = 0.07; // 7% tax
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <ShoppingBasket className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="btn-primary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6 text-shop-primary">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </h2>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-gray-500 hover:text-red-500">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Cart Item List */}
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const { product, quantity } = item;
                  const discountedPrice = product.discount 
                    ? product.price * (1 - product.discount / 100) 
                    : product.price;
                  const itemTotal = discountedPrice * quantity;
                  
                  return (
                    <div key={product.id} className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="sm:w-1/4 mb-4 sm:mb-0">
                        <Link to={`/product/${product.id}`}>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="rounded-md w-full h-auto object-cover"
                          />
                        </Link>
                      </div>
                      
                      {/* Product Details */}
                      <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                        <div className="flex-grow">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-medium text-shop-primary hover:text-shop-secondary mb-1">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                          
                          {/* Price */}
                          <div className="mb-4">
                            {product.discount ? (
                              <div className="flex items-center">
                                <span className="font-semibold text-shop-primary">${discountedPrice.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-red-500">Save {product.discount}%</span>
                              </div>
                            ) : (
                              <span className="font-semibold text-shop-primary">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Quantity and Remove */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              disabled={quantity <= 1}
                              className="p-2 text-gray-500 hover:text-shop-secondary disabled:opacity-50"
                            >
                              <MinusCircle className="h-5 w-5" />
                            </button>
                            <span className="px-4 py-2 font-medium">{quantity}</span>
                            <button 
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-2 text-gray-500 hover:text-shop-secondary"
                            >
                              <PlusCircle className="h-5 w-5" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-shop-primary">${itemTotal.toFixed(2)}</span>
                            <button 
                              onClick={() => removeFromCart(product.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Continue Shopping */}
            <div className="p-6 bg-gray-50 border-t">
              <Link to="/products" className="flex items-center text-shop-secondary hover:underline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <Separator className="mb-4" />
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-shop-primary">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full btn-primary mb-4"
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
              
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
                  <span>Secure checkout with encrypted payment processing</span>
                </div>
                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-2 text-shop-secondary flex-shrink-0" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-shop-secondary flex-shrink-0" />
                  <span>30-day easy returns</span>
                </div>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-grow rounded-l-md px-4 py-2 border-r-0 focus:outline-none focus:ring-1 focus:ring-shop-secondary"
                />
                <Button className="rounded-l-none btn-primary">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
