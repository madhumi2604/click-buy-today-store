
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Minus, 
  Plus, 
  Share2, 
  Heart, 
  ShoppingBag, 
  ShoppingCart, 
  Star, 
  Truck,
  Shield,
  RefreshCw,
  Check,
  Info
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Badge } from '../components/ui/badge';
import ProductCard from '../components/ProductCard';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Example multiple product images
  const productImages = [
    product?.image,
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=60',
  ];
  
  // Get related products (same category)
  const relatedProducts = product 
    ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }
  
  // Calculate discount price
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'increase') {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-shop-secondary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
        <Link to="/products" className="text-gray-500 hover:text-shop-secondary">Products</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
        <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-shop-secondary">{product.category}</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
        <span className="font-medium text-shop-primary">{product.name}</span>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden mb-4 border">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`
                    aspect-square rounded overflow-hidden border cursor-pointer
                    ${selectedImage === index ? 'ring-2 ring-shop-secondary' : 'opacity-70 hover:opacity-100'}
                  `}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-auto">
              {/* Product Title and Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {product.discount && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {product.discount}% OFF
                  </Badge>
                )}
                {product.featured && (
                  <Badge variant="outline" className="text-shop-secondary border-shop-secondary">
                    Featured
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="secondary">
                    Out of Stock
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-shop-primary">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                    />
                  ))}
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {discountedPrice ? (
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-shop-primary mr-2">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 text-red-500 font-medium">
                      Save ${(product.price - discountedPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-shop-primary">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Product Features/Highlights */}
              <div className="mb-6">
                <h3 className="font-medium text-shop-primary mb-2">Highlights</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>High-quality material</li>
                  <li>Expertly crafted</li>
                  <li>Durable and long-lasting</li>
                  <li>Modern, stylish design</li>
                </ul>
              </div>
            </div>
            
            {/* Add to Cart Section */}
            <div className="pt-6 border-t mt-auto">
              {/* Stock Status */}
              <div className="flex items-center mb-4">
                <div className={`h-3 w-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <span className={`font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.inStock && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1">
                          <Info className="h-4 w-4 text-gray-400" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ships within 1-2 business days</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-4">
                <span className="mr-4 font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={quantity <= 1 || !product.inStock}
                    onClick={() => handleQuantityChange('decrease')}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="px-4 py-2 w-12 text-center">
                    {quantity}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={!product.inStock}
                    onClick={() => handleQuantityChange('increase')}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg"
                  className="btn-primary"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  disabled={!product.inStock}
                  className="btn-outline"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>
                <Button 
                  size="icon" 
                  variant="outline"
                  className="sm:ml-auto"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping, Returns, Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 border-t">
          <div className="flex items-center">
            <Truck className="h-6 w-6 text-shop-secondary" />
            <div className="ml-3">
              <h4 className="font-medium text-shop-primary">Free Shipping</h4>
              <p className="text-sm text-gray-500">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center">
            <RefreshCw className="h-6 w-6 text-shop-secondary" />
            <div className="ml-3">
              <h4 className="font-medium text-shop-primary">Easy Returns</h4>
              <p className="text-sm text-gray-500">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-shop-secondary" />
            <div className="ml-3">
              <h4 className="font-medium text-shop-primary">Warranty</h4>
              <p className="text-sm text-gray-500">1-year limited warranty</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs: Details, Specs, Reviews */}
      <div className="mb-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-6 bg-white rounded-b-lg border border-t-0">
            <div className="prose max-w-none">
              <h3>About This Item</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent luctus justo in massa malesuada, id aliquam dui tempor. Morbi a faucibus nunc, at condimentum nisi.</p>
              
              <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Nunc vehicula, purus in vehicula faucibus, nulla elit tincidunt nisl, vel tempor libero odio vel nisi.</p>
              
              <h4>Key Features</h4>
              <ul>
                <li>High-quality construction for durability</li>
                <li>Versatile functionality for various use cases</li>
                <li>Modern design that complements any setting</li>
                <li>Energy-efficient operation</li>
                <li>User-friendly interface</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="p-6 bg-white rounded-b-lg border border-t-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <h3 className="font-medium text-shop-primary mb-4">Technical Specifications</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-600">Model</td>
                      <td className="py-2 text-gray-800">XYZ-1234</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-600">Dimensions</td>
                      <td className="py-2 text-gray-800">10" x 8" x 2"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-600">Weight</td>
                      <td className="py-2 text-gray-800">1.5 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-600">Material</td>
                      <td className="py-2 text-gray-800">Aluminum & Plastic</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-600">Color</td>
                      <td className="py-2 text-gray-800">Silver</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-medium text-shop-primary mb-4">In The Box</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Main Product</li>
                  <li>User Manual</li>
                  <li>Warranty Card</li>
                  <li>Accessories Kit</li>
                  <li>Power Adapter</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-6 bg-white rounded-b-lg border border-t-0">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-shop-primary mb-3">Customer Reviews</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-bold">{product.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">out of 5</span>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center">
                        <span className="text-sm w-6">{star}</span>
                        <div className="flex-1 mx-2 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400" 
                            style={{ 
                              width: `${star === Math.floor(product.rating) ? '70%' : star > Math.floor(product.rating) ? '10%' : '40%'}` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {star === Math.floor(product.rating) ? '70%' : star > Math.floor(product.rating) ? '10%' : '40%'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 btn-primary">
                    Write a Review
                  </Button>
                </div>
              </div>
              <div className="md:w-2/3">
                {/* Review items */}
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium text-shop-primary">John Doe</h4>
                        <span className="text-sm text-gray-500">2 weeks ago</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < 5 - review % 2 ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">Verified Purchase</span>
                      </div>
                      <h5 className="font-medium mb-2">Great product, highly recommend!</h5>
                      <p className="text-gray-600 mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent sit amet justo in massa malesuada, id aliquam dui tempor.
                      </p>
                      <div className="flex items-center text-sm">
                        <button className="flex items-center text-gray-500 hover:text-shop-secondary">
                          <Check className="h-4 w-4 mr-1" /> Helpful (12)
                        </button>
                        <span className="mx-2 text-gray-300">|</span>
                        <button className="text-gray-500 hover:text-shop-secondary">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="flex">
                    <Button variant="outline" size="sm" className="rounded-r-none">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none bg-shop-secondary text-white">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-l-none">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="section-title">Related Products</h2>
        <div className="product-grid">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
