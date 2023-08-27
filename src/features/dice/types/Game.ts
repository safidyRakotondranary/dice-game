export type MultiplayerGameConfigurationPropsType = {
  onStartGame?: () => void
};

export type GamePropsType = {
  setScore: (score: number) => void,
  alreadyPlayed?: boolean,
  setAlreadyPlayed?: (props: boolean) => void
}

export type PlayerDetailsType = {
  score: number,
  leftGame: number
}
