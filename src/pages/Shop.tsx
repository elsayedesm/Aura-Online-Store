import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();
  const categoryFilter = searchParams.get('category') as 'hoodie' | 'pants' | null;

  const filteredProducts = useMemo(() => {
    if (categoryFilter) {
      return products.filter(p => p.category === categoryFilter);
    }
    return products;
  }, [products, categoryFilter]);

  const setCategory = (category: 'hoodie' | 'pants' | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <section className="min-h-screen pt-24 md:pt-28 pb-16">
      <div className="container-custom px-4">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {categoryFilter === 'hoodie' 
              ? 'Hoodies' 
              : categoryFilter === 'pants' 
                ? 'Milton Pants' 
                : 'All Products'}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover our curated collection of premium streetwear essentials.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12 fade-in-up stagger-1">
          <button
            onClick={() => setCategory(null)}
            className={`px-6 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
              !categoryFilter 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategory('hoodie')}
            className={`px-6 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
              categoryFilter === 'hoodie' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Hoodies
          </button>
          <button
            onClick={() => setCategory('pants')}
            className={`px-6 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
              categoryFilter === 'pants' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Milton Pants
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className={`stagger-${(index % 5) + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
