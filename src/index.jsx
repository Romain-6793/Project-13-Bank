import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from "./reportWebVitals";
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import { loadUser } from './slices/authSlice'

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(loadUser(null))

// "null" because it doesn't expect anything as a parameter.

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}> 
        <App></App>
      </Provider>
    </Router>
  </React.StrictMode>,
)

reportWebVitals()