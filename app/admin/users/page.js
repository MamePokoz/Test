'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import './users.css'; 
import './global.css';

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
 
    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Accept : 'application/json',
        },
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>
      <br /><br /><br /><br />
      <div className="container">
        <div className="card">
          <div className="card-header">Users List</div>
          <div className="card-body">
            <div className="row">
              <div className="table-wrapper">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className='text-center'>ID</th>
                      <th>Firstname</th>
                      <th>Fullname</th>
                      <th>Lastname</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Address</th>
                      <th>Sex</th>
                      <th>Birthday</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className='text-center'>{item.id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.fullname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td>{item.address}</td>
                        <td>{item.sex}</td>
                        <td>{item.birthday}</td>
                        <td>
                          <Link href={`/admin/users/edit/${item.id}`} className="btn btn-warning btn-sm">
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            type="button"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="fa fa-trash"></i> Del
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}
