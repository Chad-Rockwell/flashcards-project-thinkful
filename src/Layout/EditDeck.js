import React from "react";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function EditDeck({editDeckHandler}) {
  let { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [newDeck, setNewDeck] = useState({
    name: "",
    description: "",
    id: "",
  })
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    readDeck(deckId).then((data) => setDeck(data));
  }, []);

  useEffect(() => {
    console.log("this should be the updated deck", submitted)
    if(submitted) {
      editDeckHandler(newDeck);
    }
}, [newDeck]);

  if (!deck.cards) {
    return <div>Loading</div>;
  }

  function passSubmit(event) {
    event.preventDefault();
    setNewDeck({
        name: event.target.name.value,
        description: event.target.description.value,
        id: deck.id,
    })
    setSubmitted(true);
  }



  return (
    <React.Fragment>
      <Nav create={false} deck={deck} type="Edit Deck"/>
      <div className="container">
        <h2 className="display-4 font-weight-normal">Edit Deck</h2>
        <form onSubmit={(event) => passSubmit(event)}>
          <div className="form-group">
            <label className="lead font-weight-normal" htmlFor="name">
              Name
            </label>
            <input className="form-control" type="text" id="name" name="name" value={deck.name} onChange={(event) => setDeck({...deck, name: event.target.value})}>

            </input>
          </div>
          <div className="form-group">
            <label className="lead font-weight-normal" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control form-control-lg"
              name="description"
              id="description"
              type="text"
              value={deck.description}
              onChange={(event) => setDeck({...deck, description: event.target.value})}
            >

            </textarea>
          </div>
          <Link className="btn btn-lg btn-secondary mr-2" to={`decks/${deck.id}`}>
            Cancel
          </Link>
          <button className="btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EditDeck;
