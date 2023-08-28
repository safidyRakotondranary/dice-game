export type DicePropsType = {
  value?: number
}

export type DiceType = {
  value?: number,
  minValue: number,
  maxValue: number
}

export type InitializeDicesPropsType = {
  dicesCount: number,
  diceDetails: { minValue: number, maxValue: number }
}

export type useDicesListType = {
  dices: DiceType[],
  initializeDices: (props: InitializeDicesPropsType) => void,
  rollDices: () => void
}