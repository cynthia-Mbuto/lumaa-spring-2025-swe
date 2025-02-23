import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTask } from '../services/taskService';

const DeleteTask: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');

    const handleDelete = async () => {
        if (!token || !id) {
            setError('Missing required data');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await deleteTask(token, id);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to delete task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Delete Task</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <p>Are you sure you want to delete this task?</p>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
            >
                {loading ? 'Deleting...' : 'Delete Task'}
            </button>
            <button
                className="btn btn-secondary ml-3"
                onClick={() => navigate('/dashboard')}
            >
                Cancel
            </button>
        </div>
    );
};

export default DeleteTask;
