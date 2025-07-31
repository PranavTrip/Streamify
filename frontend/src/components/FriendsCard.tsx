import { Link } from "react-router"
import { LANGUAGE_TO_FLAG } from "../constants";
import type { FriendsCardProps } from "../interfaces";

const FriendsCard = ({ friend, unreadCount }: FriendsCardProps) => {
    return (
        <div className="card bg-base-200 hover:shadow-md transition-shadow">
            {unreadCount > 0 && <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white">
                {unreadCount}
            </span>}
            <div className="card-body p-4">
                {/* USER INFO */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="avatar size-12">
                        <img src={friend.profilePic} alt={friend.fullName} />
                    </div>
                    <h3 className="font-semibold truncate">{friend.fullName}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="badge badge-secondary text-xs">
                        {getLanguageFlag(friend.nativeLanguage)}
                        Native: {friend.nativeLanguage}
                    </span>
                    <span className="badge badge-outline text-xs">
                        {getLanguageFlag(friend.learningLanguage)}
                        Learning: {friend.learningLanguage}
                    </span>
                </div>

                <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
                    Message
                </Link>
            </div>
        </div>
    )
}

export default FriendsCard

export function getLanguageFlag(language: string) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower as keyof typeof LANGUAGE_TO_FLAG];

    if (countryCode) {
        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className="h-3 mr-1 inline-block"
            />
        );
    }
    return null;
}