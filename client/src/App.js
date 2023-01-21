import './App.css';

import React, { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import userFetch from './reducers/user/user.actions';
import { useDispatch } from 'react-redux';

import Landing from './Pages/Landing';
import Header from './Pages/Header';
import Dashboard from './Pages/Dashboard';

import BlogNew from './components/BlogNew';
import BlogShow from './components/BlogShow';

function App() {

  let dispatch = useDispatch();

   useEffect(() => {
     dispatch(userFetch());
  }, [dispatch])

  return (
  <div className="App">
  <div>
  <Header/>
  <Routes>
  
  <Route path="/" element={<Landing/>}/>

  <Route path="/blogs">
  <Route index element={<Dashboard/>}/>
  <Route path="new" element={<BlogNew/>}/>
  <Route path=":_id" element={<BlogShow/>}/>
  </Route>

  </Routes>
  </div>
  </div>
  );
}

export default App;
