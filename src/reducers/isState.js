const defaultState = {
  stepNumber: 0,
  idX: -1,
  idY: -1,
  isNext: true,
  isReverse: false
};

const isStateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'REVERSE':
      return { isReverse: !state.isReverse };
    case 'JUMP_TO':
      return { stepNumber: action.move, isNext: action.move % 2 === 0 };
    case 'RESET_IS_STATE':
      return state;
    default:
      return state;
  }
};

export default isStateReducer;
