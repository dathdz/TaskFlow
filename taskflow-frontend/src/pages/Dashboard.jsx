import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch danh sách Task từ Backend
  const fetchTasks = async () => {
    try {
      const res = await axiosClient.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Tạo Task mới
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axiosClient.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Cập nhật trạng thái Task
  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      await axiosClient.put(`/tasks/${task._id}`, { status: nextStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa Task
  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa task này?')) return;
    try {
      await axiosClient.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      {/* Form Tạo Task */}
      <form onSubmit={handleCreateTask} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-bold mb-4">Thêm công việc mới</h3>
        <div className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Tên công việc..." 
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Mô tả công việc (không bắt buộc)..." 
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition self-start">
            Thêm mới
          </button>
        </div>
      </form>

      {/* Danh sách Task */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold mb-2">Danh sách công việc</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-500">Chưa có công việc nào.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center border-l-4 border-indigo-500">
              <div>
                <h4 className={`text-md font-semibold ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.title}
                </h4>
                {task.description && <p className="text-gray-600 text-sm">{task.description}</p>}
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {task.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleToggleStatus(task)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm transition"
                >
                  {task.status === 'Completed' ? 'Chưa xong' : 'Hoàn thành'}
                </button>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;