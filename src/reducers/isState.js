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
      return { ...state, isReverse: !state.isReverse };
    case 'JUMP_TO':
      return {
        ...state,
        stepNumber: action.move,
        isNext: action.move % 2 === 0
      };
    case 'RESET_IS_STATE':
      return defaultState;
    case 'CLICK_SQUARE_STATE':
      return {
        ...state,
        isNext: !state.isNext,
        stepNumber: state.stepNumber + 1,
        idX: action.X,
        idY: action.Y
      };
    default:
      return state;
  }
};

export default isStateReducer;
