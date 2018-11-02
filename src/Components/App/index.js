import { _ } from '../../my-react';
import { provider, text } from '../../my-react-render';
import './App.css';

import Table from '../Table';

const map = (data, f) => data.map(x => f(x));

const actionCreator = (type, obj) => {
  return { type: type, ...obj };
};

const TaskTable = data => {
  const { store, body, head } = data;
  const dataCut = body.length;
  const showedRowsCount = 10;
  const pageCountInit = Math.ceil(dataCut / showedRowsCount);
  const showedPage = 1;

  const getPages = (pageCount, showedPage) =>
    [...Array(pageCount)].map((x, i) => i + showedPage);
  const pageCount = (rowsCount, showedRowsCount) =>
    Math.ceil(rowsCount / showedRowsCount);

  store.add({
    pages: getPages(pageCountInit, showedPage),
    sortedStates: Array(head.length).fill(1),
    rows: body,
    filteredRows: body,
    showedPage: showedPage,
    rowsCount: dataCut,
    showedRowsCount: showedRowsCount,
    pageCount: pageCount(dataCut, showedRowsCount),
  });

  const computedPageCount = () => {
    const { rowsCount, showedRowsCount } = store.getState();
    return pageCount(rowsCount, showedRowsCount);
  };

  return _('div').className('center column')(
    _(Searcher)({ store: store }),
    _(Table)({
      head: head,
      body: store.getState().filteredRows,
      store: store,
    }),
    _(Paggination)({
      getPages: () => {
        const { showedPage } = store.getState();
        return getPages(computedPageCount(), showedPage);
      },
      store: store,
    }),
  );
};

const Searcher = props => {
  const { store } = props;
  const toggle = () => {
    const query = document.getElementById('filter-input').value;
    const action = actionCreator('FILTER_TABLE', {
      query: query,
    });
    store.dispatch(action);
  };
  store.subscribe(() => {
    document.getElementById('filter-button').onclick = toggle;
  });
  return _('div').className('justify-content-end right center a w-50 ')(
    _('p')(text('Search:')),
    _('input').id('filter-input')(),
    _('button').id('filter-button')(text('search')),
  );
};

const Paggination = ({ getPages, store }) => {
  const pages = getPages();
  const toggleNext = () => {
    const action = actionCreator('NEXT_PAGE');
    store.dispatch(action);
  };
  const togglePrev = () => {
    const action = actionCreator('PREV_PAGE');
    store.dispatch(action);
  };
  store.subscribe(() => {
    document.getElementById('prev').onclick = togglePrev;
    document.getElementById('next').onclick = toggleNext;
  });

  return _('div').className('right w-50')(
    _('ul').className('paggination py center  space-between')(
      _('li')
        .className('paggination-item')
        .id('prev')(() => 'Previous'),
      ...map(pages, text).map((el, i) => {
        return i === 0
          ? _('li').className('paggination-item selected-page')(el)
          : _('li').className('paggination-item')(el);
      }),
      _('li')
        .className('paggination-item')
        .id('next')(() => 'Next'),
    ),
  );
};

const App = ({ store, data }) => {
  const count = 10;
  return provider(_(TaskTable))({ store, ...data, count });
};

export default App;
