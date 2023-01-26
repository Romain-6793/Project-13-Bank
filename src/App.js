import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import User from './pages/User/User'
import Error from './pages/Error/Error'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import GlobalStyle from './utils/style/GlobalStyle'
// import { Beforeunload } from 'react-beforeunload';
// import { rememberUser } from './slices/authSlice';

function App() {

    const authUser = useSelector((state) => state.auth);

    //     function storageHandler() {
    //   localStorage.removeItem("token")
    // }

    // function storageHandler() {
    //     if (authUser.remembered !== true) {
    //         localStorage.removeItem("token")
    //     }
    // }

    // window.addEventListener("beforeunload", (ev) => {
    //     ev.preventDefault();
    //     return ev.returnValue = 'Are you sure you want to close?';
    // });

    // useEffect(() => {
    //     const onBeforeUnload = (ev) => {

    //         //#############     
    //         console.log(authUser);


    //         if (!authUser.remembered) {
    //             console.log("Le token ne sera pas conservé")
    //         } else {
    //             console.log("le token sera conservé")
    //         }

    //         //#############

    //         ev.returnValue = "Anything you wanna put here!";
    //         return "Anything here as well, doesn't matter!";
    //     };

    //     window.addEventListener("beforeunload", onBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", onBeforeUnload);
    //     };
    // }, []);

    return (

        // <Beforeunload onBeforeUnload={storageHandler()}>
        <div>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                {authUser._id ?
                    <Route path="/user" element={<User />} />
                    : <Route path="/user" element={<Error />} />
                }
                <Route path="/signIn" element={<SignIn />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
        // </Beforeunload>

    )
}

export default App
