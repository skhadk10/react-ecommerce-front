import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProduct } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProduct(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data, "check");
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0)
      }
    });
  };
  const loadMore = () => {
    let toSkip=skip+limit
    getFilteredProduct(skip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data, "check");
        setFilteredResults([...filteredResults,...data.data]);
        setSize(data.size);
        setSkip(toSkip)
      }
    });
  };
  const loadMoreButton=()=>{
    
    return (
      size>0 && size>=limit && (<button onClick={loadMore}className="btn btn-warning mb-5">load more</button>)
    )
  }

  const handleFilters = (filters, filterBy) => {
    console.log(filters, "category");
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy == "price") {
      const prices = handlePrice(filters);
      newFilters.filters[filterBy] = prices;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };
//  to grav the array number inside of price[0,9], [10,19] like this
  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);
  return (
    <Layout
      className="container-fluid"
      title="Shop Page"
      description="Search and find books of your choice"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <div>
            <h4>Filter by price range</h4>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        {/* {JSON.stringify(filteredResults, "data")} */}

        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
            {loadMoreButton()}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Shop;
