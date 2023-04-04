import heartIconOutline from "../images/heart-outlined.svg";
import heartIconFilled from "../images/heart-filled.svg";
import { Link } from "react-router-dom";
import routes from "../routes/routes";
import { updateWishlist } from "../Services/Wishlist";
import { useState } from "react";
import { getAccessToken } from "../Util/helpers";

export default function Card({ product, getProducts }) {
  let token = getAccessToken();

  // const [isWishlist, setIsWishlist] = useState(product?.isWishlist);

  const wishlistHandler = async (productId) => {
    const data = await updateWishlist(productId);
    await getProducts();
    // setIsWishlist(prev => prev === 0 ? 1 : 0);
  };
  return (
    <div className="card mb-3"
    >
      <div className="row g-0">
        <div className="col-md-4">
          <div className="img-wrapper p-relative">
            {token !== null && (
              <img
                className="img-fluid p-absolute"
                src={product?.isWishlist == 0 ? heartIconOutline : heartIconFilled}
                onClick={() => wishlistHandler(product?._id)}
                alt="Add to wishlist"
              />
            )}
            <img
              src={product?.image}
              className="img-fluid rounded-start w-100 h-100"
              alt="product"
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="top-text d-flex align-items-center justify-content-between">
                  <h3 className="card-title">{product?.title}</h3>
                  <div className="card-title">
                    <span>Token Price</span>
                    <h3>USD {product?.token_price}.00</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-4">
                Type: <br /> <b>{product?.market_type}</b>
              </div>
              <div className="col-4">
                Monetization: <br /> <b>{product?.monetization}</b>
              </div>
              <div className="col-4">
                Net Profit: <br /> <b>USD $0.00 p/month</b>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="card-text py-2">
                  {product?.description}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Link to={`${routes.marketPlace.index}/${product?._id}`}>
                  <button
                    className="card-text px-5 py-2 text-light"
                    style={{ border: "none", backgroundColor: "#294378", float: "right" }}
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}