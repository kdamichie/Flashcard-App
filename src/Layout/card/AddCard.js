import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api/index";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ front: "", back: "" });

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

  const handleChangeFront = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const handleChangeBack = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  function handleSave(event) {
    event.preventDefault();

    async function updateCards() {
      await createCard(deckId, card);
    }

    updateCards();
    setCard({
      front: "",
      back: "",
      deckId: deckId,
    });
  }

  function handleDone(event) {
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
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label" htmlFor="front">
            <h3>Front</h3>
          </label>
          <textarea
            className="form-control input-lg"
            name="front"
            id="front"
            required
            onChange={handleChangeFront}
            value={card.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="back">
            <h3>Back</h3>
          </label>
          <textarea
            className="form-control input-lg"
            name="back"
            id="back"
            required
            onChange={handleChangeBack}
            value={card.back}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleDone}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
