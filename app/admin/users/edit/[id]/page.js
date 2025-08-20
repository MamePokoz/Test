'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useParams, useRouter } from 'next/navigation'
import style from './edit.module.css';
import './global.css';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // state สำหรับข้อมูลทั้งหมด
  const [firstname, setFirstname] = useState('');
  const [fullname, setFullname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`);
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);

        if (data.length > 0) {
          const user = data[0];
          setFirstname(user.firstname || '');
          setFullname(user.fullname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setPassword(user.password || '');
          setAddress(user.address || '');
          setSex(user.sex || '');
          setBirthday(user.birthday || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          id, firstname, fullname, lastname,
          username, password, address, sex, birthday
        }),
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: '<h3>ปรับปรุงข้อมูลเรียบร้อยแล้ว</h3>',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          router.push('/admin/users');
        });

      } else {
        Swal.fire({
          title: 'Error!',
          text: 'เกิดข้อผิดพลาด!',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
      });
    }
  };

  return (
    <div className={style.editPage}>
      <div className={style.editContainer}>
        <h1 className={style.edittitle}>แก้ไขข้อมูลสมัครสมาชิก {id}</h1>
        {items.map((item) => (
          <form key={item.id} onSubmit={handleUpdateSubmit} className="space-y-3">

            <select
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="" disabled hidden>Select sex</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>

            <input
              type="text"
              placeholder="ชื่อ"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="นามสกุล"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="ที่อยู่"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
            <option value="" disabled hidden>Select sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-warning text-white p-2 rounded hover:bg-blue-600"
            >
              ปรับปรุงข้อมูล
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
