// src/app/redux/article/allowedArticleSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { AppDispatch, RootState } from "./store";

export interface AllowedArticle {
    _id: string;
    title: string;
    content: string;
    author: string;
    authorName: string;
    createdAt: string;
    likesCount: number;
    liked: boolean;
}

const initialState: Array<AllowedArticle> = [];


export const allowedArticleSlice = createSlice({
    name: "allowedArticles",
    initialState,
    reducers: {
        addAllowedArticle: (state, action: PayloadAction<AllowedArticle>) => {
            state.push({ ...action.payload, liked: false });
        },
        setAllowedArticles: (state, action: PayloadAction<AllowedArticle[]>) => {
            return action.payload.map(article => ({ ...article, liked: false }));
        },
    },
});

export const likeArticle = createAsyncThunk(
    'allowedArticles/likeArticle',
    async (articleId: string, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post<{ likesCount: number }>(
                `/articles/${articleId}/like`,
                {},
                { headers }
            );

            return response.data.likesCount;
        } catch (error) {
            throw new Error(error.message || 'Failed to like article');
        }
    }
);


export const { addAllowedArticle, setAllowedArticles } = allowedArticleSlice.actions;

export const allowedArticleSelector = (state: RootState) => state.allowedArticles;

// Async action to fetch allowed articles using axios
export const fetchAllowedArticles = () => async (dispatch: AppDispatch) => {
    try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        if (!token) {
            console.error("No token found in localStorage.");
            return;
        }

        const response = await axios.get("/articles", {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
            },
        });

        const allowedArticlesData: AllowedArticle[] = response.data.data;
        dispatch(setAllowedArticles(allowedArticlesData));
    } catch (error) {
        // Handle error here
        console.error("Error fetching allowed articles:", error);
    }
};

export default allowedArticleSlice.reducer;
