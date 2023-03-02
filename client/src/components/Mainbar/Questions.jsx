import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
        <div className='display-no-votes'>
            <p>{question.upVotes.length - question.downVotes.length}</p>
            <p>votes</p>
        </div>
        <div className='display-no-ans'>
            <p>{question.noofAnswers}</p>
            <p>answers</p>
        </div>
        <div className='display-question-details'>
            <Link to={`/Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
            <div className='display-tags-time'>
                <div className='display-tags'>
                    {
                        question.questionTags.map((tag) =>(
                            <p key={tag}>{tag}</p>
                        ))
                    }
                </div>
                <p className='display-time'>
                    asked {moment(question.askedOn).fromNow()} by {question.userPosted}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Questions