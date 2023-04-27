import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// setting the card form component function to take in props that will allow it to add or edit a card into the correct deck
function CardForm({
  newCard,
  cardSubmitHandler,
  deck,
  card = { front: "", back: "" },
}) {
  //using state to store input and card information as well as making a default to reset the form when new card is submitted, also using a state variable to check if the form info has been submitted
  const [formCard, setFormCard] = useState(card);
  const [submitted, setSubmitted] = useState(false);
  const cardDefault = { front: "", back: "" };

  //passing the card prop data into a state with useEffect if the form is being used to edit a card
  useEffect(() => {
    if (!newCard) {
      setFormCard(card);
    }
  }, [card]);
  //function for when the form is submitted to prevent refresh and set submitted to true
  function submitButtonHandler(event) {
    event.preventDefault();
    setSubmitted(true);
  }
  //use effect that will pass the updated/new card information to the cardSubmit handler prop on a higher state, with the information needed to decide if this is an add or edit
  //also sets the formCard info to the default so user can add a new card without having to delete previous entry or refresh the page
  useEffect(() => {
    if (submitted) {
      cardSubmitHandler(deck.id, formCard, newCard);
      setFormCard(cardDefault);
      setSubmitted(false);
    }
  }, [submitted]);

  //rendering the form
  return (
    <React.Fragment>
      {/* making the form and giving it the properties/attributes it needs to function correctly.
      The form will display the existing cards information if available */}
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
          {/* using && syntax to display the correct buttons and give the proper functionality to them depending on if user is editing 
          an existing card or creating a new one */}
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
