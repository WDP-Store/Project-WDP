import Carousel from "react-bootstrap/Carousel";
import ProductItem from './ProductItem';
const ProductCarouselV1 = ({ products }) => {
  const slice4Products = [];
  for (let i = 0; i < products.length; i += 4) {
    slice4Products.push(products.slice(i, i + 4));
  }
  return (
    <Carousel data-bs-theme="dark" interval={1500}>
      {slice4Products.map((chunk, index) => (
        <Carousel.Item key={index}>
          <div className="row">
            {chunk.map((p, index) => (
              <div key={index} className="col-3">
                <ProductItem product={p} />
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarouselV1;
