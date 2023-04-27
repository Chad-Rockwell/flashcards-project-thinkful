import React from "react";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";


//making the component function that will edit an existing deck that passes in the correct prop from the parent
function EditDeck({editDeckHandler}) {
  //grabing the deck id from useParams
  let { deckId } = useParams();
  //making a state for the existing deck
  const [deck, setDeck] = useState([]);
  //making a state for the updated deck information
  const [newDeck, setNewDeck] = useState({
    name: "",
    description: "",
    id: "",
  })
  const [submitted, setSubmitted] = useState(false);

  //using the id grabbed from params to fetch the deck data
  useEffect(() => {
    readDeck(deckId).then((data) => setDeck(data));
  }, []);

  //use effect that will pass the updated card data into the parent function prop
  useEffect(() => {
    console.log("this should be the updated deck", submitted)
    if(submitted) {
      editDeckHandler(newDeck);
    }
}, [newDeck]);

  if (!deck.cards) {
    return <div>Loading</div>;
  }
  //this function will prevent a refresh on submit and update the updated card states data so it can be passed into the prop function 
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
