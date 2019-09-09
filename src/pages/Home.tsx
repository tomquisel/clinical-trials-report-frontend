import React from "react";
import { Link } from "react-router-dom";
import Example from "components/Example";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Home with some examples of Apollo local state. Check out{" "}
        <Link to="/institutions">Institutions</Link>.
      </p>
      <Example />
    </div>
  );
}

export default Home;
