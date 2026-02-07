import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const product = getProduct(id || '');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <section className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const handleWhatsAppOrder = () => {
    const priceToShow = product.hasDiscount && product.discountPercentage
      ? Math.round(product.price * (1 - (product.discountPercentage || 0) / 100))
      : product.price;
    const message = `Hi! I'm interested in ordering the ${product.name}${selectedSize ? ` in size ${selectedSize}` : ''}. Price: ${priceToShow} EGP`;
    // Egyptian number 01065778438 -> international format 201065778438
    window.open(`https://wa.me/201065778438?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInstagramOrder = () => {
    // Open the brand's Instagram profile
    window.open('https://www.instagram.com/aura50348?igsh=MTcydTlocXI2ZnJocA==', '_blank');
  };

  return (
    <section className="min-h-screen pt-24 md:pt-28 pb-16">
      <div className="container-custom px-4">
        {/* Back Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="fade-in-up">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden bg-secondary border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="fade-in-up stagger-2">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide bg-secondary rounded-full text-muted-foreground mb-4">
              {product.category === 'hoodie' ? 'Hoodie' : 'Milton Pants'}
            </span>

            {/* Title & Price */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-primary mb-6">
              {product.hasDiscount && product.discountPercentage ? (
                (() => {
                  const discounted = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));
                  return (
                    <span>
                      <span className="text-xl text-muted-foreground line-through mr-3">{product.price} EGP</span>
                      <span className="text-3xl font-semibold text-primary">{discounted} EGP</span>
                    </span>
                  );
                })()
              ) : (
                <span>{product.price} EGP</span>
              )}
            </p>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-badge ${selectedSize === size ? 'size-badge-selected' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full btn-primary flex items-center justify-center gap-3"
              >
                <MessageCircle size={20} />
                Order via WhatsApp
              </button>
              <button
                onClick={handleInstagramOrder}
                className="w-full btn-outline flex items-center justify-center gap-3"
              >
                Order via Instagram
              </button>
            </div>

            {/* Info */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Material</span>
                  <p className="text-foreground">100% Premium Cotton</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Care</span>
                  <p className="text-foreground">Machine wash cold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
