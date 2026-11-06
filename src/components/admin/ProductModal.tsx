import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'One Size'];

const PRESET_COLORS = [
  { name: 'Forest Green', hex: '#20392F' },
  { name: 'Warm Cream', hex: '#E9DFD3' },
  { name: 'Onyx Black', hex: '#1C1C1A' },
  { name: 'Sand Beige', hex: '#D7C7B3' },
  { name: 'Crisp White', hex: '#FFFFFF' },
  { name: 'Navy Blue', hex: '#1B263B' },
  { name: 'Burnt Ochre', hex: '#C95745' }
];

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit
}) => {
  const { addProduct, updateProduct, categories } = useStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hoodies');
  const [gender, setGender] = useState<'Men' | 'Women' | 'Unisex'>('Unisex');
  const [originalPrice, setOriginalPrice] = useState<number>(2999);
  const [discountedPrice, setDiscountedPrice] = useState<number>(899);
  const [stock, setStock] = useState<number>(25);
  const [rating, setRating] = useState<number>(4.8);
  const [isBestseller, setIsBestseller] = useState<boolean>(false);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [sizes, setSizes] = useState<string[]>(['M', 'L', 'XL']);
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([
    { name: 'Forest Green', hex: '#20392F' }
  ]);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setGender(productToEdit.gender);
      setOriginalPrice(productToEdit.originalPrice);
      setDiscountedPrice(productToEdit.discountedPrice);
      setStock(productToEdit.stock);
      setRating(productToEdit.rating);
      setIsBestseller(productToEdit.isBestseller);
      setIsNewArrival(productToEdit.isNewArrival);
      setIsActive(productToEdit.isActive);
      setSizes(productToEdit.sizes || ['M']);
      setColors(productToEdit.colors || [{ name: 'Standard', hex: '#20392F' }]);
      setImages(productToEdit.images || []);
    } else {
      // Default reset
      setName('');
      setDescription('');
      setCategory('Hoodies');
      setGender('Unisex');
      setOriginalPrice(2499);
      setDiscountedPrice(999);
      setStock(30);
      setRating(4.8);
      setIsBestseller(false);
      setIsNewArrival(true);
      setIsActive(true);
      setSizes(['M', 'L', 'XL']);
      setColors([{ name: 'Forest Green', hex: '#20392F' }]);
      setImages(['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85']);
    }
    setError(null);
  }, [productToEdit, isOpen]);

  // Handle local image file upload via FileReader (converts to base64 data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages(prev => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const toggleSize = (size: string) => {
    setSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleAddPresetColor = (preset: { name: string; hex: string }) => {
    if (!colors.some(c => c.name === preset.name)) {
      setColors(prev => [...prev, preset]);
    }
  };

  const handleRemoveColor = (index: number) => {
    setColors(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a product name.');
      return;
    }
    if (images.length === 0) {
      setError('Please provide at least one product image.');
      return;
    }
    if (sizes.length === 0) {
      setError('Please select at least one available size.');
      return;
    }

    const calculatedDiscount = originalPrice > 0
      ? Math.max(0, Math.round(((originalPrice - discountedPrice) / originalPrice) * 100))
      : 0;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        name: name.trim(),
        slug,
        description: description.trim(),
        category,
        gender,
        originalPrice: Number(originalPrice),
        discountedPrice: Number(discountedPrice),
        discountPercentage: calculatedDiscount,
        stock: Number(stock),
        rating: Number(rating),
        isBestseller,
        isNewArrival,
        isActive,
        sizes,
        colors,
        images
      });
    } else {
      addProduct({
        name: name.trim(),
        slug,
        description: description.trim() || 'Premium tailored fashion garment from the VogueThread studio.',
        shortDescription: description.slice(0, 80),
        category,
        gender,
        originalPrice: Number(originalPrice),
        discountedPrice: Number(discountedPrice),
        discountPercentage: calculatedDiscount,
        stock: Number(stock),
        rating: Number(rating),
        reviewsCount: 1,
        isBestseller,
        isNewArrival,
        isActive,
        sizes,
        colors,
        images,
        sku: `VT-${category.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        details: [
          'Crafted with 100% sustainable fine cotton fibers',
          'Pre-washed tailored modern fit',
          'Bar-tack reinforced pressure points'
        ]
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  const currentDiscount = originalPrice > 0
    ? Math.max(0, Math.round(((originalPrice - discountedPrice) / originalPrice) * 100))
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden text-left relative z-10">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#20392F] text-white flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold">
              {productToEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onClose} className="p-1.5 text-white/70 hover:text-white rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl flex items-center gap-1.5 font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Italian Wool Double-Breasted Trench"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Gender Target
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as any)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the fabric, tailoring silhouette, and styling recommendation..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                />
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1D1D1B] uppercase mb-1">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={originalPrice}
                  onChange={e => setOriginalPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-white border border-[#E8E2D8] rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1D1D1B] uppercase mb-1">
                  Discounted Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={discountedPrice}
                  onChange={e => setDiscountedPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-white border border-[#E8E2D8] rounded-xl font-bold text-[#20392F]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1D1D1B] uppercase mb-1">
                  Calculated Discount
                </label>
                <div className="p-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs font-bold text-[#C95745]">
                  {currentDiscount}% OFF
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1D1D1B] uppercase mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={e => setStock(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-white border border-[#E8E2D8] rounded-xl font-bold"
                />
              </div>
            </div>

            {/* Images Manager */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider">
                Product Photography ({images.length} added) *
              </label>

              {/* Upload buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer bg-[#20392F] hover:bg-[#152720] text-white px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Local Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex-1 flex gap-2 min-w-[240px]">
                  <input
                    type="url"
                    placeholder="Or paste external image URL..."
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    className="flex-1 text-xs p-2.5 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="bg-[#EAE4D9] text-[#1D1D1B] px-3.5 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Thumbnails row */}
              {images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto py-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-24 rounded-xl overflow-hidden border border-[#E8E2D8] shrink-0 bg-[#ECE6DC] group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-80 hover:opacity-100"
                        title="Delete image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 inset-x-1 bg-[#20392F] text-white text-[8px] font-bold text-center rounded">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sizes & Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Sizes */}
              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_SIZES.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSize(sz)}
                      className={`text-xs px-2.5 py-1 rounded-xl border font-semibold transition-all ${
                        sizes.includes(sz) ? 'bg-[#20392F] text-white border-[#20392F]' : 'bg-[#F8F5F0] text-[#1D1D1B]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-2">
                  Select Colors
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map(c => {
                    const isSelected = colors.some(col => col.name === c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setColors(prev => prev.filter(col => col.name !== c.name));
                          } else {
                            handleAddPresetColor(c);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs border ${
                          isSelected ? 'border-[#20392F] bg-[#20392F]/10 font-bold' : 'border-[#E8E2D8] bg-[#F8F5F0]'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Flags & Toggles */}
            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#E8E2D8] text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={e => setIsBestseller(e.target.checked)}
                  className="w-4 h-4 accent-[#20392F]"
                />
                <span>Feature as Bestseller</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={e => setIsNewArrival(e.target.checked)}
                  className="w-4 h-4 accent-[#20392F]"
                />
                <span>Mark as New Arrival</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-[#20392F]"
                />
                <span>Active / Published on Storefront</span>
              </label>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-[#E8E2D8] flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-[#E8E2D8] text-xs font-semibold text-[#89857E] hover:text-[#1D1D1B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#20392F] hover:bg-[#152720] text-white px-8 py-2.5 rounded-full text-xs font-bold shadow-md transition-all"
              >
                {productToEdit ? 'Save Changes' : 'Publish Product'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
