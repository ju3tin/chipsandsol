// app/users/page.tsx
import React from 'react';
import { User } from '../../types/User';

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('http://localhost:8080/api/users', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Wallet</th>
            <th className="border px-4 py-2">SOL</th>
            <th className="border px-4 py-2">CHIPPY</th>
            <th className="border px-4 py-2">DEMO</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.walletAddress || '-'}</td>
              <td className="border px-4 py-2">{user.balances.SOL}</td>
              <td className="border px-4 py-2">{user.balances.CHIPPY}</td>
              <td className="border px-4 py-2">{user.balances.DEMO}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
