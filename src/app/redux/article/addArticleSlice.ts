import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export interface Article {
    title: string;
    content: string;
}

const API_URL = '/articles';

// Add userId and token as parameters to the createAsyncThunk function
export const addArticle = createAsyncThunk('addArticle', async ({ article, userId, token }: { article: Article, userId: string, token: string }) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}`, article, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Assuming the response contains the newly added article data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add article');
    }
});

const addArticleSlice = createSlice({
    name: 'addArticle',
    initialState: {
        loading: false,
        error: null as string | null,
        data: null as Article | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = null;
            })
            .addCase(addArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(addArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add article';
                state.data = null;
            });
    },
});

export default addArticleSlice.reducer;
