type HomeProps = {
  message?: string;
};

const Home = ({ message = 'Home' }: HomeProps): JSX.Element => (
  <div>{message}</div>
);

export default Home;
