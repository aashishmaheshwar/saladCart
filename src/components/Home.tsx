import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        flexDirection: "column",
        marginTop: "10vh",
      }}
    >
      <h1>Welcome to the Salad Store</h1>
      <div style={{ marginTop: "2vh" }}>
        <Link to="/ingredients">
          <button className="btn btn-primary">Order now</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
