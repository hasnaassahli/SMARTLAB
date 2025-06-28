import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("doctor");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur récupération utilisateurs", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, email, role, password: "default123" }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setRole("doctor");
        fetchUsers();
      } else {
        alert("Erreur création utilisateur");
      }
    } catch (error) {
      console.error("Erreur création utilisateur", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if (res.ok) {
        fetchUsers();
      } else {
        alert("Erreur suppression utilisateur");
      }
    } catch (error) {
      console.error("Erreur suppression utilisateur", error);
    }
  };

  return (
    <div>
      <div className="mb-4 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Ajouter un utilisateur</h2>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 mr-2"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-1 mr-2"
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="cashier">Cashier</option>
          <option value="technician">Technician</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Ajouter
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Liste des utilisateurs</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Rôle</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border border-gray-300 px-4 py-2">{u.name}</td>
              <td className="border border-gray-300 px-4 py-2">{u.email}</td>
              <td className="border border-gray-300 px-4 py-2">{u.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
