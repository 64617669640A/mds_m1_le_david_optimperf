import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const TodoListSchema = new Schema({
    text: String,
    isCompleted: {
        type: Boolean,
        defaulte: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})