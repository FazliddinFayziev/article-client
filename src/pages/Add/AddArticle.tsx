import React, { useState } from 'react';
import './AddArticle.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addArticle } from '../../app/redux/article/addArticleSlice'; // Import the addArticle action

interface Article {
    title: string;
    content: string;
}

// ... (import statements)

const AddArticle: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [article, setArticle] = useState<Article>({
        title: '',
        content: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Get the userId and token from localStorage
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            if (!userId || !token) {
                throw new Error('User ID or token not found in localStorage');
            }

            // Dispatch the addArticle action with article data, userId, and token
            await dispatch(addArticle({ article, userId, token }));
            setLoading(false);
            // Clear form fields on successful submission
            setArticle({ title: '', content: '' });
            // Navigate to home page on successful submission
            navigate('/home');
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="add-article">
            <h2>Add Article</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        placeholder="Enter article title"
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        placeholder="Enter article content"
                        rows={6}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <Link className='go-back' to={'/home'}>Go Back</Link>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};


export default AddArticle;
