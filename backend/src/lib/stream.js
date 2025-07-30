import { StreamChat } from 'stream-chat'
import 'dotenv/config'

const api_key = process.env.STREAM_API_KEY

const secret_key = process.env.STREAM_SECRET_KEY

if (!api_key || !secret_key) {
    console.error("Stream API Key or Secret Key missing")
}

const streamClient = StreamChat.getInstance(api_key, secret_key);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.error("Error creating Stream User", error)
    }
}

export const generateStreamToken = async (userId) => {
    try {
        const userIdString = userId.toString()
        return streamClient.createToken(userIdString)
    } catch (error) {
        console.error("Error generating Stream token", error)
    }

}