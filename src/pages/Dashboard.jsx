import React, { useState, useEffect } from 'react';
import {
  FaPlus,
  FaSearch,
  FaBars,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaUser,
} from 'react-icons/fa';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';


const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    priority: '',
  });
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const [shareEmails, setShareEmails] = useState({}); // Store per-task email input
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsShown, setCongratsShown] = useState(false);


  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    alert('Login Successful ✅');
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.status === 'Completed')) {
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
      }, 4000); // Hide after 4 seconds
    }
  }, [tasks]);
  

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setTaskData({
      title: '',
      description: '',
      dueDate: '',
      status: '',
      priority: '',
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3001/api/tasks/${editTaskId}`,
          taskData
        );
        alert('✅ Task updated successfully!');
      } else {
        await axios.post('http://localhost:3001/api/tasks/create', taskData);
        alert('✅ Task created successfully!');
      }
      fetchTasks();
      handleToggleForm();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to save task');
    }
  };

  const handleEdit = (task) => {
    setTaskData(task);
    setEditTaskId(task.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'In Progress' : 'Completed';
    try {
      await axios.patch(
        `http://localhost:3001/api/tasks/${task.id}/status`,
        { status: newStatus }
      );
      fetchTasks();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleShare = (taskId) => {
    const email = shareEmails[taskId];
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email to share the task.');
      return;
    }
    alert(`✅ Task shared with ${email}`);
    setShareEmails((prev) => ({ ...prev, [taskId]: '' }));
  };

  const applyFilters = (task) => {
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);

    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesPriority = filterPriority
      ? task.priority === filterPriority
      : true;
    const matchesDate =
      filterDate === 'Today'
        ? task.dueDate === today
        : filterDate === 'This Week'
        ? dueDate <= oneWeekFromNow
        : true;

    return matchesStatus && matchesPriority && matchesDate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
  <div className="flex items-center gap-2">
    <FaBars className="text-xl" />
    <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
  </div>

  {/* Profile and Logout */}
  <div className="flex items-center gap-4">
    <img
      src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
        localStorage.getItem('email') || 'R'
      )}`}
      alt="Profile"
      className="w-8 h-8 rounded-full border"
    />
    <button
      onClick={() => {
        localStorage.removeItem('email');
        window.location.href = '/'; // Or route appropriately
      }}
      className="text-red-500 hover:text-red-700 text-xl"
      title="Logout"
    >
      <FaSignOutAlt />
    </button>
  </div>
</header>



      <main className="max-w-5xl mx-auto py-8 px-4">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold mb-1">My Tasks</h2>
            <p className="text-gray-500">Stay organized and productive</p>
          </div>
          <button
            onClick={handleToggleForm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full flex items-center gap-2"
          >
            <FaPlus /> {isEditing ? 'Cancel Edit' : 'New Task'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                name="title"
                type="text"
                placeholder="Task Name"
                value={taskData.title}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={taskData.description}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="dueDate"
                type="date"
                value={taskData.dueDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                {isEditing ? 'Update Task' : 'Create Task'}
              </button>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Dates</option>
            <option>Today</option>
            <option>This Week</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.filter(applyFilters).map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded shadow flex justify-between items-center border ${
                task.status === 'Completed'
                  ? 'bg-green-50 border-green-300'
                  : 'bg-white'
              }`}
            >
              <div className="flex-1">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  {task.title}
                  {task.status === 'Completed' && (
                    <FaCheckCircle className="text-green-500" />
                  )}
                </h4>
                <p className="text-gray-600 text-sm">{task.description}</p>
                <p className="text-gray-500 text-sm">
                  Due: {task.dueDate} | Status:{' '}
                  <b>{task.status}</b> | Priority:{' '}
                  <b>{task.priority || 'Not set'}</b>
                </p>

                {/* Share Input */}
                <div className="mt-2 flex items-center gap-2">
                  <FaUser className="text-gray-600" />
                  <input
                    type="email"
                    placeholder="Enter email to share"
                    className="border p-1 text-sm rounded w-64"
                    value={shareEmails[task.id] || ''}
                    onChange={(e) =>
                      setShareEmails({
                        ...shareEmails,
                        [task.id]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => toggleStatus(task)}
                  className="text-green-500 hover:text-green-700"
                  title="Toggle Status"
                >
                  ✔️
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleShare(task.id)}
                  className="text-purple-500 hover:text-purple-700"
                  title="Share Task"
                >
                  <FaUser />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <button
        onClick={handleToggleForm}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg text-2xl"
      >
        <FaPlus />
      </button>
      {showCongrats && (
        <div className="fixed inset-0 backdrop-blur-sm bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl text-center animate-fade-in-up w-80">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-xl font-bold text-green-700 mb-2">Congratulations!</h2>
            <p className="text-gray-700">All your tasks are completed!</p>
          </div>
        </div>
      )}



    </div>
  );
};

export default Dashboard;
