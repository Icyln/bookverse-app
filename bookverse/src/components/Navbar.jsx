import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({user,setUser}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">BookVerse</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-sm">Hello, {user.username}</span>
              <button onClick={handleLogout} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
