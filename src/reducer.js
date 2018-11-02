const reducer = (state = 0, action) => {
  const filtered = state.rows.filter(
    row => row.join(' ').match(action.query) !== null,
  );
  const sortedStates = [...state.sortedStates];
  switch (action.type) {
    case 'FILTER_TABLE': {
      return {
        ...state,
        filteredRows: filtered,
        rowsCount: filtered.length,
      };
    }
    case 'SELECT_PAGE':
      return {
        ...state,
        showedPage: action.showedPage,
      };
    case 'PREV_PAGE':
      return {
        ...state,
        showedPage:
          state.showedPage > 1 ? state.showedPage - 1 : state.showedPage,
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        showedPage:
          state.showedPage < state.pageCount
            ? state.showedPage + 1
            : state.showedPage,
      };
    case 'SORT_COLUMN':
      sortedStates[action.query] = (sortedStates[action.query] + 1) % 3;
      return {
        ...state,
        sortedStates: sortedStates,
        //... Не хватило времени
      };
    default:
      return { ...state, ...action };
  }
};

/*
sortedState:0,
		showedPage: 1,
		rowsCount: dataCut,
		showedRowsCount: showedRowsCount,
		pageCount: Math.ceil(dataCut / showedRowsCount)
		*/

export default reducer;
