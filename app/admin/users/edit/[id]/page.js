'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useParams, useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter()
  const params = useParams();
  const id = params.id;
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [items, setItems] = useState([]);
    useEffect(() => {
        async function getUsers() {
          try {
            const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
            if (!res.ok) {
              console.error('Failed to fetch data');
              return;
            }
            const data = await res.json();
            setItems(data);

        //กำหนดค่า state เริ่มต้นจาก API
        if (data.length > 0) {
          const user = data[0];
          setFirstname(user.firstname || '');
          setFullname(user.fullname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setPassword(user.password || '');
        }

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
     
      getUsers();
      //const interval  = setInterval(getUsers, 1000);
      //return () => clearInterval(interval);
    }, []);
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
      method: 'PUT',
      headers: {
        Accept : 'application/json',
      },
      body: JSON.stringify({ id, firstname, fullname, lastname, username, password }),
    })
    const result = await res.json();
    console.log(result);
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: '<h3>ปรับปรุงข้อมูลเรียบร้อยแล้ว</h3>',
        showConfirmButton: false,
        timer: 2000
        }).then(function () {
        router.push('/register')
      });
      setFirstname('')
      setFullname('')
      setLastname('')
      setUsername('')
      setPassword('')
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'เกิดข้อผิดพลาด!',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'ข้อผิดพลาดเครือข่าย',
      text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
    })
  }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">แก้ไขข้อมูลสมัครสมาชิก {id}</h1>
      {items.map((item) => (
      <form key={item.id} onSubmit={handleUpdateSubmit} className="space-y-3">
       
        <select name="firstname" onChange={(e) => setFirstname(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="{item.firstname}">{item.firstname}</option>
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
        <input
          type="text"
          placeholder="ชื่อ"
          defaultValue={item.fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="นามสกุล"
          defaultValue={item.lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
                <input
          type="text"
          placeholder="username"
          defaultValue={item.username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
                <input
          type="text"
          placeholder="password"
          defaultValue={item.password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-warning text-white p-2 rounded hover:bg-blue-600"
        >
          ปรับปรุงข้อมูล
        </button>
      </form>
       ))} //ปิด items.map
    </div>
  )
}