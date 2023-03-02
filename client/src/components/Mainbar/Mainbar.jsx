import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Mainbar.css'
import QuestionsList from './QuestionsList'

const Mainbar = () => {

  const location = useLocation()
  var User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate();

  const questionsList = useSelector(state => state.questionsReducer)

  const checkUser = () => {
    if(User === null){
      alert("login or signup to ask a question")
      navigate('/Auth')
    }
    else{
      navigate('/AskQuestion')
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


// var questionsList = [
//   {
//     _id: 1,
//     upVotes: 2,
//     downVotes: 1,
//     noofAnswers: 3,
//     questionTitle: "What is recursive function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript", "python", "R"],
//     userPosted: "xyz",
//     userId: 1,
//     askedOn: "jan 1",
//     answer: [{
//       answerBody: "Answer",
//       userAnswered: "abc",
//       answeredOn: "jan 2",
//       userId: 2
//     }]
//   },{
//     _id: 2,
//     upVotes: 4,
//     downVotes: 1,
//     noofAnswers: 2,
//     questionTitle: "What is recursive function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript", "python", "R"],
//     userPosted: "xyz",
//     userId: 2,
//     askedOn: "jan 1",
//     answer: [{
//       answerBody: "Answer",
//       userAnswered: "abc",
//       answeredOn: "jan 2",
//       userId: 2
//     }]
//   }
// ]