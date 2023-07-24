// components/Popular.tsx
import React, { useEffect, useState } from 'react';
import { FcLike } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../../app/redux/article/hooks";
import { fetchAllowedArticles, allowedArticleSelector, likeArticle } from "../../app/redux/article/allowedArticleSlice"; // Import the fetchAllowedArticles and allowedArticleSelector
import { Link } from 'react-router-dom';

const Articles: React.FC = () => {
    const dispatch = useAppDispatch();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const loading = useAppSelector((state) => state.allowedArticles.loading);

    const allowedArticles = useAppSelector(allowedArticleSelector); // Use the allowedArticleSelector

    useEffect(() => {
        dispatch(fetchAllowedArticles()); // Fetch allowed articles using fetchAllowedArticles
    }, [dispatch]);

    const likeArticleHandler = (articleId: string) => {
        dispatch(likeArticle(articleId)).then(() => {
            // Refetch allowed articles after liking an article
            dispatch(fetchAllowedArticles());
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredArticles = allowedArticles.filter((article) =>
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
            <section className="articles-of-main-page">
                <h3>All Articles</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (

                    <div className="article-grid">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article, index) => (
                                <div className="article-card" key={index}>
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
                                    </div>
                                    <Link className='link' to={`/home/${article._id}`}>
                                        <p className="more" style={{ color: "#000" }}>Read more</p>
                                    </Link>
                                    <div className="like-container">
                                        <div className="like" onClick={() => likeArticleHandler(article._id)}>
                                            <FcLike color={article.liked ? 'blue' : 'black'} />
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
                )}
            </section>
        </>
    );
};

export default Articles;
