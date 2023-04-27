import React from "react";
import { Link } from "react-router-dom";


//this component is a nav bar that will take in props to display the correct text and nav links
function Nav({ deck, type, create }) {
  return (
    <div className="container">
      <nav className="breadcrumb p-3 lead font-weight-normal">
        <Link className="breadcrumb-item" to="/">
          Home
        </Link>
        {create && (
          <Link to="/decks/new" className="breadcrumb-item active">
            Create Deck
          </Link>
        )}
        {!create && (
          <Link className="breadcrumb-item" to={`/decks/${deck?.id}`}>
            {deck?.name}
          </Link>
        )}

        {type && (
          <Link
            className="breadcrumb-item active"
            to={`/decks/${deck?.id}/${type}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Nav;
