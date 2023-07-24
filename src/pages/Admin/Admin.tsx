// components/AdminPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/article/hooks';
import { fetchAllUsers } from '../../app/redux/article/adminSlice';
import { RootState } from '../../app/redux/article/store';
import { makeUserAdmin } from '../../app/redux/article/adminSlice';
import './Admin.css';
import Header from './Header';

const AdminPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const adminData = useAppSelector((state: RootState) => state.admin);

    useEffect(() => {
        dispatch(fetchAllUsers()).catch((error) => {
            if (error.response && error.response.status === 403) {
                console.log('You are not an admin.');
            }
        });
    }, [dispatch]);

    const handleMakeAdmin = (userId: string) => {
        dispatch(makeUserAdmin(userId));
    };

    return (
        <div>
            <Header />
            <h1>Admin Page</h1>
            {adminData.loading ? (
                <p>Loading...</p>
            ) : adminData.error ? (
                <h1>You are not an admin</h1>
            ) : (
                <ul>
                    {adminData.users.map((user) => (
                        <li key={user._id}>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            {!user.isAdmin ? <button onClick={() => handleMakeAdmin(user._id)}>Make Admin</button> : <p style={{ color: "Green", fontWeight: 800 }}>Admin</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPage;
