import './Home.css';
//Product Image Import
import ProductImg01 from '../../assets/ChargingAdapter.jpeg';
import ProductImg02 from '../../assets/boAtXtend.jpeg';
import ProductImg03 from '../../assets/EchoDot.jpeg';
import ProductImg04 from '../../assets/OppoA31.jpeg';
import ProductImg05 from '../../assets/curvedMonitor.jpeg';
import amazonCoverBackground from '../../assets/amazonCoverBackdrop.jpeg';
import Product from "../Product/Product";

const Home = () => {
    //Temporary data
    //TODO: Change the data to be taken from API (Backend)
    const productData01 = {
        id: 1,
        title:"AmazonBasics High Power 65W Mobile/Laptop Charger Dual Port Output with Type-C Charging Cable (White)",
        price:1799,
        image:ProductImg01,
        rating: 4
    }
    const productData02 = {
        id: 2,
        title:"boAt Xtend Smartwatch with Alexa Built-in, 1.69” HD Display, Multiple Watch Faces, Stress Monitor, " +
            "Heart & SpO2 Monitoring, 14 Sports Modes, Sleep Monitor, 5 ATM & 7 Days Battery(Pitch Black)",
        price:2999,
        image:ProductImg02,
        rating: 3
    }
    const productData03 = {
        id: 3,
        title:"Echo Dot (3rd Gen), Certified Refurbished, Black – Improved smart speaker with Alexa –" +
            " Like new, backed with 1-year warranty",
        price:2999,
        image:ProductImg03,
        rating: 3
    }
    const productData04 = {
        id: 4,
        title:"OPPO A31 (Mystery Black, 6GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers",
        price:12999,
        image:ProductImg04,
        rating: 3
    }
    const productData05 = {
        id: 5,
        title:"Samsung 34-inch (86.40cm) Curved Monitor- 21:9 Ultrawide QLED, Thunderbolt 3 Port- LC34J791WTWXXL, Gray",
        price:80000,
        image:ProductImg05,
        rating: 5
    }
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src={amazonCoverBackground} alt="backdrop"/>
                <div className="home__row">
                    <Product
                        id={productData01.id}
                        title={productData01.title}
                        price={productData01.price}
                        image={productData01.image}
                        rating={productData01.rating}
                    />
                    <Product
                        id={productData02.id}
                        title={productData02.title}
                        price={productData02.price}
                        image={productData02.image}
                        rating={productData02.rating}
                    />
                </div>
                <div className="home__row">
                    <Product
                        id={productData03.id}
                        title={productData03.title}
                        price={productData03.price}
                        image={productData03.image}
                        rating={productData03.rating}
                    />
                    <Product
                        id={productData04.id}
                        title={productData04.title}
                        price={productData04.price}
                        image={productData04.image}
                        rating={productData04.rating}
                    />
                </div>
                <div className="home__row">
                    <Product
                        id={productData05.id}
                        title={productData05.title}
                        price={productData05.price}
                        image={productData05.image}
                        rating={productData05.rating}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;