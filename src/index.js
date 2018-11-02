import { _, createRender } from './my-react';
import { createStore } from './my-react-render';
import App from './Components/App';
import reducer from './reducer';

import * as data from './data.json';

const store = createStore(reducer);

const render = createRender(
  _(App)({ store: store, data: data }),
  document.getElementById('root'),
);

store.subscribe(render);

store.dispatch({});
