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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
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
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาด',
          text: 'ไม่สามารถดึงข้อมูลได้',
        });
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getUsers();
    }
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading
    Swal.fire({
      title: 'กำลังปรับปรุงข้อมูล...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

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

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: 'ปรับปรุงข้อมูลเรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          router.push('/admin/users');
        });
      } else {
        Swal.fire({
          title: 'ข้อผิดพลาด!',
          text: result.message || 'เกิดข้อผิดพลาดในการปรับปรุงข้อมูล',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
        confirmButtonText: 'ตกลง'
      });
    }
  };

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.spinner}></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={style.errorContainer}>
        <h2>ไม่พบข้อมูลผู้ใช้</h2>
        <button 
          onClick={() => router.push('/admin/users')}
          className={style.backButton}
        >
          กลับไปหน้าผู้ใช้
        </button>
      </div>
    );
  }

  return (
    <div className={style.editPage}>
      <div className={style.editContainer}>
        <div className={style.header}>
          <h1 className={style.title}>แก้ไขข้อมูลสมาชิก</h1>
          <p className={style.subtitle}>รหัสผู้ใช้: {id}</p>
        </div>

        <div className={style.formWrapper}>
          <form onSubmit={handleUpdateSubmit} className={style.form}>
            <div className={style.formGroup}>
              <label className={style.label}>คำนำหน้าชื่อ</label>
              <select
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={style.select}
                required
              >
                <option value="" disabled>เลือกคำนำหน้าชื่อ</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </select>
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>ชื่อ</label>
              <input
                type="text"
                placeholder="กรอกชื่อ"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className={style.input}
                required
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>นามสกุล</label>
              <input
                type="text"
                placeholder="กรอกนามสกุล"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={style.input}
                required
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>ชื่อผู้ใช้</label>
              <input
                type="text"
                placeholder="กรอกชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={style.input}
                required
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>รหัสผ่าน</label>
              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={style.input}
                required
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>ที่อยู่</label>
              <textarea
                placeholder="กรอกที่อยู่"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={style.textarea}
                rows="3"
                required
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>เพศ</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className={style.select}
                required
              >
                <option value="" disabled>เลือกเพศ</option>
                <option value="Male">ชาย</option>
                <option value="Female">หญิง</option>
                <option value="Other">อื่นๆ</option>
              </select>
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>วันเกิด</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className={style.input}
                required
              />
            </div>

            <div className={style.buttonGroup}>
              <button
                type="button"
                onClick={() => router.push('/admin/users')}
                className={`${style.button} ${style.cancelButton}`}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className={`${style.button} ${style.submitButton}`}
              >
                ปรับปรุงข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}