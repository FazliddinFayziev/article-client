// src/app/redux/article/singleArticleSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';


export interface SingleArticle {
    comments: Comment[];
}

export interface Comment {
    _id: string;
    content: string;
    authorName: string;
    createdAt: string;
}

export interface PostCommentPayload {
    articleId: string;
    content: string;
    authorId: string;
}

// Create async thunk to post a comment
export const postComment = createAsyncThunk(
    'singleArticle/postComment',
    async (payload: PostCommentPayload, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post<Comment>(
                `/articles/${payload.articleId}/comments`,
                { content: payload.content, author: payload.authorId },
                { headers }
            );

            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to post comment');
        }
    }
);


export interface SingleArticle {
    _id: string;
    title: string;
    content: string;
    author: string;
    authorName: string;
    createdAt: string;
    likesCount: number;
}

interface SingleArticleState {
    loading: boolean;
    error: string | null;
    data: SingleArticle | null;
}

const initialState: SingleArticleState = {
    loading: false,
    error: null,
    data: null,
};

const API_URL = '/articles'; // Replace with the actual URL for fetching single articles

export const fetchSingleArticle = createAsyncThunk(
    'singleArticle/fetchSingleArticle',
    async (articleId: number, thunkAPI) => { // Destructure the thunkAPI to access getState function
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            // Set the authorization header with the token
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // Fetch the single article data with the articleId as a URL parameter and headers
            const response = await axios.get(`${API_URL}/${articleId}`, { headers });
            return response.data.data;
        } catch (error) {
            // Handle error here
            throw new Error(error.message || 'Failed to fetch single article');
        }
    }
);

const singleArticleSlice = createSlice({
    name: 'singleArticle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSingleArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch single article';
            });
    },
});

export default singleArticleSlice.reducer;
