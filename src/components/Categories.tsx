import { Link } from 'react-router-dom';
import hoodie3 from '@/assets/hoodie-3.jpg';
import pants1 from '@/assets/pants-1.jpg';

const Categories = () => {
  const categories = [
    {
      name: 'Hoodies',
      description: 'Premium oversized hoodies crafted from the finest cotton',
      image: hoodie3,
      link: '/shop?category=hoodie',
    },
    {
      name: 'Milton Pants',
      description: 'Comfortable sweatpants designed for everyday luxury',
      image: pants1,
      link: '/shop?category=pants',
    },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-custom px-4">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Shop By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className={`group relative aspect-[4/3] overflow-hidden rounded-lg fade-in-up stagger-${index + 1}`}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4 max-w-xs">
                  {category.description}
                </p>
                <span className="text-primary text-sm font-medium tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
