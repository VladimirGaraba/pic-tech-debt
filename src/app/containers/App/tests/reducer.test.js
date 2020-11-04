import globalReducer from '../reducer';

describe('globalReducer', () => {
  it('should return the initial state', () => {
    expect(globalReducer(undefined, {})).toMatchSnapshot();
  });
});
