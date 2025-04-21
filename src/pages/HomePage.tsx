
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";
import { Button } from '../components/ui/button';
import { getFeaturedProducts, getCategories } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();
  
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shop-primary to-shop-primary/80 text-white py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Shop the Latest Trends</h1>
              <p className="text-lg mb-8 text-white/80">
                Discover quality products for your everyday needs. From electronics to fashion, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/products">
                  <Button size="lg" className="bg-shop-secondary hover:bg-opacity-90 transition-all">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/deals">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white bg-white/10 hover:bg-white hover:text-shop-primary transition-all"
                  >
                    View Deals
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="Featured Products" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="flex items-center text-shop-secondary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title mb-10">Shop by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/category/${category}`} 
                className="group relative overflow-hidden rounded-lg h-64 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <img 
                  src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80`} 
                  alt={category} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <span>View Products</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Special Offer Banner */}
      <section className="py-12 bg-shop-secondary/10">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-shop-secondary font-semibold mb-2">Limited Time Offer</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shop-primary">
                  Save 20% on All Electronics
                </h2>
                <p className="text-gray-600 mb-6">
                  Upgrade your tech with our premium selection of laptops, smartphones, and accessories. Sale ends soon!
                </p>
                <div>
                  <Link to="/category/Electronics">
                    <Button className="bg-shop-secondary hover:bg-opacity-90 transition-all">
                      Shop Electronics
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                  alt="Electronics Sale" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">What Our Customers Say</h2>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[1, 2, 3].map((index) => (
                <CarouselItem key={index} className="md:basis-1/1">
                  <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
                    <div className="flex items-center text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "I've been shopping here for years and the quality never disappoints. The customer service is exceptional and shipping is always faster than expected!"
                    </p>
                    <div className="flex items-center mt-6">
                      <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                      <div>
                        <h4 className="font-medium text-shop-primary">Sarah Johnson</h4>
                        <p className="text-sm text-gray-500">Loyal Customer</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-shop-primary text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">Join Our Newsletter</h2>
          <p className="text-white/80 mb-8">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md text-shop-primary focus:outline-none focus:ring-2 focus:ring-shop-secondary"
            />
            <Button className="bg-shop-secondary hover:bg-opacity-90 transition-all px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
