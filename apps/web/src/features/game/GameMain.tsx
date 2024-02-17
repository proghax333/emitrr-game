import clsx from "clsx";
import { ReactNode, cloneElement, useEffect, useMemo } from "react";
import { Card, cardTypes } from "./Card";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { Link } from "react-router-dom";
import {
  GameState,
  addSpecialCard,
  defuseCard,
  gameLose,
  gameWin,
  setGameState,
  shuffle,
  viewCard,
} from "./gameSlice";
import { useUpdateUserScoreMutation } from "@/state/user";
import { SaveGameManager } from "./SaveGameManager";

type CardStackProps = {
  children: ReactNode;
};

function EmptyCard() {
  return (
    <div className="h-full flex items-center justify-center bg-slate-800 border-2 border-dashed rounded-lg text-xs text-slate-50 select-none p-12">
      No Cards
    </div>
  );
}

function CardStack({ children }: CardStackProps) {
  let cards = null;

  if (Array.isArray(children)) {
    cards = children.map((child: any, index) => {
      return cloneElement(child, {
        index,
        key: `card-${index}`,
      });
    });
  }

  return (
    <div
      className="relative block"
      style={{
        width: `calc(11rem + ${5 * 4}px)`,
        height: `calc(16rem + ${5 * 3}px)`,
      }}
    >
      {cards?.length ? cards : <EmptyCard />}
    </div>
  );
}

type CardProps = {
  data: Card;
  children?: ReactNode;
  index?: number;
  onClick?: (card: Card) => void;
};

function PlayingCard({ data: card, index, onClick = () => {} }: CardProps) {
  const { isFlipped } = card;

  const cardType = cardTypes[card.type];
  const cardContents = (
    <div className="flex items-center justify-center flex-col w-full px-4 gap-2">
      <p className="text-2xl">{cardType.view}</p>
      <p className="text-xs text-gray-900">{cardType.description}</p>
    </div>
  );

  return (
    <div
      className={clsx(
        typeof index === "number" && "absolute",
        "w-[11rem] h-[16rem] rounded-md shadow-lg flex items-center justify-center",
        isFlipped && "bg-slate-100",
        !isFlipped && "bg-slate-700",
        "border border-slate-500 cursor-pointer select-none"
      )}
      style={
        typeof index === "number"
          ? {
              top: `${index * 3}px`,
              left: `${index * 4}px`,
            }
          : {}
      }
      onClick={() => onClick(card)}
    >
      {isFlipped && cardContents}
      {!isFlipped && <p className="text-xs">Click to flip</p>}
    </div>
  );
}

function createNewGameState(counterOffset: number = 0): GameState {
  let cards: Card[] = [];

  const items = ["cat", "defuse", "explode", "shuffle"] as const;
  let counter = counterOffset;

  for (let i = 0; i < 5; ++i, ++counter) {
    const item = items[Math.floor(Math.random() * items.length)];

    cards.push({
      id: counterOffset + counter,
      type: item,
      isFlipped: false,
    });
  }

  const result: GameState = {
    counter,
    cards,
    viewedCards: [],
    specialCards: [],
    selectedCard: null,
    status: "running",
    result: "unknown",
  };

  return result;
}

export function GameMain() {
  const { user } = useAppSelector((state) => state.session);
  const game = useAppSelector((state) => state.game);

  const cards = useAppSelector((state) => state.game.cards);
  const selectedCard = useAppSelector((state) => state.game.selectedCard);
  const specialCards = useAppSelector((state) => state.game.specialCards);

  const dispatch = useAppDispatch();
  const updateUserScoreMutation = useUpdateUserScoreMutation();

  const saveGameManager = useMemo(() => new SaveGameManager(user!), [user]);

  function restoreGame(saveGame: GameState) {
    dispatch(setGameState(saveGame));
  }

  function resetGame() {
    const game = createNewGameState();
    dispatch(setGameState(game));
  }

  function shuffleGame() {
    const newGameState = createNewGameState(game.counter);

    const shuffledGameState: Partial<GameState> = {
      cards: newGameState.cards,
      counter: newGameState.counter,
    };

    dispatch(shuffle(shuffledGameState));
  }

  useEffect(() => {
    async function go() {
      const saveGame = await saveGameManager.getSaveGame();

      if (saveGame) {
        restoreGame(saveGame);
      } else {
        resetGame();
      }
    }

    go();
  }, []);

  // Game business logic
  useEffect(() => {
    if (!user) {
      return;
    }
    if (game.status !== "running") {
      return;
    }
    const selectedCard = game.selectedCard;

    let lose = false;
    if (selectedCard?.type === "explode" && !selectedCard.isDefused) {
      if (game.specialCards.length > 0) {
        // Use defuse card
        dispatch(defuseCard(selectedCard));
      } else {
        // Lose
        lose = true;
        dispatch(gameLose());

        updateUserScoreMutation.mutate({
          userId: user!.id,
          result: "lose",
        });
      }
    } else if (selectedCard?.type === "shuffle" && !selectedCard.isShuffled) {
      shuffleGame();
    } else {
      if (!lose && game.cards.length === 0) {
        dispatch(gameWin());

        updateUserScoreMutation.mutate({
          userId: user.id,
          result: "win",
        });
      }
    }
  }, [game]);

  useEffect(() => {
    if (game.status === "unknown") {
      return;
    }

    if (game.status === "done") {
      saveGameManager.removeSaveGame();
    } else {
      saveGameManager.setSaveGame(game);
    }
  }, [game]);

  function onCardSelect(card: Card) {
    if (game.status !== "running") {
      return;
    }

    if (card.id !== cards[cards.length - 1].id) {
      return;
    }

    dispatch(viewCard(card));
    if (card.type === "defuse") {
      dispatch(addSpecialCard(card));
    }
  }

  return (
    <div>
      <div className="w-full flex justify-center py-2 mt-2">
        <div className="flex gap-2">
          <div className="p-2">
            {game.result === "win" && <div>You won!</div>}
            {game.result === "lose" && <div>You lost!</div>}
          </div>
          <button
            onClick={() => resetGame()}
            className="border-2 p-2 bg-gray-100 text-black"
          >
            Reset Game
          </button>
          <Link
            to="/game/leaderboard"
            className="border-2 p-2 bg-gray-100 text-black"
          >
            Go to leaderboards
          </Link>
        </div>
      </div>
      <div className="flex w-full gap-8 items-center justify-center pt-4">
        <div>
          <CardStack>
            {cards.map((card, index) => {
              return (
                <PlayingCard
                  data={card}
                  index={index}
                  key={`card-${card.id}`}
                  onClick={(card) => onCardSelect(card)}
                />
              );
            })}
          </CardStack>
        </div>

        <div>
          {selectedCard ? <PlayingCard data={selectedCard} /> : <EmptyCard />}
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center">
        <div className="border-2 border-dashed h-[6rem] w-[4rem] flex flex-col items-center justify-center">
          <p>{cardTypes["defuse"].view}</p>
          <p className="text-xs">x {specialCards.length}</p>
        </div>
      </div>
    </div>
  );
}
