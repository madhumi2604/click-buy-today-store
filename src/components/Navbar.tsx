import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { ShoppingCart, Menu, X, User, Heart, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-shop-primary">ShopStore</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-shop-primary hover:text-shop-secondary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-shop-primary hover:text-shop-secondary transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-shop-primary hover:text-shop-secondary transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-shop-primary hover:text-shop-secondary transition-colors">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-shop-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-shop-primary">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-shop-primary">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-shop-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-shop-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="btn-outline">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-shop-primary">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-shop-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-shop-primary">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-6 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-shop-primary hover:text-shop-secondary" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/products" className="text-shop-primary hover:text-shop-secondary" onClick={closeMenu}>
              Products
            </Link>
            <Link to="/categories" className="text-shop-primary hover:text-shop-secondary" onClick={closeMenu}>
              Categories
            </Link>
            <Link to="/about" className="text-shop-primary hover:text-shop-secondary" onClick={closeMenu}>
              About
            </Link>
            
            <div className="pt-2 border-t">
              {isAuthenticated ? (
                <>
                  <div className="mb-2 font-medium text-shop-primary">
                    Hello, {user?.name || 'User'}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link to="/profile" className="text-shop-primary hover:text-shop-secondary" onClick={closeMenu}>
                      Profile
                    </Link>
                    <Link to="/orders" className="text-shop-primary hover:text-shop-secondary" onClick={closeMenu}>
                      Orders
                    </Link>
                    <Link to="/wishlist" className="text-shop-primary hover:text-shop-secondary" onClick={closeMenu}>
                      Wishlist
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="text-left text-shop-primary hover:text-shop-secondary"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full btn-outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <Button className="w-full btn-primary">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
