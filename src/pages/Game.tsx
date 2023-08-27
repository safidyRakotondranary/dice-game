import GameComponent from 'src/features/dice/components/Game';

const Game = (): JSX.Element => {
  return (
    <div>
      <h1>Welcome to the Dice Game!</h1>
      <p>This is the game page. Get ready to roll the dice!</p>
      <GameComponent></GameComponent>
    </div>
  );
};

export default Game;
