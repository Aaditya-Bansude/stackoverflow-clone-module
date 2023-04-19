import * as api from '../api'

export const askQuestion = (questionData, navigate, setUploading) => async (dispatch) => {
  try {
      setUploading(true)
      const {data} = await api.postQuestion(questionData)
      dispatch({type: "POST_QUESTION", payload: data})
      dispatch(fetchAllQuestions())
      setUploading(false)
      navigate('/')
  } catch (error) {
      alert(error.response.data.message)
      setUploading(false)
  }
}

export const fetchAllQuestions = () => async (dispatch) => {
  try {
      const {data} = await api.getAllQuestions()
      dispatch({type: "FETCH_ALL_QUESTIONS", payload: data})
  } catch (error) {
      console.log(error)
  }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    const {data} = api.deleteQuestion(id)
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const postAnswer = (answerData, setUploading) => async (dispatch) => {
  try {
      setUploading(true)
      const {id, noofAnswers, answerBody, userAnswered, userId} = answerData
      const {data} = await api.postAnswer(id, noofAnswers, answerBody, userAnswered, userId)
      dispatch({type: 'POST_ANSWER', payload: data})
      setUploading(false)
      dispatch(fetchAllQuestions())
  } catch (error) {
      alert(error.response.data.message)
      setUploading(false)
  }
}

export const deleteAnswer = (id, answerId, noofAnswers) => async (dispatch) => {
  try {
      const {data} = await api.deleteAnswer(id, answerId, noofAnswers) 
      dispatch(fetchAllQuestions())
  } catch (error) {
      console.log(error)
  }
}

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const {data} = await api.voteQuestion(id, value, userId)
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error)
  }
}
