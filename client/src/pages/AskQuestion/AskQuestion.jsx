import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './AskQuestion.css'
import {askQuestion} from '../../actions/question'
import { updateNumber } from '../../actions/users'
import Uploading from '../../assets/Uploading.gif'

const AskQuestion = () => {

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')
    const [uploading, setUploading] = useState(false)
    const currentDate = Number((new Date().getFullYear()) + ("0" + (new Date().getMonth()+1)).slice(-2) + ("0" + new Date().getDate()).slice(-2))

    const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()

    const handleSubmit = (e) => { 
        e.preventDefault()
        dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id}, navigate, setUploading))
        dispatch(updateNumber(User?.result?._id, {currentDate: currentDate, noofQuestions: (User?.result?.noofQuestions + 1)}))
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setQuestionBody(questionBody + "\n")
        }
    }

    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask a Public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question to another person</p>
                            <input type="text" id="ask-ques-title" onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g. Is there an R function for finding the index of an element in a vector?' />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea id="ask-ques-body" onChange={(e) => {setQuestionBody(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <input type="text" id="ask-ques-tags" onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. (xml, javascript, wordpress)'/>
                        </label>
                    </div>
                    <div className='submit-upload'>
                        <input type="submit" value="Review your question" className='review-ques-btn'/>
                        {
                            uploading && 
                            <>
                                <img src={Uploading} alt="Uploading..." className='uploading-symbol'/>
                                <p className='uploading-note'>Uploading... please do not refresh the page</p>
                            </>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AskQuestion