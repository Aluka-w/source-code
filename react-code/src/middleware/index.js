export const logger = (store) => (next) => (action) => {
  // next = store.dispatch
  // next(action) = store.dispatch(action)
  console.log("进入log")
  let result = next(action)
  return result
}

export const thunk = (store) => (next) => (action) => {
  console.log("thunk")
  return typeof action === "function" ? action(store.dispatch) : next(action)
}
