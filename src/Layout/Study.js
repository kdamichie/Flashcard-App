import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});
  const [cardsLength, setCardsLength] = useState(0);
  const [front, setFront] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId, {
          signal: abortController.signal,
        });
        setDeck(response);
        setCardsLength(response.cards.length);
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

  const flip = (event) => {
    setFront(!front);
  };

  const next = (event) => {
    if (cardIndex + 1 < cardsLength) {
      setCardIndex(cardIndex + 1);
      setFront(true);
    } else {
      const result = window.confirm("Restart?");
      if (result) {
        setFront(true);
        setCardIndex(0);
      } else {
        history.push("/");
      }
    }
  };

  if (cardsLength <= 2) {
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
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <h3>Not Enough Cards.</h3>
        <p>
          You need at least 3 cards to study. There are {cardsLength} in this
          deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="btn btn-primary">Add Cards</button>
        </Link>
      </div>
    );
  } else {
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
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <div className="card bg-light">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {cardsLength}
            </h5>
            <p className="card-text">
              {front
                ? deck.cards && deck.cards[cardIndex].front
                : deck.cards && deck.cards[cardIndex].back}
            </p>
            <div className="btnContainer">
              {front ? null : (
                <button onClick={next} className="btn btn-secondary">
                  Next
                </button>
              )}
              <button onClick={flip} className="btn btn-primary">
                Flip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Study;
