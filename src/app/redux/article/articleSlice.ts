import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { AppDispatch, RootState } from "./store";

export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    authorName: string;
    createdAt: string;
    likesCount: number;
}

const initialState: Array<Article> = [];

export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        addArticle: (state, action: PayloadAction<Article>) => {
            state.push(action.payload);
        },
        setArticles: (state, action: PayloadAction<Article[]>) => {
            return action.payload;
        },
    },
});

export const { addArticle, setArticles } = articleSlice.actions;

export const articleSelector = (state: RootState) => state.articles;

// Async action to fetch articles using axios
export const fetchArticles = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("/articlespopular");
        const articlesData: Article[] = response.data.data; // Assuming the response data has an array of articles with the "data" property
        dispatch(setArticles(articlesData));
    } catch (error) {
        // Handle error here
        console.error("Error fetching articles:", error);
    }
};

export default articleSlice.reducer;
