'use client';

import { useState, useEffect , useRef} from 'react';
import { useRouter } from 'next/navigation';
import './Navigation.css';

export default function Navigation() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavCollapsed, setNavCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setIsAdmin(user.role === 'admin');
      } catch {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/login');
  };

  const items = [
    'About', 'Service', 'Contact', 'Login', 'Register',
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
        <span
          className="navbar-brand barca-brand"
          onClick={() => {
          setDropdownOpen(false);
          router.push('/');}}
          style={{ cursor: 'pointer' }}
        >
          Barcelona
        </span>

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
              <span
                className="nav-link active barca-link"
                onClick={() => {
                setDropdownOpen(false);   // 👈 ปิด dropdown
                router.push('/');}}
                style={{ cursor: 'pointer' }}
              >
                Home
              </span>
            </li>

            <li className="nav-item dropdown" ref={dropdownRef}>
              <span
                className="nav-link dropdown-toggle barca-link"
                role="button"
                aria-expanded={isDropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!isDropdownOpen);
                }}
                style={{ cursor: 'pointer' }}
              >
                Menu
              </span>
              <ul className={`dropdown-menu barca-dropdown${isDropdownOpen ? ' show' : ''}`}>
                <li>
                  <span
                  className="dropdown-item"
                  onClick={() => {
                  setDropdownOpen(false);   // 👈 ปิด dropdown
                  router.push('/about');
                  }}
                  style={{ cursor: 'pointer' }}
                  >
                  About
                  </span>
                </li>

                <li>
                  <span 
                  className="dropdown-item" 
                  onClick={() => {         
                  setDropdownOpen(false);
                  router.push('/service');
                }}
                  style={{ cursor: 'pointer' }}>
                    Service
                  </span>
                </li>

                <li>
                  <span 
                  className="dropdown-item" 
                  onClick={() => {
                  setDropdownOpen(false);
                  router.push('/contact');
                } }
                  style={{ cursor: 'pointer' }}>
                    Contact
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
              </ul>
            </li>

            {isAdmin && (
              <li>
                <span
                  className="nav-link barca-link"
                  onClick={() => router.push('/adminlogin')}
                  style={{ cursor: 'pointer' }}
                >
                  Admin
                </span>
              </li>
            )}

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link barca-link"
                    onClick={() => router.push('/login')}
                    style={{ cursor: 'pointer' }}
                  >
                    Login
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link barca-link"
                    onClick={() => router.push('/register')}
                    style={{ cursor: 'pointer' }}
                  >
                    Register
                  </span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link barca-link btn btn-link"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            )}
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
                    const isPlayer = !['about', 'service', 'contact', 'register', 'login'].includes(item.toLowerCase());
                    const link = isPlayer
                      ? `/player/${item.toLowerCase().replace(/\s+/g, '-')}`
                      : `/${item.toLowerCase()}`;
                    return (
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={() => router.push(link)}
                        style={{ cursor: 'pointer' }}
                      >
                        {item}
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

