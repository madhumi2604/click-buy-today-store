
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { CreditCard, CheckCircle, Truck, Lock, ChevronLeft } from 'lucide-react';

// Define the form schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid ZIP code is required" }),
  cardNumber: z.string().min(16, { message: "Valid card number is required" }).max(16),
  cardExpiry: z.string().min(5, { message: "Expiry date required (MM/YY)" }),
  cardCvc: z.string().min(3, { message: "CVC required" }).max(4),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });
  
  // Calculate order totals
  const shippingCost = cartTotal > 50 ? 0 : 9.99;
  const taxRate = 0.07; // 7% tax
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to process order
    try {
      // In a real application, you would send this data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      toast.error("Failed to process your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add items to your cart before checking out.</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/cart')} 
        className="mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>
      
      <h1 className="text-3xl font-bold mb-6 text-shop-primary">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-shop-secondary" />
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-shop-secondary" />
                  Payment Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiration Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardCvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-4 text-sm text-gray-500 flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Your payment information is encrypted and secure
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Complete Purchase - $${orderTotal.toFixed(2)}`}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-4">
              {cartItems.map(item => {
                const discountedPrice = item.product.discount 
                  ? item.product.price * (1 - item.product.discount / 100) 
                  : item.product.price;
                
                return (
                  <div key={item.product.id} className="flex justify-between">
                    <div className="flex items-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(discountedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 text-sm">
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
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-shop-primary">${orderTotal.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 space-y-3 text-sm text-gray-500">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
                <span>Your order qualifies for free shipping with orders over $50</span>
              </div>
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-2 text-shop-secondary flex-shrink-0" />
                <span>Estimated delivery: 3-5 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
