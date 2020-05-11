import React from 'react'
import { connect } from './react-redux'

export const App = (props) => {
  return (
    <div>
      <h1>{props.count}</h1>
      <button onClick={props.handleAdd}>+</button>
      <button onClick={props.handleminus}>-</button>
      <br/>
      <br/>
      <button onClick={props.handleAsyncAdd}>异步增加</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  count: state.count
})

const mapDispatchToProps = (dispatch) => ({
  handleAdd() {
    dispatch({ type: 'add' })
  },
  handleminus() {
    dispatch({ type: 'minus' })
  },
  handleAsyncAdd() {
    setTimeout(() => {
      dispatch({ type: 'add' })
    }, 1000);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

