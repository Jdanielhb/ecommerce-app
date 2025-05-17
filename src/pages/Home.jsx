import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFeaturedProducts } from '../api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getFeaturedProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="home">
            <section className="hero">
                <h1>Bienvenido a nuestra tienda</h1>
                <p>Descubre los mejores productos al mejor precio</p>
                <Link to="/products" className="shop-now-button">
                    Comprar ahora
                </Link>
            </section>

            <section className="featured-products">
                <h2 className='productos-destacados'>Productos destacados</h2>
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
