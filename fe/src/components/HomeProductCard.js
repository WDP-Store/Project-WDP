import { Link } from "react-router-dom";

function HomeProductCard({ name, price, image }) {
    return (
        <div className="box_main">
            <h4 className="shirt_text">{name}</h4>
            <p className="price_text">
                Start Price <span style={{ color: "#262626" }}>{price}</span>
            </p>
            <div className="jewellery_img">
                <img src={image} alt="product" />
            </div>
            <div className="btn_main">
                <div className="buy_bt">
                    <Link to="/product">Buy Now</Link>
                </div>
                <div className="seemore_bt">
                    <Link to="/product">See More</Link>
                </div>
            </div>
        </div>
    );
}

export default HomeProductCard;
