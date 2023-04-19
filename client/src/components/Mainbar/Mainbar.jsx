import React from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Mainbar.css'
import QuestionsList from './QuestionsList'

const Mainbar = () => {

  const location = useLocation()
  // var User = useSelector((state) => (state.currentUserReducer))
  const id = JSON.parse(localStorage.getItem('Profile'))?.result?._id
  const users = useSelector((state) => state.usersReducer)
  const User = users.filter((user) => user._id === id)[0]
  const navigate = useNavigate();

  const questionsList = useSelector(state => state.questionsReducer)

  const checkUser = () => {
    if(User === undefined){
      alert("login or signup to ask a question")
      navigate('/Auth')
    }
    else{
      if(User?.subscriptionPlan === "free" && User?.noofQuestions < 1){
        navigate('/AskQuestion')
      }
      else if(User?.subscriptionPlan === "silver" && User?.noofQuestions < 5){
        navigate('/AskQuestion')
      }
      else if(User?.subscriptionPlan === "gold"){
        navigate('/AskQuestion')
      }
      else{
        alert("You've reached your daily questions limit for current plan.\nUpgrade your plan to continue or wait for next day")
        navigate('/Subscription')
      }
    }
  }

  return (
    <div class="main-bar">
      <div class="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }  
        <button onClick={checkUser} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data === null ?
          <h1>Loading...</h1> : 
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionsList questionsList={questionsList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default Mainbar
