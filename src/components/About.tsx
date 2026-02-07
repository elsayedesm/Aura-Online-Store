const About = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4">
        <div className="max-w-3xl mx-auto text-center fade-in-up">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-foreground">
            About AURA
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Born from a passion for minimalist design and premium comfort, AURA represents 
            the intersection of streetwear culture and timeless elegance. We believe in 
            creating pieces that transcend trends – garments that feel as good as they look.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every hoodie and Milton sweatpant in our collection is crafted with intention, 
            using only the finest materials and sustainable practices. This is streetwear 
            refined – your everyday uniform, elevated.
          </p>
          <div className="mt-12 flex justify-center gap-12">
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary">100%</span>
              <span className="text-sm text-muted-foreground mt-1">Premium Cotton</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary">Local</span>
              <span className="text-sm text-muted-foreground mt-1">Production</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary">2024</span>
              <span className="text-sm text-muted-foreground mt-1">Established</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
