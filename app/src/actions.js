export const FILTERED = 'FILTERED';
export const RESET = 'RESET';

export function doFilter(filterTerm) {
  return {
    type: FILTERED,
    filterTerm
  }
}

export function doReset() {
  return {
    type: RESET
  }
}
