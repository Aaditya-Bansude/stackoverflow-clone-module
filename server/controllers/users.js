import mongoose from 'mongoose'
import user from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user.find()
        const allUsersDetails = []
        allUsers.forEach(users => {
            allUsersDetails.push({_id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn, subscriptionDate: users.subscriptionDate, noofQuestions: users.noofQuestions, subscriptionPlan: users.subscriptionPlan, connections: users.connections})
        })
        res.status(200).json(allUsersDetails)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateProfile = async (req, res) => {
    const {id: _id} = req.params;
    const {name, about, tags} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("user don't exist!");
    }

    try {
        const updatedProfile = await user.findByIdAndUpdate(_id, {$set: {'name': name, 'about': about, 'tags': tags}}, {new: true})
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message: error.message})
    }
}

export const updateNumber = async (req, res) => {
    const { id: _id } = req.params;
    const {currentDate, noofQuestions} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("user don't exist!"); 
    }

    try {
        const updatedNumber = await user.findByIdAndUpdate(_id, {$set: { 'lastLoginDate': currentDate, 'noofQuestions': noofQuestions}}, {new: true})
        res.status(200).json(updatedNumber)
    } catch (error) {
        console.log(error)
        res.status(405).json({message: error.message})
    }
}

export const updateSubscription = async (req, res) => {
    const { id: _id } = req.params;
    const {subscriptionDate, subscriptionPlan, sessionId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("user don't exist!"); 
    }

    try {
        const updatedSubscription = await user.findByIdAndUpdate(_id, {$set: { 'subscriptionPlan': subscriptionPlan, 'subscriptionDate': subscriptionDate, 'sessionId': sessionId}}, {new: true})
        res.status(200).json(updatedSubscription)
    } catch (error) {
        console.log(error)
        res.status(405).json({message: error.message})
    }
}

export const addFriend = async (req, res) => {
    const {_id, userId, userName} = req.body

    if(!mongoose.Types.ObjectId.isValid(userId)){
        console.log(10)
        return res.status(404).json({message: "user doesn't exist!"}) 
    }

    try {
        const addFriend = await user.findByIdAndUpdate(_id, {$addToSet: {'connections': {'userId': userId, 'userName': userName}}}, {new: true})  
        res.status(200).json(addFriend)  
    } catch (error) {
        console.log(error)
        res.status(405).json({message: error.message})
    }
}

export const removeFriend = async (req, res) => {
    const {_id, userId} = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("user don't exist!"); 
    }

    try {
        await user.updateOne({_id}, {$pull : {'connections': {'userId': userId}}}, {new: true})  
        res.status(200).json({message: "remove from connections successfully"}) 
    } catch (error) {
        console.log(error)
        res.status(405).json({message: error.message})
    }
}