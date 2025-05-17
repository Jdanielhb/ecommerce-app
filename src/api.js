import axios from 'axios';

// API de productos
const PRODUCTS_API = 'https://fakestoreapi.com';

// Usuarios válidos predefinidos
const validUsers = [
    {
        username: "admin",
        password: "admin123",
        name: "Administrador",
        email: "admin@tienda.com",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        username: "cliente",
        password: "cliente123",
        name: "Cliente 1",
        email: "cliente@tienda.com",
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
        username: "invitado",
        password: "invitado123",
        name: "Invitado",
        email: "invitado@tienda.com",
        avatar: "https://i.pravatar.cc/150?img=5"
    }
];

export const getProducts = async () => {
    try {
        const response = await axios.get(`${PRODUCTS_API}/products`);
        return response.data.map(product => ({
            ...product,
            maxStock: 20,
            currentStock: Math.min(20, product.rating?.count || 20)
        }));
    } catch (error) {
        throw new Error('Error al obtener productos');
    }
};

export const getFeaturedProducts = async () => {
    try {
        const response = await axios.get(`${PRODUCTS_API}/products?limit=4`);
        return response.data.map(product => ({
            ...product,
            maxStock: 20,
            currentStock: Math.min(20, product.rating?.count || 20)
        }));
    } catch (error) {
        throw new Error('Error al obtener productos destacados');
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${PRODUCTS_API}/products/${id}`);
        return {
            ...response.data,
            maxStock: 20,
            currentStock: Math.min(20, response.data.rating?.count || 20)
        };
    } catch (error) {
        throw new Error('Error al obtener el producto');
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${PRODUCTS_API}/products/categories`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener categorías');
    }
};

// Autenticación simulada
export const loginUser = async (credentials) => {
    try {
        // Simulamos un pequeño retraso para parecer real
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = validUsers.find(u =>
            (u.username === credentials.username || u.email === credentials.username) &&
            u.password === credentials.password
        );

        if (user) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, user };
        }

        throw new Error('Usuario o contraseña incorrectos');
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};

export const logoutUser = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
