import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

const App: React.FC = () => {
    return (
        <Router>
           <Routes>
                <Route path="/" element={<ProductList />} />
            </Routes>
        </Router>
    );
};

export default App;