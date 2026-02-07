import { Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const { getFeaturedProducts } = useProducts();
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Curated Selection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Featured Products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product, index) => (
            <div key={product.id} className={`stagger-${index + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 fade-in-up">
          <Link to="/shop" className="btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
