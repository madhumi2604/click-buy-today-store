import React, { useState, useEffect } from 'react';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { getProducts, getCategories, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const ProductsPage = () => {
  const allProducts = getProducts();
  const categories = getCategories();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  // Effect to filter products when criteria change
  useEffect(() => {
    let result = [...allProducts];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // For 'featured', keep original order
        break;
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategories, priceRange, sortBy, allProducts]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setSortBy('featured');
  };
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6 text-shop-primary">All Products</h1>
      
      {/* Top controls: search, sort, filter toggle (mobile) */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        {/* Search bar */}
        <div className="relative flex-grow max-w-md">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Sort by dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Sort:</span>
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Mobile filter toggle */}
        <Button 
          variant="outline" 
          className="md:hidden flex items-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000) && (
            <span className="ml-2 bg-shop-secondary text-white text-xs rounded-full px-2 py-1">
              {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className={`
          ${showFilters ? 'block' : 'hidden'} md:block 
          md:w-[250px] lg:w-[300px] flex-shrink-0 bg-white p-4 rounded-lg shadow-sm border
        `}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-shop-primary">Filters</h2>
            <Button variant="link" size="sm" onClick={resetFilters}>
              Reset All
            </Button>
          </div>
          
          {/* Categories */}
          <div className="py-4 border-t">
            <h3 className="text-md font-medium mb-3 text-shop-primary">Categories</h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox
                    id={`category-${index}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label 
                    htmlFor={`category-${index}`}
                    className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price range */}
          <div className="py-4 border-t">
            <h3 className="text-md font-medium mb-3 text-shop-primary">Price Range</h3>
            <div className="px-2">
              <Slider
                min={0}
                max={2000}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <div className="bg-gray-100 p-2 rounded-md">
                  ${priceRange[0]}
                </div>
                <span className="text-gray-500">to</span>
                <div className="bg-gray-100 p-2 rounded-md">
                  ${priceRange[1]}
                </div>
              </div>
            </div>
          </div>
          
          {/* Availability */}
          <div className="py-4 border-t">
            <h3 className="text-md font-medium mb-3 text-shop-primary">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox id="instock" />
                <Label 
                  htmlFor="instock"
                  className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                >
                  In Stock Only
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="discount" />
                <Label 
                  htmlFor="discount"
                  className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                >
                  On Sale
                </Label>
              </div>
            </div>
          </div>
          
          {/* Close filters button (mobile only) */}
          <Button 
            className="md:hidden w-full mt-4"
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </Button>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          {/* Active filters chips */}
          {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
                >
                  {category}
                  <button 
                    onClick={() => handleCategoryChange(category)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                  ${priceRange[0]} - ${priceRange[1]}
                  <button 
                    onClick={() => setPriceRange([0, 2000])}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <button 
                onClick={resetFilters}
                className="text-sm text-shop-secondary hover:underline"
              >
                Clear All
              </button>
            </div>
          )}
          
          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
          
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-3">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
