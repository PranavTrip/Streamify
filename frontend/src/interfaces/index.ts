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