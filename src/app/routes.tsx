import HomeView from './views/Home.view';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path={'/home'} element={<HomeView />} />
      </Switch>
    </Router>
  );
}
