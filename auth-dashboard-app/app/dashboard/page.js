'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { taskAPI, authAPI } from '@/lib/api';

export default function DashboardPage() {
    const { user, setUser, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
    });

    const [profileForm, setProfileForm] = useState({
        name: '',
        bio: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, search, statusFilter, priorityFilter]);

    const fetchTasks = async () => {
        try {
            const response = await taskAPI.getTasks();
            setTasks(response.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const filterTasks = () => {
        let filtered = [...tasks];

        if (search) {
            filtered = filtered.filter(
                (t) =>
                    t.title.toLowerCase().includes(search.toLowerCase()) ||
                    t.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((t) => t.status === statusFilter);
        }

        if (priorityFilter !== 'all') {
            filtered = filtered.filter((t) => t.priority === priorityFilter);
        }

        setFilteredTasks(filtered);
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await taskAPI.createTask(taskForm);
            setTasks([response.data.data, ...tasks]);
            setShowTaskModal(false);
            setTaskForm({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' });
            setSuccess('Task created');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to create task');
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await taskAPI.updateTask(editingTask._id, taskForm);
            setTasks(tasks.map((t) => (t._id === editingTask._id ? response.data.data : t)));
            setShowTaskModal(false);
            setEditingTask(null);
            setTaskForm({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' });
            setSuccess('Task updated');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (!confirm('Delete this task?')) return;
        try {
            await taskAPI.deleteTask(id);
            setTasks(tasks.filter((t) => t._id !== id));
            setSuccess('Task deleted');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setTaskForm({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        });
        setShowTaskModal(true);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await authAPI.updateProfile(profileForm);
            setUser(response.data.data);
            setShowProfileModal(false);
            setSuccess('Profile updated');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800">Task Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <span>{user?.name}</span>
                            <button
                                onClick={() => {
                                    setProfileForm({ name: user.name, bio: user.bio || '' });
                                    setShowProfileModal(true);
                                }}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Profile
                            </button>
                            <button
                                onClick={logout}
                                className="text-red-600 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    {success && <div className="bg-green-100 text-green-800 p-4 rounded mb-4">{success}</div>}
                    {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <p className="text-gray-500">Total Tasks</p>
                            <p className="text-2xl font-bold">{tasks.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <p className="text-gray-500">Pending</p>
                            <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'pending').length}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <p className="text-gray-500">In Progress</p>
                            <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'in-progress').length}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <p className="text-gray-500">Completed</p>
                            <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'completed').length}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input
                            className="flex-1 p-2 border rounded"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            className="p-2 border rounded"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select
                            className="p-2 border rounded"
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="all">All Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <button
                            onClick={() => {
                                setEditingTask(null);
                                setTaskForm({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' });
                                setShowTaskModal(true);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add Task
                        </button>
                    </div>

                    <div className="grid gap-4">
                        {filteredTasks.map((task) => (
                            <div key={task._id} className="bg-white p-4 rounded shadow-sm border flex justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{task.title}</h3>
                                    <p className="text-gray-600">{task.description}</p>
                                    <div className="flex gap-2 mt-2 text-sm">
                                        <span className="px-2 py-1 bg-gray-100 rounded">{task.status}</span>
                                        <span className="px-2 py-1 bg-gray-100 rounded">{task.priority}</span>
                                        {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openEditModal(task)} className="text-blue-600">Edit</button>
                                    <button onClick={() => handleDeleteTask(task._id)} className="text-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showTaskModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white p-6 rounded max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h2>
                            <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="space-y-4">
                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="Title"
                                    value={taskForm.title}
                                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="Description"
                                    value={taskForm.description}
                                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <select
                                        className="p-2 border rounded"
                                        value={taskForm.status}
                                        onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <select
                                        className="p-2 border rounded"
                                        value={taskForm.priority}
                                        onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={taskForm.dueDate}
                                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                                />
                                <div className="flex gap-2 mt-4">
                                    <button type="button" onClick={() => setShowTaskModal(false)} className="flex-1 border p-2 rounded">Cancel</button>
                                    <button type="submit" className="flex-1 bg-blue-600 text-white p-2 rounded">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showProfileModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white p-6 rounded max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="Name"
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                />
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="Bio"
                                    value={profileForm.bio}
                                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                                />
                                <div className="flex gap-2 mt-4">
                                    <button type="button" onClick={() => setShowProfileModal(false)} className="flex-1 border p-2 rounded">Cancel</button>
                                    <button type="submit" className="flex-1 bg-blue-600 text-white p-2 rounded">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
