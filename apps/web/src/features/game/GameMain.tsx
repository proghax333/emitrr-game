import clsx from "clsx";
import { ReactNode, cloneElement, useState } from "react";
import { Card, cardTypes } from "./Card";
import { useAppSelector } from "../app/hook";

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

  const count = (children as any[]).length || 0;

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

export function GameMain() {
  const cards = useAppSelector((state) => state.game.cards);
  const selectedCard = useAppSelector((state) => state.game.selectedCard);

  function onCardSelect(card: Card) {
    if (card.id !== cards[cards.length - 1].id) {
      return;
    }

    console.log(card);
  }

  return (
    <main className="h-full bg-slate-900 w-full">
      <div className="h-full flex flex-col items-center">
        <div className="h-full p-8 pt-12 w-full max-w-2xl bg-slate-800">
          <div className="flex w-full gap-8 items-center justify-center">
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
              {selectedCard ? (
                <PlayingCard data={selectedCard} />
              ) : (
                <EmptyCard />
              )}
            </div>
          </div>

          <div className="mt-8">
            <div className="border-2 border-dashed h-[6rem] w-[4rem] flex flex-col items-center justify-center">
              <p>{cardTypes["defuse"].view}</p>
              <p className="text-xs">x 0</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
