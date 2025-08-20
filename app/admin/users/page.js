"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./users.module.css";
import "./global.css";

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function getUsers() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://backend-nextjs-virid.vercel.app/api/users"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setItems(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load users data");
      } finally {
        setLoading(false);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 5000); // เพิ่มเป็น 5 วินาที
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Are you sure you want to delete user: ${username}?`)) {
      return;
    }

    try {
      const res = await fetch(
        `https://backend-nextjs-virid.vercel.app/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.ok) {
        const result = await res.json();
        console.log(result);
        // รีเฟรชข้อมูลทันที
        setItems(items.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("th-TH");
  };

  if (loading && items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            <i className="fas fa-users"></i>
            Users Management
          </h1>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{items.length}</div>
            <div className={styles.statLabel}>Total Users</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {
                items.filter((item) => {
                  const sex = item.sex?.toLowerCase();
                  return sex === "male" || sex === "ชาย" || sex === "ผู้ชาย";
                }).length
              }
            </div>
            <div className={styles.statLabel}>Male / ชาย</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {
                items.filter((item) => {
                  const sex = item.sex?.toLowerCase();
                  return (
                    sex === "female" || sex === "หญิง" || sex === "ผู้หญิง"
                  );
                }).length
              }
            </div>
            <div className={styles.statLabel}>Female / หญิง</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        {/* Main Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <i className="fas fa-table"></i>
              Users List
            </div>
            {loading && (
              <div className={styles.refreshing}>
                <i className="fas fa-sync fa-spin"></i>
                Refreshing...
              </div>
            )}
          </div>

          <div className={styles.cardBody}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.textCenter}>ID</th>
                    <th>
                      <i className="fas fa-user"></i>
                      Name
                    </th>
                    <th>
                      <i className="fas fa-at"></i>
                      Username
                    </th>
                    <th>
                      <i className="fas fa-lock"></i>
                      Password
                    </th>
                    <th>
                      <i className="fas fa-map-marker-alt"></i>
                      Address
                    </th>
                    <th>
                      <i className="fas fa-venus-mars"></i>
                      Gender
                    </th>
                    <th>
                      <i className="fas fa-birthday-cake"></i>
                      Birthday
                    </th>
                    <th className={styles.textCenter}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan="8" className={styles.noData}>
                        <i className="fas fa-inbox"></i>
                        <p>No users found</p>
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={
                          index % 2 === 0 ? styles.evenRow : styles.oddRow
                        }
                      >
                        <td className={styles.textCenter}>
                          <span className={styles.idBadge}>{item.id}</span>
                        </td>
                        <td>
                          <div className={styles.nameCell}>
                            <div className={styles.firstName}>
                              {item.firstname}
                            </div>
                            <div className={styles.fullName}>
                              {item.fullname ||
                                `${item.firstname} ${item.lastname}`}
                            </div>
                            <div className={styles.lastname}>
                              {item.lastname}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.username}>
                            {item.username}
                          </span>
                        </td>
                        <td>
                          <span className={styles.password}>••••••••</span>
                        </td>
                        <td>
                          <span className={styles.address} title={item.address}>
                            {item.address}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${styles.genderBadge} ${
                              item.sex === "Male" ? styles.male : styles.female
                            }`}
                          >
                            <i
                              className={`fas ${
                                item.sex === "Male" ? "fa-mars" : "fa-venus"
                              }`}
                            ></i>
                            {item.sex}
                          </span>
                        </td>
                        <td>
                          <span className={styles.birthday}>
                            {formatDate(item.birthday)}
                          </span>
                        </td>
                        <td className={styles.textCenter}>
                          <div className={styles.actionButtons}>
                            <button
                              className={styles.btnEdit}
                              onClick={() =>
                                router.push(`/admin/users/edit/${item.id}`)
                              }
                              title="Edit User"
                            >
                              ✏️
                            </button>
                            <button
                              className={styles.btnDelete}
                              onClick={() =>
                                handleDelete(item.id, item.username)
                              }
                              title="Delete User"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
