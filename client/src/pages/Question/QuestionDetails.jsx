import React, {useState} from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import UpVote from '../../assets/UpVote.png'
import DownVote from '../../assets/DownVote.png'
import './Question.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswers from './DisplayAnswers'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'


const QuestionDetails = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const User = useSelector((state) => (state.currentUserReducer))
    const questionsList = useSelector(state => state.questionsReducer)
    const [answer, setAnswer] = useState('')
    const url = 'http://localhost:3000'+location.pathname

    const handleSubmit = (e, answerLength) => {
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to answer a question')
            navigate('/Auth')
        }
        else{
            if(answer === ''){
                alert('Enter an answer before submitting')
            }else{
                dispatch(postAnswer({id, noofAnswers: answerLength + 1, answerBody: answer, userAnswered: User.result.name, userId: User.result._id}))
            }
        }
    }

    const handleShare = () => {
        copy(url)
        alert('copied url: '+url)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', User.result._id))
    }

    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                <h1>Loading...</h1>:
                <>
                    {
                        questionsList.data.filter(question => question._id === id).map(question => (
                            <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className="question-votes">
                                            <img src={UpVote} alt="Up" width='20px' className='votes-icon' onClick={handleUpVote}/>
                                            <p>{question.upVotes.length - question.downVotes.length}</p>
                                            <img src={DownVote} alt="Down" width='20px' className='votes-icon' onClick={handleDownVote}/>
                                        </div>
                                        <div style={{width: "100%"}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className="question-details-tags">
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='question-actions-user'>
                                                <div>
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {
                                                        User?.result?._id === question?.userId && (
                                                            <button type='button' onClick={handleDelete}>Delete</button>
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color: "#0086d8"}}>
                                                        <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                        <div>{question.userPosted}</div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {
                                    question.noofAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noofAnswers} Answers</h3>
                                            <DisplayAnswers key={question._id} question={question} handleShare={handleShare}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Answer</h3>
                                    <form onSubmit={(e) => {handleSubmit(e, question.answer.length) }}>
                                        <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br />
                                        <input type="submit" className='post-ans-btn' value='Post Your Answer'/>
                                    </form>
                                    <p>
                                        Browse other Question Tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                                            ))
                                        } or 
                                        <Link to='/AskQuestion' style={{textDecoration: "none", color: "#009dff"}}> ask your own question.</Link>
                                    </p>
                                </section>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default QuestionDetails