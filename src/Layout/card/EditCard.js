import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";

function EditCard() {
  const history = useHistory();
  const { deckId, cardsId } = useParams();

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

  useEffect(() => {
    const abortController = new AbortController();

    async function getCard() {
      try {
        const response = await readCard(cardsId, {
          signal: abortController.signal,
        });
        setCard(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getCard();

    return () => abortController.abort();
  }, [cardsId]);

  const handleChangeFront = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const handleChageBack = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    await updateCard(card);
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
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <div>
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="front">
              Front
            </label>
            <textarea
              className="form-control input-lg"
              name="front"
              id="front"
              placeholder="Front side"
              onChange={handleChangeFront}
              value={card.front}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="back">
              Back
            </label>
            <textarea
              className="form-control input-lg"
              name="back"
              id="back"
              placeholder="Back side"
              onChange={handleChageBack}
              value={card.back}
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCard;
