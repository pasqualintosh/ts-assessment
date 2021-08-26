import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './screens/List/List';
import Create from './screens/Create/Create';
import Read from './screens/Read/Read';

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
          <Create />
        </Route>

        <Route path="/user/:name" children={<Read />} />

        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
