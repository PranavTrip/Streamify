import type { LoginData, OnboardingData, SignupData } from "../interfaces";
import { axiosInstance } from "./axios";

export const signup = async (signupData: SignupData) => {
    const response = await axiosInstance.post('/auth/signup', signupData);
    return response?.data;
}

export const login = async (loginData: LoginData) => {
    const response = await axiosInstance.post('/auth/login', loginData);
    return response?.data;
}

export const logout = async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response?.data;
}

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get('/auth/me');
        return res?.data;
    } catch (error) {
        return null
    }
}

export const completeOnboarding = async (userData: OnboardingData) => {
    const res = await axiosInstance.post('/auth/onboarding', userData);
    return res?.data;
}

export const getUserFriends = async () => {
    const response = await axiosInstance.get('/users/friends');
    return response?.data;
}

export const getRecommendedUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response?.data;
}

export const getOutgoingFriendRequests = async () => {
    const response = await axiosInstance.get('/users/outgoing-friend-requests');
    return response?.data;
}

export const sendFriendRequests = async (userId: string) => {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response?.data;
}

export const getFriendRequests = async () => {
    const response = await axiosInstance.get(`/users/friend-requests`);
    return response?.data;
}

export const acceptFriendRequest = async (userId: string) => {
    const response = await axiosInstance.put(`/users/friend-request/${userId}/accept`);
    return response?.data;
}


export async function getStreamToken() {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
}

export async function getUserMessages() {
    const response = await axiosInstance.get("/users/messages");
    return response.data;
}