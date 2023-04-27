import React from "react";
import { Link } from "react-router-dom";

//this function/component will be used to display the correct deck data from the parents deck array
//the map was moved from this component into the parent component
//it will take in the mapped deck as a prop and the parent function to delete a deck when the button is clicked 
function DeckList({deck, deleteDeckHandler}) {
  return (
    <div className="col-12 d-flex justify-content-center m-2">
      <div className="card w-25 rounded p-3">
        <div className="row">
          <h3 className="card-title col-10">{deck.name}</h3>
          <p className="card-text text-muted col-2">
            {deck.cards.length} cards
          </p>
        </div>
        <p className="card-text lead font-weight-normal">{deck.description}</p>
        <div className="row">
          <div className="col-3">
            <Link
              to={`/decks/${deck.id}`}
              className="btn btn-secondary btn-lg btn-block"
            >
              View
            </Link>
          </div>
          <div className="col-3">
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary btn-lg btn-block"
            >
              Study
            </Link>
          </div>
          <div className="col-4"></div>
          <div>
            <button
              onClick={(event) => deleteDeckHandler(deck.id)}
              className="btn btn-danger btn-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeckList;
