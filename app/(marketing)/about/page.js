import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.glassCard}>
        <h1 className={styles.title}>สโมสรฟุตบอลบาร์เซโลนา</h1>
        <p className={styles.subtitle}>
          ประวัติและเกียรติประวัติของทีมยักษ์ใหญ่จากคาตาลัน
        </p>

        <section className={styles.section}>
          <h2>ต้นกำเนิด</h2>
          <p>สโมสรฟุตบอลบาร์เซโลนาก่อตั้งในปี ค.ศ. 1899 โดยโจน กัมเปร์...</p>
        </section>

        <section className={styles.section}>
          <h2>ความสำเร็จ</h2>
          <ul className={styles.list}>
            <li>แชมป์ลาลีกา 28 สมัย</li>
            <li>แชมป์โกปาเดลเรย์ 32 สมัย</li>
            <li>แชมป์ยูฟ่าแชมเปียนส์ลีก 5 สมัย</li>
            <li>แชมป์ฟีฟ่า คลับเวิลด์คัพ 3 สมัย</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>ยุคสมัยสำคัญ</h2>
          <p>ตั้งแต่ยุคของโยฮัน ครัฟฟ์ จนถึงยุคของ MSN บาร์เซโลนาได้สร้างฟุตบอลสไตล์ติกิ-ตากา...</p>
        </section>

        <section className={styles.section}>
          <h2>สนามเหย้า</h2>
          <p>กัมนู เป็นสนามเหย้าของบาร์ซา เปิดใช้งานในปี 1957 มีความจุกว่า 99,000 คน...</p>
        </section>

        <section className={styles.section}>
          <h2>นักเตะระดับโลก</h2>
          <ul className={styles.list}>
            <li>โยฮัน ครัฟฟ์</li>
            <li>ลิโอเนล เมสซี</li>
            <li>โรนัลดินโญ่</li>
            <li>อิเนียสตา, ชาบี, เนย์มาร์, ซัวเรซ</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>🎯 บทบาททางวัฒนธรรม & การเมือง</h2>
          <p>
            บาร์เซโลนาไม่ได้เป็นแค่ทีมฟุตบอล แต่เป็นสัญลักษณ์ของอัตลักษณ์คาตาลัน โดยเฉพาะในยุค Franco
            ที่ภาษาคาตาลันถูกแบน ทำให้สโมสรเป็นพื้นที่ปลอดภัยสำหรับแสดงออกทางวัฒนธรรมและการเมือง
          </p>
        </section>
      </div>
    </div>
  );
}
