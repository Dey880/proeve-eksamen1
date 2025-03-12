import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/pages/CategoryPage.css';

export default function CategoryPage() {
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryResponse, productsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/store/category/${id}`),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/store/product`)
                ]);

                setCategory(categoryResponse.data);
                // Filter products by category
                const categoryProducts = productsResponse.data.filter(
                    product => product.category === id
                );
                setProducts(categoryProducts);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!category) return <div>Category not found</div>;

    return (
        <div className="category-page">
            <h1>{category.name}</h1>
            <p className="category-description">{category.description}</p>
            
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
        </div>
    );
}