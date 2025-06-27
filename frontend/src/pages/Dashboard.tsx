import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tableau de Bord</h2>
      <div className="row">
        <div className="col-md-4">
          <Card title="Patients enregistrés" value={120} color="bg-success" />
        </div>
        <div className="col-md-4">
          <Card title="Échantillons en attente" value={35} color="bg-warning" />
        </div>
        <div className="col-md-4">
          <Card title="Résultats urgents" value={5} color="bg-danger" />
        </div>
      </div>
    </div>
  );
}
