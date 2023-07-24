// src/app/redux/article/adminSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AdminState {
    loading: boolean;
    error: string | null;
    users: User[];
}

const initialState: AdminState = {
    loading: false,
    error: null,
    users: [],
};

interface MakeUserAdminResponse {
    success: boolean;
    data: {
        userId: string;
        email: string;
        isAdmin: boolean;
    };
}

const API_URL = '/users'; // Replace this with your backend API URL

export const makeUserAdmin = createAsyncThunk(
    'admin/makeUserAdmin',
    async (userId: string, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await axios.put<MakeUserAdminResponse>(
                `${API_URL}/${userId}`,
                { isAdmin: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    const response = await axios.get(`${API_URL}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
        },
    });

    const users: User[] = response.data.data;
    return users;
});

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(makeUserAdmin.fulfilled, (state, action) => {
                // Find the user in state and update their isAdmin property to true
                const userId = action.payload.userId;
                const user = state.users.find((user) => user._id === userId);
                if (user) {
                    user.isAdmin = true;
                }
            })
            .addCase(makeUserAdmin.rejected, (state, action) => {
                // Handle any error if needed
                console.error('Failed to make user admin:', action.error);
            });
    },
});

export default adminSlice.reducer;
