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

export const getUserMessagesFromStream = async (userId, friendsList) => {
    const promises = friendsList.map(async friendId => {
        const filters = {
            type: 'messaging',
            member_count: 2,
            members: { $eq: [userId, friendId] },
        };

        const [channel] = await streamClient.queryChannels(filters, [{ last_message_at: -1 }], {
            watch: true,
            state: true,
        });

        if (!channel) return null;

        const lastRead = channel.state.read[userId]?.last_read
            ? new Date(channel.state.read[userId].last_read)
            : new Date(0);

        const unreadFriendMessages = channel.state.messages.filter(msg =>
            msg.user.id === friendId && new Date(msg.created_at) > lastRead
        );

        if (unreadFriendMessages?.length > 0) {
            return {
                friendId,
                unreadMessages: unreadFriendMessages.length,
            };
        }

        return null;
    });

    const results = (await Promise.all(promises)).filter(Boolean);
    return results;
};