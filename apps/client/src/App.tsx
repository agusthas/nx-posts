import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';
import DetailPost from './pages/DetailPost';
import Home from './pages/Home';
import NewPost from './pages/NewPost';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/new" component={NewPost} />
        <Route path="/posts/:id">
          {(params) => <DetailPost id={params.id} />}
        </Route>

        <Route>
          <h1>404 - Not Found</h1>
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}
