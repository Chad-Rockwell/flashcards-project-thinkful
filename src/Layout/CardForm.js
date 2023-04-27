import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardForm({
  newCard,
  cardSubmitHandler,
  deck,
  card = { front: "", back: "" },
}) {
  const [formCard, setFormCard] = useState(card);
  const [submitted, setSubmitted] = useState(false);
  const cardDefault = { front: "", back: "" };

  useEffect(() => {
    if (!newCard) {
      setFormCard(card);
    }
  }, [card]);

  function submitButtonHandler(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      cardSubmitHandler(deck.id, formCard, newCard);
      setFormCard(cardDefault);
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={(event) => submitButtonHandler(event)}>
          <div className="form-group">
            <label className="lead font-weight-normal" htmlFor="front">
              Front
            </label>
            <textarea
              className="form-control form-control-lg"
              type="text"
              id="front"
              name="front"
              placeholder="Front side of card"
              value={formCard.front}
              onChange={(event) =>
                setFormCard({ ...formCard, front: event.target.value })
              }
            ></textarea>
          </div>
          <div className="form-group">
            <label className="lead font-weight-normal" htmlFor="back">
              Back
            </label>
            <textarea
              className="form-control form-control-lg"
              name="back"
              id="back"
              type="text"
              placeholder="Back side of card"
              value={formCard.back}
              onChange={(event) =>
                setFormCard({ ...formCard, back: event.target.value })
              }
            ></textarea>
          </div>
          {newCard && (
            <Link
              className="btn btn-lg btn-secondary mr-2"
              to={`/decks/${deck.id}`}
            >
              Done
            </Link>
          )}
          {!newCard && (
            <Link
              className="btn btn-lg btn-secondary mr-2"
              to={`/decks/${deck.id}`}
            >
              Cancel
            </Link>
          )}
          {newCard && (
            <button className="btn btn-lg btn-primary" type="submit">
              Save
            </button>
          )}
          {!newCard && (
            <button className="btn btn-lg btn-primary" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}

export default CardForm;
