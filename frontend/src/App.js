import './App.css';
import { RouterProvider, createBrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './screen/MainPage';
import Home from './screen/Home';
import Registretion from './screen/Registretion';
import Login from './screen/Login';
import Profile from './screen/Profile';
import { Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'
import Message from './screen/Message';

function App() {
  // const route = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: "<Home />"
  //   },
  //   {
  //     path: "/profile",
  //     element: "home1 page"
  //   },
  //   {
  //     path: "/register",
  //     element: <Registretion />
  //   },
  //   {
  //     path: "/update",
  //     element: "home3 page"
  //   }
  // ])
  return (<>
    <Router>
      < MainPage />
      <main>
        {/* <Container> */}
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/:name' Component={Home} />
          <Route path='/message' Component={Message} />
          <Route path='/register' Component={Registretion} />
          <Route path='/login' Component={Login} />
          <Route path='/login/:id' Component={Login} />
          <Route path='/profile' Component={Profile} />
        </Routes>
        {/* </Container> */}
      </main>
      {/* <div style={{ fontSize: '40px', width: '100%' }}>
        <Toaster />
      </div> */}
    </Router>

    {/* <MainPage />
    <RouterProvider router={route}></RouterProvider>
    <Toaster /> */}

  </>);
}

export default App;
