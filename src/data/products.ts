
import { Product } from '../contexts/CartContext';

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    description: "Experience premium sound quality with our wireless noise-cancelling headphones. Perfect for travel, work, or relaxing at home.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=60",
    category: "Electronics",
    rating: 4.7,
    reviews: 324,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Ultra-Slim Laptop",
    description: "The perfect combination of power and portability. This ultra-slim laptop features the latest processor and all-day battery life.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60",
    category: "Electronics",
    rating: 4.8,
    reviews: 186,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals, monitor your heart rate, and stay connected with notifications on this premium smart fitness watch.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60",
    category: "Wearables",
    rating: 4.5,
    reviews: 213,
    inStock: true,
    discount: 15
  },
  {
    id: 4,
    name: "Professional Camera Kit",
    description: "Capture stunning photos and videos with this professional-grade camera kit. Includes multiple lenses and accessories.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=60",
    category: "Photography",
    rating: 4.9,
    reviews: 97,
    inStock: false,
    featured: true
  },
  {
    id: 5,
    name: "Bluetooth Portable Speaker",
    description: "Take your music anywhere with this waterproof, portable Bluetooth speaker featuring rich bass and 20-hour battery life.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=60",
    category: "Audio",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    discount: 10
  },
  {
    id: 6,
    name: "Designer Desk Lamp",
    description: "Illuminate your workspace with this stylish desk lamp featuring adjustable brightness levels and a modern design.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=500&q=60",
    category: "Home",
    rating: 4.2,
    reviews: 78,
    inStock: true
  },
  {
    id: 7,
    name: "Premium Coffee Maker",
    description: "Brew barista-quality coffee at home with this premium coffee maker. Features customizable settings and a built-in grinder.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60",
    category: "Kitchen",
    rating: 4.6,
    reviews: 112,
    inStock: true
  },
  {
    id: 8,
    name: "Ergonomic Office Chair",
    description: "Stay comfortable during long work sessions with this ergonomic office chair featuring lumbar support and adjustable height.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60",
    category: "Furniture",
    rating: 4.4,
    reviews: 89,
    inStock: true
  }
];

export const getProducts = () => products;

export const getProductById = (id: number) => 
  products.find(product => product.id === id);

export const getFeaturedProducts = () => 
  products.filter(product => product.featured);

export const getProductsByCategory = (category: string) => 
  products.filter(product => product.category === category);

export const getCategories = () => 
  Array.from(new Set(products.map(product => product.category)));

export default products;
