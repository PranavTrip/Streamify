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

export const getAuthUser = async () => {
    const res = await axiosInstance.get('/auth/me');
    return res?.data;
}

export const completeOnboarding = async (userData: OnboardingData) => {
    const res = await axiosInstance.post('/auth/onboarding', userData);
    return res?.data;
}