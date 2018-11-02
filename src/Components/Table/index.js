import { _ } from '../../my-react';
import { text } from '../../my-react-render';

import './Table.css';

const actionCreator = (type, obj) => {
  return { type: type, ...obj };
};

const map = (data, f) => data.map(x => f(x));

const Table = ({ head, body, store }) => {
  const { showedPage, showedRowsCount } = store.getState();
  const cutbody = body.slice(
    showedRowsCount * (showedPage - 1),
    showedRowsCount * showedPage,
  );

  const toggle = i => {
    return () => {
      const action = actionCreator('SORT_COLUMN', {
        query: i,
      });
      store.dispatch(action);
    };
  };

  store.subscribe(() => {
    const ths = document.getElementsByTagName('th');
    for (let i = 0; i < ths.length; ++i) {
      ths[i].onclick = toggle(i);
    }
  });

  const get = () => {
    const { sortedStates } = store.getState();
    return sortedStates.map(el => (el ? (el == 1 ? '▲' : '▼') : '►'));
  };

  const icons = get();

  const th = (el, i) =>
    _('th')(
      _('div').className('th')(
        _('p')(text(el)),
        _('p').className('icon')(text(icons[i])),
      ),
    );

  return _('table')(
    _('tr')(...map(head, text).map(_(th))),
    ...map(cutbody, row => _('tr')(...map(map(row, text), _('td')))),
  );
};

export default Table;
