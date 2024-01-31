import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProductPhoto, getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <div>
      <Layout
        className="container-fluid"
        title="Home Page"
        description="Node React E-commerce App"
      >
        <Search />
        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product, i) => {
            return (
              <div key={i} className="col-4 mb-3">
                <Card  product={product} />
              </div>
            );
          })}
        </div>
        <h2 className="mb-4">Best Arrival</h2>
        <div className="row">
          {productsByArrival.map((product, i) => {
            return (
              <div key={i} className="col-4 mb-3">
                <Card  product={product} />
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
};

export default Home;
