import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-bold tracking-[0.3em] text-primary">
              AURA
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Premium streetwear essentials crafted with precision and passion. 
              Elevate your everyday style with our curated collection of hoodies and Milton sweatpants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-primary mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=hoodie" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=pants" className="text-muted-foreground hover:text-foreground transition-colors">
                  Milton Pants
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-primary mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/aura50348?igsh=MTcydTlocXI2ZnJocA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/201271163626"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@aura.eg4?_r=1&_t=ZS-93hMiJ6Mpve"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {/* Use the Instagram icon as a placeholder for TikTok if TikTok icon not available */}
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AURA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
