import useAuthuser from '../hooks/useAuthuser'
import { Link, useLocation } from 'react-router'
import useLogout from '../hooks/useLogout'
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react'
import ThemeSelector from './ThemeSelector'
import { useQuery } from '@tanstack/react-query'
import { getFriendRequests } from '../lib/api'

const Navbar = () => {
    const { authUser } = useAuthuser()
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const { data: friendRequests } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
    })
    const { logoutMutation } = useLogout()
    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end w-full">
                    {/* LOGO - ONLY IN THE CHAT PAGE */}
                    {isChatPage && (
                        <div className="pl-5">
                            <Link to="/" className="flex items-center gap-2.5">
                                <ShipWheelIcon className="size-9 text-primary" />
                                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                                    Streamify
                                </span>
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle relative">
                                {friendRequests?.incomingRequests?.length > 0 && <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white">
                                    {friendRequests?.incomingRequests?.length}
                                </span>}
                                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                    </div>

                    <ThemeSelector />

                    <div className="avatar">
                        <div className="w-9 rounded-full">
                            <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
                        </div>
                    </div>

                    {/* Logout button */}
                    <button className="btn btn-ghost btn-circle" onClick={() => logoutMutation()}>
                        <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar