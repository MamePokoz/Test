<<<<<<< HEAD
'use client'
import { useState } from 'react';

export default function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const items = ['Home', 'About', 'Service', 'Contact'];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">FrontEnd</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/about">About</a></li>
            <li><a className="dropdown-item" href="/service">Service</a></li>
            <li><a className="dropdown-item" href="/contact">Contact</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">login</a>
        </li>
      </ul>
      {/* Real-Time Search */}
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
                  results.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <a href={`/${item.toLowerCase()}`} className="text-decoration-none text-dark">
                        {item}
                      </a>
                    </li>
                  ))
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
=======
'use client'
import { useState } from 'react';

export default function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const items = ['Home', 'About', 'Service', 'Contact'];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">FrontEnd</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/about">About</a></li>
            <li><a className="dropdown-item" href="/service">Service</a></li>
            <li><a className="dropdown-item" href="/contact">Contact</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">login</a>
        </li>
      </ul>
      {/* Real-Time Search */}
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
                  results.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <a href={`/${item.toLowerCase()}`} className="text-decoration-none text-dark">
                        {item}
                      </a>
                    </li>
                  ))
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
>>>>>>> 9be121d1490086dfb5ca0046d9b9c4648191c034
