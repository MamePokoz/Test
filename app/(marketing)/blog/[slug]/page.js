// app/blog/[slug]/page.tsx

export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  return (
    <div>
      <h1>บทความ: {slug}</h1>
      <p>เนื้อหาบทความ...</p>
    </div>
  );
}