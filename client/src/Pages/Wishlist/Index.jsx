import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { getWishlists, truncateWishList } from "../../Services/Wishlist";

export default function Wishlist() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const products = await getWishlists();
    setProducts(products?.data);
  };
  useEffect(() => {
    getProducts();
  }, [products?.length]);

  console.log(17, products);

  const clearWishtlist = async () => {
    const data = await truncateWishList();
    console.log(21, data);
    await getProducts();
  };
  return (
    <div className="market-place">
      <div className="container">
        <div className="row py-5">
          <h1 className="heading-lvl-one">My Wishlist</h1>
        </div>
        {products?.length == 0 ? (
          <div className="row py-5">
            <h1 className="heading-lvl-one text-center">Your Wishlist is Empty !!</h1>
          </div>
        ) : (
          <>
            <div className="row py-5">
              <h5 className="heading-lvl-one text-danger text-end">
                <span style={{ cursor: "pointer" }} onClick={clearWishtlist}>Clear Wishlist</span>
              </h5>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-7 col-sm-8 col-11 mx-auto text-start">
                {products?.length > 0 && products?.map((product, index) => (
                  <Card product={product?.product} getProducts={getProducts} key={index} />
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};