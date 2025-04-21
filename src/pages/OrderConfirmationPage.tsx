
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-shop-primary">Thank You For Your Order!</h1>
          <p className="text-gray-600 mb-2">
            Your order has been received and is being processed.
          </p>
          <p className="font-medium text-lg">
            Order Number: <span className="text-shop-secondary">{orderNumber}</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium">Order Confirmation</h3>
                <p className="text-sm text-gray-500">
                  You'll receive an email confirmation shortly.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-gray-500">
                  We'll prepare your items for shipment.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium">Shipping</h3>
                <p className="text-sm text-gray-500">
                  Your order will be on its way to you soon!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1 md:flex-none"
          >
            Return Home
          </Button>
          <Button 
            onClick={() => navigate('/products')}
            className="flex-1 md:flex-none"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
