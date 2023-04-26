import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import { readDeck } from "../utils/api";

function Deck() {
  let { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    readDeck(deckId).then((data) => setDeck(data));
  }, []);

  if (!deck.cards) {
    return <div>Loading</div>;
  }

  return (
    <React.Fragment>
      <div className="container">
        <Nav create={false} deck={deck} />
        <div className="container">
          <h2 className="display-5 font-weight-normal">{deck.name}</h2>
          <p className="lead font-weight-normal">{deck.description}</p>
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-lg btn-secondary mr-2">Edit</Link>
          <Link
            className="btn btn-lg btn-primary mr-2"
            to={`/decks/${deck.id}/study`}
          >
            Study
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-lg btn-primary mr-5">Add cards</Link>
          <button className="btn btn-lg btn-danger ml-5">Delete</button>
        </div>
        <div className="container mt-4">
          <h2 className="display-4 font-weight-normal">Cards</h2>
          {deck.cards?.map((card, i) => {
            return (
            <div key={i} className="card p-4">
                <div className="card-body row">
                <div className="col-6"><p className="lead font-weight-normal">{card.front}</p></div>
                <div className="col-6">
                    <p className="lead font-weight-normal">{card.back}</p>
                    <div className="d-flex justify-content-end">
                        <Link className="btn btn-lg btn-secondary mr-2">Edit</Link>
                        <button className="btn btn-lg btn-danger">Delete</button>
                    </div>
                </div>
                </div>
            </div>

            )
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Deck;