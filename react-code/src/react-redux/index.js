import React, { useContext, useEffect, useReducer } from 'react';

const Context = React.createContext()

export const Provider = (props) => {
  <Context.Provider value={props.store}>
    {props.children}
  </Context.Provider>
}

export const connect = (mapStateToProps, mapDispatchToProps) => Com => (props) => {
  const context = useContext(Context)
  // 强制更新，hook中实现 forceUpdate 函数
  const handleChange = () => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    forceUpdate()
  }

  useEffect(() => {
    context.store.subscribe(handleChange)
  }, [])

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