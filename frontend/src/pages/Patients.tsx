import { useEffect, useState } from "react"
import api from "../services/api"

interface Patient {
  _id: string
  name: string
  cin: string
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [name, setName] = useState("")
  const [cin, setCin] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const fetchPatients = () => {
    api.get("/patients").then((res) => setPatients(res.data))
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await api.put(`/patients/${editingId}`, { name, cin })
      setEditingId(null)
    } else {
      await api.post("/patients", { name, cin })
    }
    setName("")
    setCin("")
    fetchPatients()
  }

  const handleEdit = (p: Patient) => {
    setName(p.name)
    setCin(p.cin)
    setEditingId(p._id)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer ce patient ?")) {
      await api.delete(`/patients/${id}`)
      fetchPatients()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Gestion des Patients</h2>

      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="border px-2 py-1 rounded"
        />
        <input
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          placeholder="CIN"
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editingId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">CIN</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.cin}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
