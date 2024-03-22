import React from 'react'
import ReactDOM from 'react-dom/client'
import ApplicationRouter from './route/ApplicationRouter'
import { store } from './redux/store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <Provider store={store}>
  <React.StrictMode>
    <ApplicationRouter />
  </React.StrictMode>
</Provider>,
)
