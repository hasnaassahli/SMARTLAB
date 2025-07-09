import React, { useState, useEffect } from 'react';

// Interface pour les éléments de menu
interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  dropdown?: DropdownItem[];
}

// Interface pour les éléments de dropdown
interface DropdownItem {
  label: string;
  href: string;
  icon?: string;
  divider?: boolean;
}

// Interface pour les props de la navbar
interface NavbarProps {
  brandName?: string;
  brandLogo?: string;
  isLoggedIn?: boolean;
  userRole?: 'admin' | 'doctor' | 'patient' | 'technician';
  userName?: string;
  onLogout?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

// Composant Navbar
const Navbar: React.FC<NavbarProps> = ({
  brandName = "SmartLAB",
  brandLogo = "/assets/logo.png",
  isLoggedIn = false,
  userRole = 'patient',
  userName = "Utilisateur",
  onLogout = () => console.log('Logout'),
  onLogin = () => console.log('Login'),
  onRegister = () => console.log('Register')
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Menus selon le rôle utilisateur
  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      {
        id: 'home',
        label: 'Accueil',
        href: '/',
        icon: 'bi bi-house-door'
      }
    ];

    if (isLoggedIn) {
      switch (userRole) {
        case 'admin':
          return [
            ...baseItems,
            {
              id: 'dashboard',
              label: 'Dashboard',
              href: '/admin/dashboard',
              icon: 'bi bi-speedometer2'
            },
            {
              id: 'management',
              label: 'Gestion',
              href: '#',
              icon: 'bi bi-gear',
              dropdown: [
                { label: 'Utilisateurs', href: '/admin/users', icon: 'bi bi-people' },
                { label: 'Laboratoires', href: '/admin/labs', icon: 'bi bi-building' },
                { label: 'Équipements', href: '/admin/equipment', icon: 'bi bi-tools' }
              ]
            }
          ];

        case 'doctor':
          return [
            ...baseItems,
            {
              id: 'patients',
              label: 'Patients',
              href: '/doctor/patients',
              icon: 'bi bi-person-badge'
            },
            {
              id: 'analyses',
              label: 'Analyses',
              href: '#',
              icon: 'bi bi-clipboard-data',
              dropdown: [
                { label: 'Nouvelle analyse', href: '/doctor/analyses/new', icon: 'bi bi-plus-circle' },
                { label: 'Résultats', href: '/doctor/analyses/results', icon: 'bi bi-graph-up' }
              ]
            }
          ];

        default:
          return baseItems;
      }
    } else {
      return [
        ...baseItems,
        {
          id: 'services',
          label: 'Services',
          href: '#',
          icon: 'bi bi-grid-3x3-gap',
          dropdown: [
            { label: 'Analyses médicales', href: '/services/medical', icon: 'bi bi-heart-pulse' },
            { label: 'Biologie moléculaire', href: '/services/molecular', icon: 'bi bi-dna' },
            { label: 'Microbiologie', href: '/services/microbiology', icon: 'bi bi-virus' }
          ]
        },
        {
          id: 'about',
          label: 'À propos',
          href: '/about',
          icon: 'bi bi-info-circle'
        },
        {
          id: 'contact',
          label: 'Contact',
          href: '/contact',
          icon: 'bi bi-telephone'
        }
      ];
    }
  };

  // Gestion des clics en dehors pour fermer les dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
        <div className="container-fluid">
          {/* Brand */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <i className="bi bi-flask text-warning me-2" style={{ fontSize: '1.5rem' }}></i>
            <span className="fw-bold text-warning">{brandName}</span>
          </a>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar content */}
          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
            {/* Main menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item ${item.dropdown ? 'dropdown' : ''}`}
                >
                  {item.dropdown ? (
                    <div className="dropdown">
                      <button
                        className="nav-link dropdown-toggle btn btn-link text-white"
                        onClick={() => toggleDropdown(item.id)}
                        aria-expanded={activeDropdown === item.id}
                        style={{ textDecoration: 'none' }}
                      >
                        {item.icon && <i className={`${item.icon} me-2`}></i>}
                        {item.label}
                      </button>
                      <ul className={`dropdown-menu ${activeDropdown === item.id ? 'show' : ''}`}>
                        {item.dropdown.map((dropdownItem, index) => (
                          <li key={index}>
                            {dropdownItem.divider ? (
                              <hr className="dropdown-divider" />
                            ) : (
                              <a className="dropdown-item" href={dropdownItem.href}>
                                {dropdownItem.icon && (
                                  <i className={`${dropdownItem.icon} me-2`}></i>
                                )}
                                {dropdownItem.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <a className="nav-link text-white" href={item.href}>
                      {item.icon && <i className={`${item.icon} me-2`}></i>}
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Right side - User actions */}
            <ul className="navbar-nav">
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link btn btn-link position-relative text-white"
                      onClick={() => toggleDropdown('notifications')}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="bi bi-bell"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                      </span>
                    </button>
                    <ul className={`dropdown-menu dropdown-menu-end ${activeDropdown === 'notifications' ? 'show' : ''}`}>
                      <li><h6 className="dropdown-header">Notifications</h6></li>
                      <li><a className="dropdown-item" href="#">Nouveau résultat disponible</a></li>
                      <li><a className="dropdown-item" href="#">Rendez-vous confirmé</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item text-center" href="/notifications">Voir toutes</a></li>
                    </ul>
                  </li>

                  {/* User menu */}
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle btn btn-link d-flex align-items-center text-white"
                      onClick={() => toggleDropdown('user')}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=ffc107&color=000&size=32`}
                        alt={userName}
                        className="rounded-circle me-2"
                        width="32"
                        height="32"
                      />
                      <span className="d-none d-md-inline">{userName}</span>
                    </button>
                    <ul className={`dropdown-menu dropdown-menu-end ${activeDropdown === 'user' ? 'show' : ''}`}>
                      <li><h6 className="dropdown-header">Mon compte</h6></li>
                      <li><a className="dropdown-item" href="/profile">
                        <i className="bi bi-person me-2"></i>Profil
                      </a></li>
                      <li><a className="dropdown-item" href="/settings">
                        <i className="bi bi-gear me-2"></i>Paramètres
                      </a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={onLogout}>
                          <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  {/* Login/Register buttons */}
                  <li className="nav-item">
                    <button className="btn btn-outline-light me-2" onClick={onLogin}>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Connexion
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-warning" onClick={onRegister}>
                      <i className="bi bi-person-plus me-2"></i>
                      Inscription
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

// Composant Home avec background image
const Home: React.FC = () => {
  const navigate = (path: string) => {
    console.log(`Navigation vers: ${path}`);
    // Remplacez par votre logique de navigation
  };

  const features = [
    {
      icon: "bi bi-flask",
      title: "Gestion des échantillons",
      description: "Traçabilité complète de vos échantillons"
    },
    {
      icon: "bi bi-calendar-check",
      title: "Planification intelligente",
      description: "Système de rendez-vous automatisé"
    },
    {
      icon: "bi bi-graph-up",
      title: "Analyses en temps réel",
      description: "Suivi des résultats instantané"
    },
    {
      icon: "bi bi-shield-check",
      title: "Sécurité certifiée",
      description: "Conformité aux normes ISO"
    }
  ];

  const stats = [
    { value: "15,000+", label: "Analyses réalisées" },
    { value: "500+", label: "Clients satisfaits" },
    { value: "24/7", label: "Support disponible" },
    { value: "99.9%", label: "Disponibilité" }
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar
        brandName="SmartLAB"
        isLoggedIn={false}
        onLogin={() => navigate('/login')}
        onRegister={() => navigate('/register')}
      />

      {/* Hero Section avec Background Image */}
      <div
        className="d-flex align-items-center justify-content-center position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '100vh',
          color: '#fff'
        }}
      >
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h1 className="display-3 fw-bold mb-4 text-shadow">
                Bienvenue sur <span className="text-warning">SmartLAB</span>
              </h1>
              <p className="lead mb-5 fs-4">
                La solution complète pour gérer votre laboratoire efficacement avec 
                des outils modernes et intuitifs.
              </p>
              
              {/* Action Buttons */}
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-5">
                <button
                  onClick={() => navigate('/appointment')}
                  className="btn btn-success btn-lg px-4 py-3"
                >
                  <i className="bi bi-calendar-check me-2"></i>
                  Prendre rendez-vous
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-outline-light btn-lg px-4 py-3"
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Créer un compte
                </button>
              </div>

              {/* Stats */}
              <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                  <div key={index} className="col-6 col-md-3">
                    <div className="bg-dark bg-opacity-25 p-3 rounded">
                      <div className="display-6 fw-bold text-warning mb-1">
                        {stat.value}
                      </div>
                      <div className="text-light small">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
          <div className="text-center">
            <i className="bi bi-chevron-down text-warning" style={{ fontSize: '2rem', animation: 'bounce 2s infinite' }}></i>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="display-5 fw-bold mb-4">Nos fonctionnalités</h2>
              <p className="lead text-muted">
                Découvrez comment SmartLAB peut transformer votre laboratoire
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 hover-card">
                  <div className="card-body text-center p-4">
                    <div className="text-primary mb-3">
                      <i className={`${feature.icon} display-4`}></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3">{feature.title}</h5>
                    <p className="card-text text-muted">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-5 bg-primary text-white">
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <i className="bi bi-award display-4 text-warning mb-4"></i>
              <h2 className="display-5 fw-bold mb-4">
                Prêt à transformer votre laboratoire ?
              </h2>
              <p className="lead mb-4">
                Rejoignez les centaines de laboratoires qui font confiance à SmartLAB 
                pour optimiser leurs processus et améliorer leur efficacité.
              </p>
              <button
                onClick={() => navigate('/demo')}
                className="btn btn-warning btn-lg px-4 py-3"
              >
                <i className="bi bi-play-circle me-2"></i>
                Demander une démo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-4">
        <div className="container text-center">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <i className="bi bi-flask text-warning me-2" style={{ fontSize: '1.5rem' }}></i>
            <span className="h5 mb-0 fw-bold">SmartLAB</span>
          </div>
          <p className="text-muted mb-0">
            © 2024 SmartLAB. Tous droits réservés. | Solution de gestion de laboratoire
          </p>
        </div>
      </footer>

      {/* Custom CSS */}
      <style>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        }
        
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        .bg-opacity-25 {
          background-color: rgba(0,0,0,0.25) !important;
        }
        
        .dropdown-menu.show {
          display: block;
        }
      `}</style>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Home;