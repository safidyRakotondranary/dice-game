export type GamePropsType = {
  isNewGame?: boolean
  onRollDices?: (score: number) => void
}

export type PlayerDetailsType = {
  score: number,
  leftGame: number
}

export type MultiplayerGamePropsType = {
  onGameOver: () => void
}

export type MultiplayerGameConfigurationPropsType = {
  onStartGame: () => void
}
