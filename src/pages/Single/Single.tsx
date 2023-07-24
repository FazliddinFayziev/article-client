// components/Single.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/redux/article/hooks';
import { fetchSingleArticle, postComment, SingleArticle } from '../../app/redux/article/singleArticleSlice';
import './Single.css';
import Header from '../../shared/Main/Header';

const Single: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const dispatch = useAppDispatch();
    const singleArticleData = useAppSelector((state) => state.singleArticle.data);
    const loading = useAppSelector((state) => state.singleArticle.loading);
    const error = useAppSelector((state) => state.singleArticle.error);

    useEffect(() => {
        dispatch(fetchSingleArticle(articleId));
    }, [dispatch, articleId]);

    useEffect(() => {
        console.log(singleArticleData)
    }, [singleArticleData])


    const [commentContent, setCommentContent] = useState<string>('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentContent(event.target.value);
    };

    const handlePostComment = async () => {
        if (commentContent.trim() !== '') {
            await dispatch(postComment({ articleId, content: commentContent.trim() }));

            dispatch(fetchSingleArticle(articleId));

            setCommentContent('');
        }
    };

    return (
        <>
            <Header />
            <div className="single-article-container">
                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {singleArticleData && (
                    <div className=".article-card-single">
                        <div className="author-info">
                            <img
                                src="https://previews.123rf.com/images/vectorknight/vectorknight1806/vectorknight180600002/102829754-writer-writing-on-computer-paper-sheet-vector-illustration-flat-cartoon-person-editor-write.jpg"
                                alt="Author Profile"
                                className="author-profile-image"
                            />
                            <p className="author-name">{singleArticleData.authorName}</p>
                        </div>
                        <h2 className="article-title">{singleArticleData.title}</h2>
                        <p className="article-content">{singleArticleData.content}</p>
                        <p className="article-info">Likes: {singleArticleData.likesCount}</p>
                        <div className="comment-input-container">
                            <input
                                type="text"
                                value={commentContent}
                                onChange={handleCommentChange}
                                placeholder="Enter your comment..."
                            />
                            <button onClick={handlePostComment}>Post</button>
                        </div>
                        <h3 className="comments-title">Comments:</h3>
                        {singleArticleData.comments.length > 0 ? (
                            singleArticleData.comments.map((comment) => (
                                <div className="comment" key={comment._id}>
                                    <div className="comment-author-info">
                                        <img
                                            src="https://previews.123rf.com/images/vectorknight/vectorknight1806/vectorknight180600002/102829754-writer-writing-on-computer-paper-sheet-vector-illustration-flat-cartoon-person-editor-write.jpg"
                                            alt="Comment Author Profile"
                                            className="comment-author-profile-image"
                                        />
                                        <p className="comment-author-name">{comment.authorName}</p>
                                    </div>
                                    <p className="comment-content">{comment.content}</p>
                                    <p className="comment-info">Created at: {comment.createdAt}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-comments-message">No comments yet.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Single;
