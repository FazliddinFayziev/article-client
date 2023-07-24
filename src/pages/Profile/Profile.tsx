// components/UserProfile.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/article/hooks';
import { fetchUserProfile } from '../../app/redux/article/profileSlice';
import { RootState } from '../../app/redux/article/store';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../shared/Main/Header';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userProfile = useAppSelector((state: RootState) => state.profile);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const handleLogout = () => {
        navigate('/')
    };

    return (
        <>
            <Header />
            {userProfile.loading ? (
                <div>Loading...</div>
            ) : (
                <div className="user-profile">
                    <div className="profile-container">
                        <img src="https://previews.123rf.com/images/vectorknight/vectorknight1806/vectorknight180600002/102829754-writer-writing-on-computer-paper-sheet-vector-illustration-flat-cartoon-person-editor-write.jpg" alt="Profile" className="profile-image" />
                        <h2 className="profile-name">{userProfile.user.name}</h2>
                        <div>
                            <Link to="/home" className="home-button">
                                Home
                            </Link>
                            <button className="logout-button" onClick={handleLogout}>Log out</button>
                        </div>
                    </div>
                    <div className="user-articles">
                        <h3>Your Articles</h3>
                        {userProfile.articles.length > 0 ? (
                            <ul className="article-list">
                                {userProfile.articles.map((article) => (
                                    <li key={article._id} className="article-item">
                                        <h4>{article.title}</h4>
                                        <p>{article.content}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No articles added yet.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
