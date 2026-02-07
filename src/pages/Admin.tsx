import { useState, useEffect, useRef } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product, ProductFormData } from '@/types/product';
import { Plus, Edit2, Trash2, X, Check, Lock, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ADMIN_PASSWORD = 'aura2024'; // Change this to your desired password
const AUTH_KEY = 'aura_admin_auth';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, storageError, clearStorageError } = useProducts();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    description: '',
    shortDescription: '',
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [],
    featured: false,
    hasDiscount: false,
    discountPercentage: 0,
  });

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!storageError) return;
    toast({
      title: 'لم يتم الحفظ',
      description: storageError,
      variant: 'destructive',
    });
    clearStorageError();
  }, [storageError]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      description: '',
      shortDescription: '',
      category: 'hoodie',
      sizes: ['S', 'M', 'L', 'XL'],
      images: [],
      featured: false,
      hasDiscount: false,
      discountPercentage: 0,
    });
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name ?? '',
      price: product.price ?? 0,
      description: product.description ?? '',
      shortDescription: product.shortDescription ?? '',
      category: product.category ?? 'hoodie',
      sizes: Array.isArray(product.sizes) ? product.sizes : ['S', 'M', 'L', 'XL'],
      images: Array.isArray(product.images) ? product.images : [],
      featured: product.featured ?? false,
      hasDiscount: product.hasDiscount ?? false,
      discountPercentage: product.discountPercentage ?? 0,
    });
    setIsEditing(product.id);
    setIsAdding(false);
    setTimeout(() => formPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.hasDiscount && (formData.discountPercentage ?? 0) <= 0) {
      toast({
        title: 'Error',
        description: 'Please set a valid discount percentage',
        variant: 'destructive',
      });
      return;
    }

    if (isEditing) {
      updateProduct(isEditing, formData);
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      });
    } else {
      addProduct(formData);
      toast({
        title: 'Success',
        description: 'Product added successfully',
      });
    }
    
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast({
        title: 'Deleted',
        description: 'Product deleted successfully',
      });
    }
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageUrl = (url: string) => {
    if (url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url.trim()],
      }));
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, dataUrl],
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md fade-in-up">
          <div className="glass-card rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground mb-8">
              Enter password to access the dashboard
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className="admin-input text-center"
                  placeholder="Enter password"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-destructive text-sm mt-2">{passwordError}</p>
                )}
              </div>
              <button type="submit" className="w-full btn-primary">
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-24 md:pt-28 pb-16">
      <div className="container-custom px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your products
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setIsAdding(true);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Form */}
          {(isAdding || isEditing) && (
            <div ref={formPanelRef} key={isEditing ?? 'new'} className="lg:col-span-1 fade-in-up">
              <div className="glass-card rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="admin-label">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="admin-input"
                      placeholder="Product name"
                    />
                  </div>
                    <label className="admin-label">Discount</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, hasDiscount: !prev.hasDiscount }))}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          formData.hasDiscount 
                            ? 'bg-primary border-primary text-primary-foreground' 
                            : 'border-border'
                        }`}
                      >
                        {formData.hasDiscount && <Check size={14} />}
                      </button>
                      <label className="text-sm text-foreground cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, hasDiscount: !prev.hasDiscount }))}>
                        Apply Discount
                      </label>
                    </div>

                    {formData.hasDiscount && (
                      <div className="mt-3">
                        <label className="admin-label">Discount Percentage (%)</label>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={formData.discountPercentage}
                          onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: Number(e.target.value) }))}
                          className="admin-input"
                          placeholder="e.g. 10"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Enter a value between 1 and 100</p>
                      </div>
                    )}


                  <div>
                    <label className="admin-label">Price *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="admin-input"
                      placeholder="e.g. 499 (EGP)"
                    />
                  </div>

                  <div>
                    <label className="admin-label">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'hoodie' | 'pants' }))}
                      className="admin-input"
                    >
                      <option value="hoodie">Hoodie</option>
                      <option value="pants">Milton Pants</option>
                    </select>
                  </div>

                  <div>
                    <label className="admin-label">Short Description</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                      className="admin-input"
                      placeholder="Brief product description"
                    />
                  </div>

                  <div>
                    <label className="admin-label">Full Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="admin-input min-h-[100px] resize-none"
                      placeholder="Detailed product description"
                    />
                  </div>

                  <div>
                    <label className="admin-label">Sizes</label>
                    <div className="flex flex-wrap gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`size-badge ${formData.sizes.includes(size) ? 'size-badge-selected' : ''}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="admin-label">Images</label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Paste image URL or upload from your device
                    </p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        id="imageUrl"
                        className="admin-input flex-1"
                        placeholder="https://... or upload below"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleImageUrl((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('imageUrl') as HTMLInputElement;
                          handleImageUrl(input.value);
                          input.value = '';
                        }}
                        className="px-4 bg-secondary hover:bg-secondary/80 rounded-md transition-colors shrink-0"
                      >
                        Add
                      </button>
                    </div>
                    <label className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors text-sm text-muted-foreground">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        className="hidden"
                      />
                      Upload from device
                    </label>
                    {formData.images.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.images.map((img, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <img src={img} alt="" className="w-10 h-10 object-cover rounded" />
                            <span className="flex-1 truncate text-muted-foreground">{img}</span>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        formData.featured 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'border-border'
                      }`}
                    >
                      {formData.featured && <Check size={14} />}
                    </button>
                    <label className="text-sm text-foreground cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}>
                      Featured Product
                    </label>
                  </div>

                  <button type="submit" className="w-full btn-primary">
                    {isEditing ? 'Update Product' : 'Add Product'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Products List */}
          <div className={`${(isAdding || isEditing) ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`glass-card rounded-lg overflow-hidden fade-in-up stagger-${(index % 5) + 1}`}
                >
                  <div className="aspect-square bg-secondary">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-foreground">{product.name}</h3>
                      {product.hasDiscount && product.discountPercentage ? (
                        (() => {
                          const discounted = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));
                          return (
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground line-through mr-2">{product.price} EGP</div>
                              <div className="text-primary font-semibold">{discounted} EGP</div>
                            </div>
                          );
                        })()
                      ) : (
                        <span className="text-primary font-semibold">{product.price} EGP</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs bg-secondary rounded text-muted-foreground">
                        {product.category}
                      </span>
                      {product.featured && (
                        <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="flex-1 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 py-2 text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products yet. Add your first product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
