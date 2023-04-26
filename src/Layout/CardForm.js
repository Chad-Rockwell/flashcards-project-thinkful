import React from "react";
import { useState } from "react";

function CardForm({ deck, card = { front: "", back: "" } }) {
  const [card, setCard] = useState(card);
  return (
    <React.Fragment>
      <Nav create={true} />
      <div className="container">
        <form>
          <div className="form-group">
            <label className="lead font-weight-normal" htmlFor="front">
              Front
            </label>
            <textarea
              className="form-control"
              type="text"
              id="front"
              name="front"
              placeholder="Front side of card"
              value={card.front}
              onChange={(event) =>
                setCard({ ...card, front: event.target.value })
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
              value={card.back}
              onChange={(event) =>
                setCard({ ...card, back: event.target.value })
              }
            ></textarea>
          </div>
          <Link
            className="btn btn-lg btn-secondary mr-2"
            to={`/decks/${deck.id}`}
          >
            Done
          </Link>
          <button className="btn btn-lg btn-primary" type="submit">
            Save
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default CardForm;
