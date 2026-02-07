import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="AURA Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 py-20 mt-16">
        <div className="max-w-2xl fade-in">
          <span className="inline-block text-sm tracking-[0.4em] uppercase text-primary/80 mb-6 slide-in-left">
            Premium Streetwear
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 fade-in-up">
            <span className="text-gradient">AURA</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-lg fade-in-up stagger-2">
            Elevate your everyday with our curated collection of premium hoodies and Milton sweatpants. 
            Designed for comfort, crafted for style.
          </p>
          <div className="flex flex-wrap gap-4 fade-in-up stagger-3">
            <Link to="/shop" className="btn-primary">
              Shop Collection
            </Link>
            <Link to="/shop?category=hoodie" className="btn-outline">
              Explore Hoodies
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in stagger-5">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
