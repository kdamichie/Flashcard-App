import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId, {
          signal: abortController.signal,
        });
        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getDeck();

    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    await updateDeck(deck);
    history.push(`/decks/${deck.id}`);
  }

  function handleCancel(event) {
    event.preventDefault();

    history.push(`/decks/${deck.id}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder={deck.name}
            onChange={handleChange}
            value={deck.name}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control input-lg"
            name="description"
            id="description"
            placeholder={deck.decription}
            onChange={handleChange}
            value={deck.description}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary ml-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
