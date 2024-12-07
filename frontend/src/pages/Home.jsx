import { Layout } from "../hoc/Layout";
import "../styles/Home.css";

const products = [
  {
    _id: 1,
    title: "Fjallraven  Foldsack No 1 Backpack Fits 15 Laptops",
    price: 329.85,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    stock: 8,
  },
];
const Home = () => {
  return (
    <div className="home-page">
      <section className="product-section product-wrapper">
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <article key={product._id}>
                <figure>
                  <img src={product.image} alt={product.title} />
                  <figcaption>{product.category}</figcaption>
                </figure>
                <div className="product-content">
                  <p>{product.title}</p>
                  <div className="product-info">
                  <span>₹{product.price}</span>
                  <button type="button" className="btn-cart">Add to cart</button>

                  </div>
                </div>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default Layout(Home);
