import { useEffect, useRef } from "react";

export default function InfiniteScroll({ posts, setPage, loading }) {
  const imgRef = useRef([]);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const obv = new IntersectionObserver((el) => {
      if (el[0].isIntersecting && !loading) {
        obv.unobserve(el[0].target);
        setPage((prev) => prev + 1);
      }
    });

    const lastel = imgRef.current[imgRef.current.length - 1];
    obv.observe(lastel);

    return () => {
      obv.unobserve(lastel);
      obv.disconnect();
    };
  }, [posts]);

  return (
    <div className="image">
      {posts?.map((post, index) => {
        console.log(post.url);

        return (
          <div ref={(el) => (imgRef.current[index] = el)}>
            <img src={post.download_url} height={300} width={posts.width} />
          </div>
        );
      })}
      {loading && <p>loading...</p>}
    </div>
  );
}
