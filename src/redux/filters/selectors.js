export const selectFilter = state => state.filters;
export const selectFilterValue = state => selectFilter(state).name;
