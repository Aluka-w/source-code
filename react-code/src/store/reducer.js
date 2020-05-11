const initState = {
  count: 1
}

const reducer = (state = initState, action) => {
  console.log(123, state);
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 };
    case 'minus':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
export default reducer