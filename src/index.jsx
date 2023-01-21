import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from "./reportWebVitals";
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import { loadUser } from './slices/authSlice'

const root = ReactDOM.createRoot(document.getElementById("root"));





// function storageHandler() {
//   localStorage.removeItem("token")
// }

store.dispatch(loadUser(null))

// "null" because it doesn't expect anything as a parameter. I think this is because it should work 
// whether there's a token or not.

root.render(
  <React.StrictMode 
  // onBeforeUnload={storageHandler()}
  >
    <Router>
      <Provider store={store}> 
        <App></App>
      </Provider>
    </Router>
  </React.StrictMode>,
)

reportWebVitals()