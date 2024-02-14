export type Card = {
  id: number;
  type: "cat" | "defuse" | "explode" | "shuffle" | "none";
  isFlipped?: boolean;
  isDefused?: boolean;
  isShuffled?: boolean;
};

// export type CardType = {
//   type: string;
//   view: any;
//   name: string;
//   description: string;
// };

export const cardTypes = {
  cat: {
    type: "cat",
    view: "😼",
    name: "Cat card",
    description:
      "Acts like a normal card. Card gets removed from deck when drawn.",
  },
  defuse: {
    type: "defuse",
    view: "🙅‍♂️",
    name: "Defuse card",
    description: "Can be used to defuse an exploding kitten card.",
  },
  shuffle: {
    type: "shuffle",
    view: "🔀",
    name: "Shuffle card",
    description: "Restocks and shuffles the deck.",
  },
  explode: {
    type: "explode",
    view: "💣",
    name: "Exploding kitten card",
    description: "If this card is not defused, the player loses the game.",
  },
  none: {
    type: "❌",
    view: "Not initialized",
    name: "Uninitialized card",
    description: "This is an uninitialized card.",
  },
} as const;
