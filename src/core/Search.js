import React, { useEffect, useState } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, search, results, searched, category } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const searchedForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            onChange={handleChange("search")}
            className="form-control"
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  // adi state ma vako search true athawa search gareko xa vanye api ma patha
  // ra ayeko data lai chai result ko array ma patha
  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };


  const searchedProducts = (results = []) => {
    
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <div className="row">
          {JSON.stringify(results)}
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  // it populae the massgae if product available or not o how many availble
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products `;
    }
    if (searched && results.length < 1) {
      return `No products found `;
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };
  const handleChange = (name) => (event) => {
    console.log(name);
    setData({ ...data, [name]: event.target.value, searched: false });
  };
  return (
    <div>
      <div className="container mb-3">{searchedForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
