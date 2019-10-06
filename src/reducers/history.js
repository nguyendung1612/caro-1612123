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
    case 'CLICK_SQUARE':
      return { ...state.concat(action.item) };
    case 'RESET_HIS':
      return state;
    default:
      return state;
  }
};

export default historyReducer;
