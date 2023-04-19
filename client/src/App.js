import {BrowserRouter as Router} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes'
import {fetchAllQuestions} from './actions/question'
import { fetchAllUsers } from './actions/users';
import { setCurrentUser } from './actions/currentUser'
import { fetchAllPosts } from './actions/community';

function App() {
  
  const dispatch = useDispatch()
  const User = useSelector((state) => (state.currentUserReducer))
  
  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    dispatch(fetchAllQuestions())
    dispatch(fetchAllPosts())
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar />
          <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
