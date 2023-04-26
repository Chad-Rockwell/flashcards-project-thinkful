import React from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./Nav";

function Study() {
  const [deck, setDeck] = useState([]);
  let { deckId } = useParams();
  const [front, setFront] = useState(true);
  const [cardCount, setCardCount] = useState(0);
  const cards = deck.cards?.map((card, i) => {
    if (front) {
      return <p key={i}>{card.front}</p>;
    } else {
      return <p key={i}>{card.back}</p>;
    }
  });

  function flipHandler() {
    setFront(!front);
  }

  function nextButtonHandler() {
    if (cardCount < cards.length - 1) {
      setFront(true);
      setCardCount(cardCount + 1);
    }
    else {
      if(window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
        window.open(`/decks/${deckId}/study`, "_self");
      }
      else {
        window.open("/", "_self");
      }
    }
  }

  useEffect(() => {
    readDeck(deckId).then((data) => setDeck(data));
  }, []);

  if (!deck.cards) {
    return <div>Loading</div>;
  }

  console.log(deck);

  if (deck.cards?.length < 3) {
    return (
      <React.Fragment>
        <Nav deck={deck} type="study" create={false} />
        <div className="container">
          <h2 className="display-2 font-weight-normal">{deck.name}: Study</h2>
          <h3 className="display-4 font-weight-normal">Not enough cards</h3>
          <p className="lead font-weight-normal">
            You need at least 3 cards to study. There are 2 cards in this deck.
          </p>
          <Link to="" className="btn btn-primary btn-lg">Add Cards</Link>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="container">
          <Nav deck={deck} type="study" />
          <h2 className="display-2 font-weight-normal">Study: {deck.name}</h2>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">
                Card {cardCount + 1} of {deck.cards?.length}
              </h3>
              <div>{cards[cardCount]}</div>
              <button
                onClick={flipHandler}
                className="btn btn-lg btn-secondary mr-2"
              >
                Flip
              </button>
              {front === false && (
                <button
                  onClick={nextButtonHandler}
                  className="btn btn-lg btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Study;
