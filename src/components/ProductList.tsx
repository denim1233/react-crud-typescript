import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, Product } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const handleEdit = (id: number) => {
        setSelectedProductId(id);
        setIsEditModalOpen(true);
    };

    const handleAddProduct = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Product List</h1>
            <button
                onClick={handleAddProduct}
                style={{
                    padding: '10px 20px',
                    marginBottom: '20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Add Product
            </button>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Status</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Category</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Price</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.product_id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px' }}>{product.product_name}</td>
                                <td style={{ padding: '10px' }}>
                                    {product.product_status === 1 ? 'Active' : 'Inactive'}
                                </td>
                                <td style={{ padding: '10px' }}>{product.category_name}</td>
                                <td style={{ padding: '10px' }}>${product.product_price.toFixed(2)}</td>
                                <td style={{ padding: '10px' }}>
                                    <button
                                        onClick={() => handleEdit(product.product_id!)}
                                        style={{
                                            padding: '5px 10px',
                                            marginRight: '10px',
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.product_id!)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ padding: '20px', textAlign: 'center' }}>
                                No products available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <AddProduct
                    onClose={handleCloseAddModal}
                    onProductAdded={fetchProducts}
                />
            )}

            {/* Edit Product Modal */}
            {isEditModalOpen && selectedProductId && (
                <EditProduct
                    productId={selectedProductId}
                    onClose={handleCloseEditModal}
                    onProductUpdated={fetchProducts}
                />
            )}
        </div>
    );
};

export default ProductList;