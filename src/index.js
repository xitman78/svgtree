import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { makeSelectLocationState } from './selectors'
import configureStore from './store'
import App from './App'
import Home from './pages/home/home'
import Works from './pages/works/works'
import Bouncer from './pages/bouncer/bouncer'
import Posts from './pages/posts/posts'
import PostDetails from './pages/posts/details/post'
import NotFound from './pages/404/404'
import './index.sass'

const store = configureStore(browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="posts" component={Posts}/>
        <Route path="works" component={Works}/>
        <Route path="bounce" component={Bouncer}/>
        <Route path="post/:id" component={PostDetails}/>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
