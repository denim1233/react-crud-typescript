import React, { useState } from 'react';
import { createProduct, Product } from '../services/ProductService';

// Categories with IDs based on the provided data
const categories = [
    { id: 1, name: "Beverages" },
    { id: 2, name: "Beverages" },
    { id: 3, name: "Skin Care" },
    { id: 4, name: "Towel" },
    { id: 5, name: "Laundry Products" },
    { id: 6, name: "Juice" },
    { id: 7, name: "Coffee" },
    { id: 8, name: "Office Supply" },
    { id: 9, name: "Shampoo" },
    { id: 10, name: "Soap" },
    { id: 11, name: "For Men" },
    { id: 12, name: "For Women" },
    { id: 13, name: "Detergent" }
];

interface AddProductProps {
    onClose: () => void;
    onProductAdded: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onClose, onProductAdded }) => {
    const [newProduct, setNewProduct] = useState<Product>({
        product_name: '',
        product_status: 1,
        category_name: '',
        product_price: 0,
        category_id: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            onProductAdded(); // Notify parent to refresh list
            onClose(); // Close modal
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <span style={closeButtonStyle} onClick={onClose}>&times;</span>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="product_name"
                            value={newProduct.product_name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <input
                            type="number"
                            name="product_status"
                            value={newProduct.product_status}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {`${category.id} - ${category.name}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="product_price"
                            value={newProduct.product_price}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <button type="submit" style={submitButtonStyle}>Add Product</button>
                </form>
            </div>
        </div>
    );
};

// Reusable styles
const modalStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
};

const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    color: '#aaa',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const submitButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default AddProduct;