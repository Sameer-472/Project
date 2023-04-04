import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../../Services/Product";
import DetailCard from "../../Components/DetailCard";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const getProductData = async () => {
    const productData = await getProduct(id);
    setProduct(productData?.data);
  };
  useEffect(() => {
    getProductData();
  }, [product?._id, id]);

  return (
    <div className="product-detail py-5">
      <div className="container">
        <div className="row py-5">
          <h1 className="heading-lvl-one">{product?.title}</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-7 col-sm-8 col-11 mx-auto text-start">
            <DetailCard product={product} getProductData={getProductData} />
          </div>
        </div>
      </div>
    </div>
  );
}