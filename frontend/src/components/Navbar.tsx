

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
                { label: 'Équipements', href: '/admin/equipment', icon: 'bi bi-tools' },
                { divider: true, label: '', href: '' },
                { label: 'Paramètres', href: '/admin/settings', icon: 'bi bi-sliders' }
              ]
            },
            {
              id: 'reports',
              label: 'Rapports',
              href: '/admin/reports',
              icon: 'bi bi-file-earmark-text'
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
                { label: 'Résultats', href: '/doctor/analyses/results', icon: 'bi bi-graph-up' },
                { label: 'Historique', href: '/doctor/analyses/history', icon: 'bi bi-clock-history' }
              ]
            },
            {
              id: 'appointments',
              label: 'Rendez-vous',
              href: '/doctor/appointments',
              icon: 'bi bi-calendar-check'
            }
          ];

        case 'technician':
          return [
            ...baseItems,
            {
              id: 'samples',
              label: 'Échantillons',
              href: '/technician/samples',
              icon: 'bi bi-droplet'
            },
            {
              id: 'equipment',
              label: 'Équipements',
              href: '/technician/equipment',
              icon: 'bi bi-tools'
            },
            {
              id: 'quality',
              label: 'Qualité',
              href: '/technician/quality',
              icon: 'bi bi-award'
            }
          ];

        case 'patient':
          return [
            ...baseItems,
            {
              id: 'appointments',
              label: 'Mes RDV',
              href: '/patient/appointments',
              icon: 'bi bi-calendar-event'
            },
            {
              id: 'results',
              label: 'Résultats',
              href: '/patient/results',
              icon: 'bi bi-file-medical'
            },
            {
              id: 'profile',
              label: 'Profil',
              href: '/patient/profile',
              icon: 'bi bi-person-circle'
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
            { label: 'Microbiologie', href: '/services/microbiology', icon: 'bi bi-virus' },
            { label: 'Hématologie', href: '/services/hematology', icon: 'bi bi-droplet-half' }
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

  // Toggle collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle dropdown
  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const menuItems = getMenuItems();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={brandLogo}
            alt={brandName}
            width="32"
            height="32"
            className="d-inline-block align-text-top me-2"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
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
                      className="nav-link dropdown-toggle btn btn-link"
                      onClick={() => toggleDropdown(item.id)}
                      aria-expanded={activeDropdown === item.id}
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
                  <a className="nav-link" href={item.href}>
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
                    className="nav-link btn btn-link position-relative"
                    onClick={() => toggleDropdown('notifications')}
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
                    <li><a className="dropdown-item" href="#">Maintenance programmée</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-center" href="/notifications">Voir toutes</a></li>
                  </ul>
                </li>

                {/* User menu */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link d-flex align-items-center"
                    onClick={() => toggleDropdown('user')}
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
                    <li><a className="dropdown-item" href="/help">
                      <i className="bi bi-question-circle me-2"></i>Aide
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
  );
};

export default Navbar;
