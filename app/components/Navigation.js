'use client';
import { useState, useEffect } from 'react';
import './Navigation.css'; //

export default function Navigation() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavCollapsed, setNavCollapsed] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = [
    'Home', 'About', 'Service', 'Contact', 'Login', 'register',
    'Lionel Messi', 'Andres Iniesta', 'Xavi Hernandez',
    'Luis Suarez', 'Sergio Busquets', 'Jordi Alba', 'Gerard Pique',
    'Carles Puyol', 'Dani Alves', 'Marc-Andre ter Stegen', 'Neymar Jr'
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  if (!isMounted) return null;

  return (
    <nav className="navbar navbar-expand-lg barca-navbar">
      <div className="container-fluid">
        <a className="navbar-brand barca-brand" href="/">Barcelona</a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active barca-link" href="/">Home</a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle barca-link"
                href="#"
                role="button"
                aria-expanded={isDropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!isDropdownOpen);
                }}
              >
                Menu
              </a>
              <ul className={`dropdown-menu barca-dropdown${isDropdownOpen ? ' show' : ''}`}>
                <li><a className="dropdown-item" href="/about">About</a></li>
                <li><a className="dropdown-item" href="/service">Service</a></li>
                <li><a className="dropdown-item" href="/contact">Contact</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/admin/users">Admin</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link barca-link" href="/login">Login</a>
            </li>
              <a className="nav-link barca-link" href="/login">Logout</a>
          </ul>

          <div className="position-relative ms-auto barca-search-container">
            <input
              className="form-control barca-search"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <ul className="list-group position-absolute mt-1 w-100 z-3 barca-search-dropdown">
                {results.length > 0 ? (
                  results.map((item, index) => {
                    const isPlayer = !['home', 'about', 'service', 'contact', 'register', 'login'].includes(item.toLowerCase());
                    const link = isPlayer
                      ? `/player/${item.toLowerCase().replace(/\s+/g, '-')}`
                      : `/${item.toLowerCase()}`;
                    return (
                      <li key={index} className="list-group-item">
                        <a href={link} className="text-decoration-none text-dark">
                          {item}
                        </a>
                      </li>
                    );
                  })
                ) : (
                  <li className="list-group-item text-muted">No results found</li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
