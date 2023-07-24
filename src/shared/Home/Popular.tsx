// components/Popular.tsx
import React, { useEffect, useState } from 'react';
import { FcLike } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../../app/redux/article/hooks";
import { fetchArticles, articleSelector } from "../../app/redux/article/articleSlice";
import { Link } from 'react-router-dom';

const Popular: React.FC = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector(articleSelector);

    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <section className="search">
                <input
                    type="text"
                    placeholder="Search articles by title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </section>
            <section className="articles">
                <h3>Popular Articles</h3>
                <div className="article-grid">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <div className="article-card" key={article.id}>
                                <div className="profile">
                                    {/* image URL */}
                                    <img
                                        src="https://img.freepik.com/free-vector/electronic-document-electronic-paper-paperless-office-internet-article-online-documentation-organization-typing-text-file-computer-vector-isolated-concept-metaphor-illustration_335657-2745.jpg?w=2000"
                                        alt="Profile"
                                    />
                                    <p>{article.authorName}</p>
                                </div>
                                <div className="article-details">
                                    <p>{article.createdAt}</p>
                                    <h2>{article.title.slice(0, 10)}...</h2>
                                    <p>{article.content.slice(0, 200)}...</p>
                                    <Link to={'/register'} className="more">Read more</Link>
                                </div>
                                <div className="like-container">
                                    <div className="like">
                                        <FcLike />
                                        <p style={{ margin: "10px 10px" }}>{article.likesCount}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='no-mach'>
                            <p>No matching articles found.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Popular;
