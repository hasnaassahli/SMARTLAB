interface CardProps {
  title: string;
  value: string | number;
  color?: string; // Utilisé pour des classes Bootstrap comme 'bg-primary'
}

export default function Card({ title, value, color = "bg-light" }: CardProps) {
  return (
    <div className={`card text-dark shadow-sm mb-3 ${color}`}>
      <div className="card-body">
        <h5 className="card-title text-muted small">{title}</h5>
        <p className="card-text fs-4 fw-bold">{value}</p>
      </div>
    </div>
  );
}

