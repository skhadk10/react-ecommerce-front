import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { listRelated, read } from "./apiCore.js";
import Card from "./Card.js";
import { useParams } from "react-router-dom";
const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
const params=useParams()
const {productId}=params
  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);

  return (
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fliud"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Relatedproduct</h4>
          {/* {JSON.stringify(relatedProduct)} */}
          {relatedProduct.map((p, i) => (
            <div className="mb-3">
              <Card  key={i} product={p}  />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
