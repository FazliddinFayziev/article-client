// src/app/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

interface User {
    name?: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const API_URL = '';

interface ResponseData {
    success: boolean;
    data: {
        userId: string;
        token: string;
    };
}

export const registerUser = createAsyncThunk('user/register', async (user: User) => {
    const response = await axios.post<ResponseData>(`${API_URL}/register`, user);
    const data = response.data;

    if (data.success) {
        const { userId, token } = data.data;
        return { userId, token };
    } else {
        throw new Error('Registration failed');
    }
});

export const loginUser = createAsyncThunk('user/login', async (user: User) => {
    const response = await axios.post<ResponseData>(`${API_URL}/login`, user);
    const data = response.data;

    if (data.success) {
        const { userId, token, isAdmin } = data.data;
        return { userId, token, isAdmin };
    } else {
        throw new Error('Login failed');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: null as string | null,
        data: null as { userId: string; token: string } | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to register';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to login';
            });
    },
});

export default userSlice.reducer;
