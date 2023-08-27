import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  return (
    <div>
      <h1>Welcome to the Dice Game!</h1>
      <p>This is the home page of the game. Get ready to roll the dice!</p>
      <Link to="/gameConfiguration">Play game</Link>
    </div>
  );
};

export default Home;
