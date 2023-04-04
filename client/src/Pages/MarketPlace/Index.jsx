import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { getAllProducts } from "../../Services/Product";

export default function MarketPlace() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const products = await getAllProducts();
    setProducts(products?.data);
  };
  useEffect(() => {
    getProducts();
  }, [products?.length]);

  return (
    <div className="market-place">
      <div className="container">
        <div className="row py-5">
          <h1 className="heading-lvl-one">Market Place Page</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-7 col-sm-8 col-11 mx-auto text-start">
            {products?.length > 0 && products?.map((product, index) => (
              <Card product={product} getProducts={getProducts} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};