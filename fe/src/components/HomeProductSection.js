import HomeProductCard from "./HomeProductCard";
import { Carousel, CarouselItem } from "react-bootstrap";
import ProductImg from "../images/jhumka-img.png";

function HomeProductSection({ sectionTitle }) {
    return (
        <div className="jewellery_section">
            <div id="jewellery_main_slider" className="carousel slide" data-ride="carousel">
                <h1 className="fashion_taital">{sectionTitle}</h1>
                <Carousel>
                    <CarouselItem>
                        <div className="container">
                            <div className="fashion_section_2">
                                <div className="row">
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <div className="fashion_section_2">
                                <div className="row">
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="container">
                            <div className="fashion_section_2">
                                <div className="row">
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                    <div className="col-lg-4 col-sm-4">
                                        <HomeProductCard name={"Jumcas"} image={ProductImg} price={"$ 100"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
        </div>
    );
}

export default HomeProductSection;
