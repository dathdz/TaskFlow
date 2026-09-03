import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">TaskFlow</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span>Xin chào, <b>{user.name}</b></span>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;