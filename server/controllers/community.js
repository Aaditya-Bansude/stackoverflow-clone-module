import community from '../models/community.js'
import mongoose from 'mongoose'

export const SendPost  = async (req, res) => {
    const {postTitle, postDescription, fileType, fileURL, userPosted, userId} = req.body;
    const postData = new community({'postTitle': postTitle, 'postDescription': postDescription, 'postFiles': {'fileType': fileType, 'fileURL': fileURL}, 'userPosted': userPosted, 'userId': userId});
    try {
        await postData.save();  
        res.status(200).json("Post successfully")
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post")
    }
}

export const DeletePost  = async (req, res) => {
    const {id:_id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("post unavailable!");
    }

    try {
        await community.findByIdAndRemove(_id); 
        res.status(200).json({message: "post deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}
export const FetchAllPosts  = async (req, res) => {
    try {
        const allPosts = await community.find();
        res.status(200).json(allPosts)
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})
    }
}

export const FetchPostsBy  = async (req, res) => {
    const {parameter, postData} = req.body
    var postsBy
    try { 
        if(parameter === 'userId'){
            postsBy = await community.find({'userId': postData})
        }
        else if(parameter === 'postTitle'){
            postsBy = await community.find({'postTitle': postData})
        }
        res.status(200).json(postsBy)
    } catch (error) {
        console.log(error)
    }
}

export const like_dislike = async (req, res) => {
    const {id:_id} = req.params;
    const {value, userId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("post unavailable!");
    }

    try {
        const post = await community.findById(_id)
        const likeIndex = post.likes.findIndex((id) => id === String(userId))
        const dislikeIndex = post.dislikes.findIndex((id) => id === String(userId))

        if(value === 'like'){
            if(dislikeIndex !== -1){
                post.dislikes = post.dislikes.filter((id) => id !== String(userId))
            }
            if(likeIndex === -1){
                post.likes.push(userId)
            }
            else{
                post.likes = post.likes.filter((id) => id !== String(userId))
            }
        }
        else if(value === 'dislike'){
            if(likeIndex !== -1){
                post.likes = post.likes.filter((id) => id !== String(userId))
            }
            if(dislikeIndex === -1){
                post.dislikes.push(userId)
            }
            else{
                post.dislikes = post.dislikes.filter((id) => id !== String(userId))
            }
        }
        await community.findByIdAndUpdate(_id, post)
        res.status(200).json({message: `${value} the post`})
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}