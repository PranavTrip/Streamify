import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests, getUserFriends } from "../lib/api"
import FriendsCard from "../components/FriendsCard"
import type { Friend } from "../interfaces"
import NoFriendsFound from "../components/NoFriendsFound"
import NoRequests from "../components/NoRequest"

const FriendsPage = () => {
    const queryClient = useQueryClient()

    // Get existing friends
    const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    })

    // Sent Friend Requests
    const { data: outgoingFriendRequests } = useQuery({
        queryKey: ["outgoingFriendRequests"],
        queryFn: getOutgoingFriendRequests,
    })


    // Incoming Friend Requests
    const { data: friendRequests } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
    })
    const { mutate: acceptRequestMutation, isPending } = useMutation({
        mutationFn: acceptFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] })
            queryClient.invalidateQueries({ queryKey: ["friends"] })

        }
    })


    const incomingRequests = friendRequests?.incomingRequests;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto space-y-10">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>

                {/* Show All Friends */}
                {loadingFriends ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                ) : friends.length === 0 ? (
                    <NoFriendsFound />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {friends.map((friend: Friend) => (
                            <FriendsCard key={friend._id} friend={friend} />
                        ))}
                    </div>
                )}

                {/* Show Incoming Friend Requests */}
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Pending Requests</h2>
                <div className="space-y-3">
                    {incomingRequests?.length === 0 ? <NoRequests /> : <>
                        {incomingRequests?.map((request: any) => (
                            <div
                                key={request._id}
                                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="card-body p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                                                <img src={request.sender.profilePic} alt={request.sender.fullName} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{request.sender.fullName}</h3>
                                                <div className="flex flex-wrap gap-1.5 mt-1">
                                                    <span className="badge badge-secondary badge-sm">
                                                        Native: {request.sender.nativeLanguage}
                                                    </span>
                                                    <span className="badge badge-outline badge-sm">
                                                        Learning: {request.sender.learningLanguage}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => acceptRequestMutation(request._id)}
                                            disabled={isPending}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>}

                </div>

                {/* Show Sent Friend Requests */}
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Sent Requests</h2>
                {outgoingFriendRequests?.length === 0 ? <NoRequests /> : <>
                    {outgoingFriendRequests?.map((request: any) => {
                        return (
                            <div
                                key={request?.recipient?._id}
                                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="card-body p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                                                <img src={request?.recipient?.profilePic} alt={request?.recipient?.fullName} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{request?.recipient?.fullName}</h3>
                                                <div className="flex flex-wrap gap-1.5 mt-1">
                                                    <span className="badge badge-secondary badge-sm">
                                                        Native: {request.recipient.nativeLanguage}
                                                    </span>
                                                    <span className="badge badge-outline badge-sm">
                                                        Learning: {request.recipient.learningLanguage}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>}
            </div>
        </div>
    )
}

export default FriendsPage