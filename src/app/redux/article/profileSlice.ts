// src/app/redux/profileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface Article {
    _id: string;
    title: string;
    content: string;
}

interface UserProfile {
    user: User;
    articles: Article[];
}

const initialState: UserProfile = {
    user: { _id: '', name: '', email: '' },
    articles: [],
};

const API_URL = '/users'; // Replace this with your backend API URL

export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    const response = await axios.get(`${API_URL}/${userId}/articles`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const userProfile: UserProfile = response.data.data;
    return userProfile;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                // Set loading state while fetching user profile data
                // You can use this loading state to display a loading spinner if needed
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                // Set the fetched user profile data in the state
                state.user = action.payload.user;
                state.articles = action.payload.articles;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                // Handle any error that occurs while fetching user profile data
                console.error('Error fetching user profile:', action.error);
            });
    },
});

export default profileSlice.reducer;