import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Star, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductModal } from '../../components/admin/ProductModal';
import { Product } from '../../types';
import { Link } from 'react-router-dom';

export const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct, updateProduct, categories } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchTerm.trim() ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you wish to delete "${name}" from the store catalog?`)) {
      deleteProduct(id);
    }
  };

  const toggleProductActive = (product: Product) => {
    updateProduct(product.id, { isActive: !product.isActive });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1B]">
            Product Management
          </h1>
          <p className="text-xs sm:text-sm text-[#89857E] mt-1">
            Create, modify, and monitor inventory for all VogueThread garments ({products.length} total)
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#20392F] hover:bg-[#152720] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D8] shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#89857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by title or SKU..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-3 py-2 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#89857E]">Category:</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="text-xs bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl py-2 px-3 font-semibold focus:outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F5F0] text-[#1D1D1B] uppercase tracking-wider font-bold border-b border-[#E8E2D8]">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-[#F8F5F0]/60 transition-colors">
                  {/* Product Info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#ECE6DC] shrink-0 border border-[#E8E2D8]">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link
                          to={`/product/${product.id}`}
                          target="_blank"
                          className="font-bold text-[#1D1D1B] hover:text-[#20392F] line-clamp-1 flex items-center gap-1 group"
                        >
                          <span>{product.name}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-[11px] text-[#89857E] mt-0.5 font-mono">
                          {product.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md text-[11px]">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-bold text-[#1D1D1B]">₹{product.discountedPrice.toLocaleString()}</span>
                      {product.originalPrice > product.discountedPrice && (
                        <span className="text-[11px] text-gray-400 line-through block">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${product.stock > 10 ? 'text-green-700' : product.stock > 0 ? 'text-amber-700' : 'text-red-600'}`}>
                      {product.stock} units
                    </span>
                  </td>

                  {/* Badges */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {product.isBestseller && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          Bestseller
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                          New
                        </span>
                      )}
                      {product.discountPercentage > 0 && (
                        <span className="text-[10px] bg-[#C95745]/15 text-[#C95745] font-bold px-1.5 py-0.5 rounded">
                          {product.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleProductActive(product)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                        product.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="p-1.5 text-gray-600 hover:text-[#20392F] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 text-gray-400 hover:text-[#C95745] hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
};
