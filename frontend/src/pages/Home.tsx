export default function Home() {
  return (
    <main className="position-relative min-vh-100 overflow-hidden">
      {/* ✅ IMAGE DE FOND */}
      <img
        src="/assets/img-labo.jpg"
        alt="SmartLAB illustration"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-n1"
        style={{ objectFit: "cover", opacity: 0.6 }}
      />

      {/* ✅ CONTENU CENTRÉ */}
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="text-center text-white  p-5 rounded shadow-lg">
          <h1 className="display-4 mb-3">
            Bienvenue sur <strong>SmartLAB</strong>
          </h1>
          <p className="lead">
            💉 Gérez facilement vos patients, échantillons, résultats et techniciens avec notre plateforme moderne dédiée aux laboratoires médicaux.
          </p>
          <hr className="border-light" />
          <p className="text-light">
            Commencez dès maintenant à simplifier la gestion de votre laboratoire.
          </p>
          <a href="/login" className="btn btn-success btn-lg mt-3">
            Se connecter
          </a>
        </div>
      </div>
    </main>
  );
}
