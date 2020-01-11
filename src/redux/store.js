import { createStore ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const store = createStore(reducers,
  process.env.NODE_ENV === 'development' 
  ? applyMiddleware(thunk)
  : composeWithDevTools(applyMiddleware(thunk))
  ) 

  export default store;