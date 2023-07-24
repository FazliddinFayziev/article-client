// src/app/redux/article/store.ts
import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articleSlice';
import allowedArticleReducer from './allowedArticleSlice';
import singleArticleReducer from './singleArticleSlice';
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import adminReducer from './adminSlice'; // Import the adminReducer

export const store = configureStore({
    reducer: {
        articles: articleReducer,
        allowedArticles: allowedArticleReducer,
        singleArticle: singleArticleReducer,
        user: userReducer,
        profile: profileReducer,
        admin: adminReducer, // Add the adminReducer to the store
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
