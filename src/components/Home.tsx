import React from "react";
import { Link } from "react-router-dom";
import "./../css/Home.css";

const Home = () => {
  return (
    <section className="home__mainwrapper">
      <h1>Welcome to the Salad Store</h1>
      <div className="home--orderbtn__wrapper">
        <Link to="/ingredients">
          <button className="btn btn-primary">Order now</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
