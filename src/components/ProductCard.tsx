import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card fade-in-up">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium uppercase tracking-wide bg-background/80 backdrop-blur-sm rounded-full">
          {product.category === 'hoodie' ? 'Hoodie' : 'Milton'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Sizes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="px-2 py-0.5 text-xs text-muted-foreground border border-border/50 rounded"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          {product.hasDiscount && product.discountPercentage ? (
            (() => {
              const discounted = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));
              return (
                <div className="text-left">
                  <div className="text-sm text-muted-foreground line-through">{product.price} EGP</div>
                  <div className="text-xl font-semibold text-primary">{discounted} EGP</div>
                </div>
              );
            })()
          ) : (
            <span className="text-xl font-semibold text-primary">{product.price} EGP</span>
          )}
          <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
