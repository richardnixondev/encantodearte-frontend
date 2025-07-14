import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user logged in.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user.surname}!</h2>
      <p>Email: {user.email}</p>
      <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
