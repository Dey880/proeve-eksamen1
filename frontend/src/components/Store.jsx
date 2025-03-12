import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/components/Store.css';

export default function Store() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/store/category`),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/store/product`)
                ]);

                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="store-container">Loading...</div>;
    if (error) return <div className="store-container">{error}</div>;

    return (
        <div className="store-container">
            <section className="categories-section">
                <h2 className="section-title">Shop by Category</h2>
                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link 
                            to={`/category/${category._id}`} 
                            key={category._id}
                            className="category-card"
                        >
                            <img src={category.img} alt={category.name} />
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="products-section">
                <h2 className="section-title">Featured Products</h2>
                <div className="products-grid">
                    {products.map((product) => (
                        <Link 
                            to={`/product/${product._id}`} 
                            key={product._id}
                            className="product-card"
                        >
                            <img src={product.img} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">${product.price.toFixed(2)}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}