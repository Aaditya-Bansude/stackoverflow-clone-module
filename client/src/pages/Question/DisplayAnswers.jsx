import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import moment  from 'moment'
import Avatar from '../../components/Avatar/Avatar'
import { deleteAnswer } from '../../actions/question'

const DisplayAnswers = ({question, handleShare}) => {

    const User = useSelector((state) => (state.currentUserReducer))
    const {id} = useParams()
    const dispatch = useDispatch()

    const handleDelete = (answerId, noofAnswers) => {
        dispatch(deleteAnswer(id, answerId, noofAnswers-1))
    }

    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className='display-ans' key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className='question-actions-user'>
                            <div>
                                <button type='button' onClick={handleShare}>Share</button>
                                {
                                    User?.result?._id === ans?.userId && (
                                        <button type='button' onClick={() => handleDelete(ans._id, question.noofAnswers)}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className='user-link' style={{color: "#0086d8"}}>
                                    <Avatar backgroundColor="green" px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>{ans.userAnswered}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswers