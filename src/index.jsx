import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
// import GlobalStyle from './utils/style/GlobalStyle'
// import { Provider } from 'react-redux';
// import store from './utils/store';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      {/* <Provider store={store}> */}
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      {/* </Provider> */}
    </Router>
  </React.StrictMode>,
)

reportWebVitals()