import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <div className="container-fluid d-flex justify-content-center row">
        <div className="w-25 pl-4">
          <Link to="/decks/new" className="btn btn-secondary btn-lg">
            Create Deck
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
