import reducer from './reducers'
import * as actions from './actions'

describe('Reducers', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  });

  it('should handle FILTERED', () => {
    expect(
      reducer([], {
        type: actions.FILTERED,
        filterTerm: 'some-term'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }
    ]);
  });

  it('should handle UNFILTERED', () => {
    expect(
      reducer([], {
        type: actions.UNFILTERED
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }
    ]);
  });

});