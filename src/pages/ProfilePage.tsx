
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  CreditCard, 
  MapPin, 
  Bell, 
  Shield, 
  LogOut,
  Pencil,
  Save,
  X
} from 'lucide-react';
import { Separator } from '../components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state for profile editing
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(123) 456-7890',
    address: '123 Main St, City, State 12345'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  // Example order data
  const orders = [
    {
      id: "ORD-123456",
      date: "Apr 15, 2025",
      status: "Delivered",
      total: 249.99,
      items: 2
    },
    {
      id: "ORD-123457",
      date: "Apr 10, 2025",
      status: "Processing",
      total: 89.99,
      items: 1
    },
    {
      id: "ORD-123458",
      date: "Mar 25, 2025",
      status: "Cancelled",
      total: 59.99,
      items: 1
    }
  ];
  
  // Example wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Professional Camera Kit",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  // Render different tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-shop-primary">Personal Information</h2>
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="btn-outline"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSaveProfile}
                    className="btn-primary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-medium">{formData.address}</p>
                  </div>
                </div>
              </div>
            )}
            
            <Separator className="my-8" />
            
            <div>
              <h2 className="text-xl font-semibold text-shop-primary mb-6">Account Security</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-between">
                  Change Password
                  <Shield className="h-5 w-5 ml-2" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Two-Factor Authentication
                  <Shield className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-red-500 hover:text-red-600 hover:border-red-300"
                  onClick={handleLogout}
                >
                  Sign Out
                  <LogOut className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'orders':
        return (
          <div>
            <h2 className="text-xl font-semibold text-shop-primary mb-6">Order History</h2>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="p-4 border rounded-lg hover:border-shop-secondary transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-medium text-shop-primary">{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="flex items-center md:mt-0 mt-2">
                        <div className="mr-4">
                          <span 
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-700' 
                                : order.status === 'Processing'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">{order.items} items</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="link" className="text-shop-secondary p-0">
                        View Order Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Orders Found</h3>
                <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                <Button className="btn-primary">Start Shopping</Button>
              </div>
            )}
          </div>
        );
        
      case 'wishlist':
        return (
          <div>
            <h2 className="text-xl font-semibold text-shop-primary mb-6">Your Wishlist</h2>
            
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="w-1/3">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col">
                      <h3 className="font-medium text-shop-primary mb-2">{item.name}</h3>
                      <p className="font-semibold mb-4">${item.price.toFixed(2)}</p>
                      <div className="mt-auto flex space-x-2">
                        <Button className="w-full btn-primary" size="sm">
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-500 mb-4">Save items you like to your wishlist.</p>
                <Button className="btn-primary">Explore Products</Button>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="h-5 w-5" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
  ];
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8 text-shop-primary">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar navigation */}
        <aside className="md:w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-shop-secondary text-white flex items-center justify-center font-medium">
                  {user?.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h2 className="font-medium text-shop-primary">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <ul className="p-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-shop-secondary text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`${activeTab === tab.id ? 'text-white' : 'text-gray-500'} mr-3`}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="p-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
