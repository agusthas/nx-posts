import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import NewPost from './pages/NewPost';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/new" component={NewPost} />

      <Route>
        <h1>404 - Not Found</h1>
      </Route>
    </Switch>
  );
}
