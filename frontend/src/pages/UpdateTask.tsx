import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../services/taskService';

interface Task {
    title: string;
    description: string;
    iscomplete: boolean;
}

const UpdateTask: React.FC = () => {
    const [task, setTask] = useState<Task>({
        title: '',
        description: '',
        iscomplete: false
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!token) {
            setError('You must be logged in to update a task');
            return;
        }

        setLoading(true);
        setError('');

        // Fetch the task details using its ID
        const fetchTask = async () => {
            try {
                const taskData = await getTaskById(token, id as string);
                setTask(taskData);
            } catch (error) {
                setError('Error fetching task');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!task || !token || !id) {
            setError('Missing required data');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await updateTask(token, id, task.title, task.description, task.iscomplete);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading task...</div>;

    return (
        <div className="container mt-5">
            <h1>Update Task</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {task ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            value={task.description}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-check-label">Completed</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={task.iscomplete}
                            onChange={(e) => setTask({ ...task, iscomplete: e.target.checked })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Task'}
                    </button>
                </form>
            ) : (
                <div>Task not found.</div>
            )}
        </div>
    );
};

export default UpdateTask;