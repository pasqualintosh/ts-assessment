import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './screens/List/List';
import Update from './screens/Update/Update';

interface IState {
  overlay: boolean;
}

interface IProps {}

const App = () => {
  const [overlay, setOverlay] = useState<IState['overlay']>(false);

  return (
    <Router>
      <Switch>
        <Route path="/users/create">
          <Update />
        </Route>

        <Route path="/user/:name" children={<Update update={true} />} />

        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
