import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { API_PRODOTTI } from './api/api';
import SearchBar from './BarraRicerca';
import { API_CARRELLO, API_LOGIN } from '../api';

type Product = {
  productId: number;
  productName: string;
  categoryId: string;
  unitPrice: number;
  unitsInStock: number;
};

const ProductItem: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const img = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];

  const imgIndex = index % img.length;
  const imgSrc = `./immagini/${img[imgIndex]}`;

  // DA RISOLVERE LA STINGA DEL TOKEN ARRIVA
  // const [token, setToken] = useState<string>('');

  // const getToken = async () => {
  //   try {
  //     const response = await axios.get(API_LOGIN, {
  //       headers: {
  //         Authorization: 'Basic pippopaperino@gmail.it:1234',
  //       },
  //     });
  //     setToken(response.data);
  //   } catch (error) {
  //     console.log(error);
  //     setToken('');
  //   }
  // };

  async function handleAddToCart(product: Product) {
    try {
      // await getToken();
      // console.log(token);
      const data = {
        idCarrello: 0,
        idProdotto: product.productId,
        prodotto: product.productName,
        quantita: 1,
        prezzo: product.unitPrice,
        tokenCliente: 'prova.finale.react',
      };

      const response = await axios.post(API_CARRELLO, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Errore durante l'aggiunta del prodotto al carrello.");
    }
  }

  return (
    <div className="col-md-4">
      <Card>
        <Card.Body>
          <Card.Img variant="top" src={imgSrc} />
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>{product.unitsInStock} pezzi disponibili</Card.Text>
          <Card.Text>PREZZO: {product.unitPrice} €</Card.Text>
          <Button variant="primary" onClick={() => handleAddToCart(product)}>
            Aggiungi al carrello
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    axios
      .get<Product[]>(API_PRODOTTI)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data.filter((product) => product.unitsInStock !== null && product.unitsInStock > 0));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setFilteredProducts(products.filter((product) => product.productName.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  return (
    <div>
      <h2>Prodotti</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {filteredProducts.map((product, index) => (
          <ProductItem key={product.productId} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
