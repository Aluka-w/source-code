import React, { useContext, useEffect, useReducer } from 'react';

const Context = React.createContext()
// 通过 context 存储 store
export const Provider = (props) => (
  <Context.Provider value={props}>
    {props.children}
  </Context.Provider>
)

export const connect = (mapStateToProps, mapDispatchToProps) => Com => (props) => {
  const context = useContext(Context)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  // 强制更新，hook中实现 forceUpdate 函数
  const handleChange = () => {
    forceUpdate()
  }

  useEffect(() => {
    // 调用 context 中的 store.subscribe 监听变化，再强制刷新
    context.store.subscribe(handleChange)
  }, [context])

  return (
    <Com
      // 之前的 props 高阶组件继续往下传
      {...props}
      // mapStateToProps 把 state 映射到 props
      {...mapStateToProps(context.store.getState())}
      // mapDispatchToProps 把 dispatch(action) 挂载到 props
      {...mapDispatchToProps(context.store.dispatch)}
    />
  )
}