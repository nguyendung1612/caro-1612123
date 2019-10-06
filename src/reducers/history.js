const defaultHis = [
  {
    squares: Array(20)
      .fill(null)
      .map(() => Array(20).fill(null)),
    location: '',
    isWin: null,
    id: 0
  }
];

const historyReducer = (state = defaultHis, action) => {
  switch (action.type) {
    case 'CLICK_SQUARE_HIS':
      return [...state.slice(0, action.stepNumber + 1).concat(action.item)];
    case 'RESET_HIS':
      return defaultHis;
    default:
      return state;
  }
};

export default historyReducer;
