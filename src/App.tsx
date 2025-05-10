import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import "./styles.css";

export default function App() {
  const [posts, setPosts] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=3`
        );
        const data = await res.json();
        setPosts((prev) => [...(prev || []), ...data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="App">
      <InfiniteScroll posts={posts} setPage={setPage} loading={loading} />
    </div>
  );
}
