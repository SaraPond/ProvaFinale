import React, { useState } from 'react';
import axios from 'axios';
import { API_CARRELLO } from '../api';

interface Product {
  productId: number;
  productName: string;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(API_CARRELLO, {
        headers: {
          Authorization: 'Bearer prova.finale.react',
        },
      })
      .then((response) => {
        setProducts(response.data);
        setShowProducts(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {!showProducts ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Carrello</h2>
          <ul>
            {products.map((product) => (
              <li key={product.productId}> {product.productName} </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Login;
