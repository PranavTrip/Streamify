import type { ReactNode } from "react";

export interface SignupData {
    email: string;
    password: string;
    fullName: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface OnboardingData {
    fullName: string;
    bio: string;
    nativeLanguage: string;
    learningLanguage: string;
    location: string;
    profilePic: string;
}
export interface LayoutProps {
    showSidebar?: boolean
    children: ReactNode
}

export interface Friend {
    _id: string;
    fullName: string;
    profilePic: string;
    nativeLanguage: string;
    learningLanguage: string;
};

export interface FriendsCardProps {
    friend: Friend;
}

export interface User {
    _id: string;
    fullName: string;
    profilePic: string;
    nativeLanguage: string;
    learningLanguage: string;
    location?: string;
    bio?: string;
}