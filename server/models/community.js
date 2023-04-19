import mongoose from 'mongoose'

const CommunitySchema = mongoose.Schema({
    postTitle: {type: String, required: "Post must have a title"},
    postDescription: {type: String, required: "Post must have a description"},
    postFiles: {
        fileType: {type: String},
        fileURL: {type: String},
    },
    likes: {type: [String], default: []},
    dislikes: {type: [String], default: []},
    userPosted: {type: String, required: "Post must have an author"},
    userId: {type: String},
    postedOn: {type: Date, default: Date.now},
})

export default mongoose.model("Community", CommunitySchema)