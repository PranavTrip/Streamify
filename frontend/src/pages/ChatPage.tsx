import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router";
import { getStreamToken } from "../lib/api";
import { useEffect, useState } from "react";
import useAuthuser from "../hooks/useAuthuser";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CallButton from "../components/CallButton";

const ChatPage = () => {
  const { id: targetUserId } = useParams()
  const [chatClient, setChatClient] = useState<any>(null)
  const [channel, setChannel] = useState<any>(null)
  const [loading, setLoading] = useState<Boolean | null>(null)

  const { authUser } = useAuthuser()

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
  })
  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY
  useEffect(() => {
    const initializeChat = async () => {
      if (!tokenData?.token || !authUser) {
        return
      }
      try {
        console.log("Initializing Stream Chat")
        const client = StreamChat.getInstance(STREAM_API_KEY)
        await client.connectUser({ id: authUser?._id, name: authUser?.fullName, image: authUser?.profilePic }, tokenData?.token)
        const channelId = [authUser?._id, targetUserId].sort().join("-")

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser?._id, targetUserId]
        })

        await currentChannel.watch();
        setChatClient(client)
        setChannel(currentChannel)

      } catch (error) {
        console.error("Error Initializing Chat", error)
        toast.error("Error starting chat")
      }
      finally {
        setLoading(false)
      }
    }
    initializeChat()
  }, [tokenData, authUser, targetUserId])

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };
  if (loading || !chatClient || !channel) return <ChatLoader />
  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage