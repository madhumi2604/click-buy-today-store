
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-shop-primary text-white">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">ShopStore</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for the best products at competitive prices. Shop with confidence for electronics, fashion, home goods, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-300 hover:text-white transition-colors">
                  Deals & Discounts
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-300 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Shopping Street, City, Country, 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-300 flex-shrink-0" />
                <span className="text-gray-300">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-300 flex-shrink-0" />
                <span className="text-gray-300">support@shopstore.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter and get 10% off your first purchase.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                placeholder="Your Email"
                className="bg-white/10 text-white border-gray-600 placeholder:text-gray-400"
              />
              <Button className="bg-shop-secondary hover:bg-opacity-90 transition-colors">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 ShopStore. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
