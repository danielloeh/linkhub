export const FILTERED = 'FILTERED';
export const UNFILTERED = 'UNFILTERED';

export function applyFilter(filterTerm) {
  return {
    type: FILTERED,
    filterTerm
  }
}

export function displayAll() {
  return {
    type: UNFILTERED
  }
}
