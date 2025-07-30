import mongoose from 'mongoose'


const URI = process.env.MONGO_URI


export const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected')
    } catch (err) {
        console.log('Failed to connect with MongoDB', err)
        process.exit(1)
    }
}