import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import '../css/pages/ProductDetail.css';
import ConfirmModal from '../components/ConfirmModal';

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/store/product/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            console.log(id);
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/store/product/${id}`);
            window.location.href = '/';
        } catch (err) {
            setError('Failed to delete product');
        }
        setIsModalOpen(false);
    };

    const handleAddToCart = () => {
        console.log('Added to cart:', product.name);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <>
            <div className="product-detail">
                <div className="product-image">
                    <img src={product.img} alt={product.name} />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="description">{product.description}</p>
                    <p className="price">${product.price.toFixed(2)}</p>
                    
                    <div className="actions">
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        
                        {user?.role === 'admin' && (
                            <div className="admin-actions">
                                <button className="edit" onClick={() => window.location.href = `/product/edit/${id}`}>
                                    Edit
                                </button>
                                <button className="delete" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this product?"
            />
        </>
    );
}