'use client';
import { useState, useEffect } from 'react';

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

  if (!isMounted) {
    // รอ client mount ก่อน ไม่ render navigation เพื่อหลีกเลี่ยง mismatch
    return null;
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">FrontEnd</a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={() => setNavCollapsed(!isNavCollapsed)}
          data-bs-toggle={undefined}
          data-bs-target={undefined}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                aria-expanded={isDropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!isDropdownOpen);
                }}
                data-bs-toggle={undefined}
              >
                Menu
              </a>
              <ul className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}>
                <li><a className="dropdown-item" href="/about">About</a></li>
                <li><a className="dropdown-item" href="/service">Service</a></li>
                <li><a className="dropdown-item" href="/contact">Contact</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/admin/users"> Admin </a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/login">login</a>
            </li>
          </ul>

          <div className="position-relative ms-auto">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <ul className="list-group position-absolute mt-1 w-100 z-3">
                {results.length > 0 ? (
                  results.map((item, index) => {
                    const isPlayer = !['home', 'about', 'service', 'contact', 'register','login'].includes(item.toLowerCase());
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
