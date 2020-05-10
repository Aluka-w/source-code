/**
 * @description 手写 redux
 */

const createStore = (reducer, enhancer) => {
  // enhancer 加强
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let state
  let observers = [] // 观察者队列
  const getState = () => { // getter
    return state
  }
  const dispatch = (action) => { // setter
    state = reducer(state, action)
    observers.forEach(fn => fn())
  }
  const subscribe = (fn) => { // 观察者模式
    observers.push(fn)
  }
  dispatch({ type: '@@test' })
  return { getState, dispatch, subscribe }
}

// (...arg) => mid1(mid2(mid3(...arg)))
// 函数柯里化
const compose = (...fns) => {
  if (fns.length === 0) return arg =>arg
  if (fns.length === 1) return fns[0]
  return fns.reduce((res,cur) => (...args) => res(cur(...args)))
}

const applyMiddleware = (...middlewares) => createStore => reducer => {
  const store = createStore(reducer)
  const params = {
    getState: store.getState,
    dispatch: (action) => store.dispatch(action)
    // 不直接使用 dispatch，会产生闭包，所有都共用一个 dispatch
  }
  // 给所有中间件提供 （state，dispatch)
  const middlewareArr = middlewares.map(middleware => middleware(params))
  // console.log('middlewareArr', middlewareArr);
  const dispatch = compose(...middlewareArr)(store.dispatch)
  // console.log('dispatch', dispatch); // 循环执行，直到最后 dispatch
  // 直接主要是返回新的 dispatch
  // const store = createStore(reducer, applyMiddleware(logger, thunk))
  // return 新的 store
  return {...store, dispatch}
}

export { createStore, applyMiddleware }