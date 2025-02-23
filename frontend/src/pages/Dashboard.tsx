import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import { useNavigate, Link } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    description: string;
    iscomplete: boolean;
}

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); 
            return;
        }

        try {
            const taskData = await getTasks(token);
            setTasks(taskData);
        } catch (error) {
            setError('Error fetching tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const token = localStorage.getItem('authToken');
                await deleteTask(token as string, id.toString());
                setTasks(tasks.filter((task) => task.id !== id)); 
            } catch (error) {
                setError('Failed to delete task');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/login'); 
    };

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h1>My Tasks</h1>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <div className="row mt-4">
                <div className="col-12">
                    <Link to="/create-task" className="btn btn-primary mb-3">
                        Add New Task
                    </Link>
                    <div className="list-group">
                        {tasks.map((task) => (
                            <div className="list-group-item" key={task.id}>
                                <h5>{task.title}</h5>
                                <p>{task.description}</p>
                                <p>
                                    Status:{""}
                                    <span
                                    className={`badge ${task.iscomplete ? 'bg-success' : 'bg-danger'}`}
                                    >
                                        {task.iscomplete ? 'Completed' : 'Pending'}
                                    </span>
                                </p>
                                <div className="btn-group" role="group">
                                    <Link
                                        to={`/update-task/${task.id}`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;