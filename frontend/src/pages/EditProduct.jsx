import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import '../css/pages/EditProduct.css';

export default function EditProduct() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, loading: authLoading } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        img: ''
    });

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                navigate('/login?redirect=true');
                return;
            }
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/store/product/${id}`);
                    const productData = response.data;
                    setProduct(productData);
                    setFormData({
                        name: productData.name || '',
                        description: productData.description || '',
                        price: productData.price?.toString() || '',
                        img: productData.img || ''
                    });
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch product');
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [authLoading, user, id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/store/product/${id}`,
                formData,
                { withCredentials: true }
            );
            navigate(`/product/${id}`);
        } catch (err) {
            setError('Failed to update product');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (authLoading) return <div>Loading authentication...</div>;
    if (loading) return <div>Loading product...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="edit-product">
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="img">Image URL</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => navigate(`/product/${id}`)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}