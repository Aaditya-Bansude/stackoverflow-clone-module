import questions from '../models/questions.js'
import mongoose from 'mongoose'

export const postAnswer  = async (req, res) => {
    const {id: _id} = req.params;
    const {noofAnswers, answerBody, userAnswered, userId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable!");
    }

    updateNoofQuestions(_id, noofAnswers);

    try {
        const updatedQuestion = await questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId}]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const {id:_id} = req.params;
    const {answerId, noofAnswers} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable!");
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("answer unavailable!");
    }

    updateNoofQuestions(_id, noofAnswers);

    try {
        await questions.updateOne(
            {_id},
            {$pull: {'answer': {_id: answerId}}}
        )
        res.status(200).json({message: "answer deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(405).json(error)
    }
}

const updateNoofQuestions = async (_id, noofAnswers) => {
    try {
        await questions.findByIdAndUpdate(_id, { $set: { 'noofAnswers': noofAnswers}})
    } catch (error) {
        console.log(error)
    }
}