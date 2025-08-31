import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';

export default function Signup({setUser}) {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await signup({username,email,password});
    if(res.msg==='User registered'){
      alert('Signup successful. Login now.');
      navigate('/login');
    } else {
      alert(res.msg);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2" />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2" />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2" />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  )
}
