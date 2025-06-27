import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

/*Components*/
import LoadingComponent from "./components/loading/loading";
import Search from "./components/search/search";
import DesktopCard from "./components/desktop-card/desktop-card";
import Pagination from "./components/pagination/pagination";

/*Functions*/
import { debounce } from "./utils/helper-functions";

/*Files*/
import "./App.css";
import MobileCard from "./components/mobile-card/mobile-card";


interface ApiResponse {
  posts: []
  total: number
  skip: number
  limit: number
}

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [posts, setPosts] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPosts, setTotalPosts] = useState(0)
  const postsPerPage = 10
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage + 1
  const endIndex = Math.min(currentPage * postsPerPage, totalPosts)

  // Fetch posts with pagination or search
  const fetchPosts = useCallback(async (page: number, limit: number, search = "") => {
    try {
      setLoading(true)
      setError(null)

      let url: string

      if (search.trim()) {
        url = `https://dummyjson.com/posts/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${(page - 1) * limit}`
      } else {
        url = `https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      setPosts(data.posts)
      setTotalPosts(data.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts")
      setPosts([])
      setTotalPosts(0)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch data when page or search term changes
  useEffect(() => {
    debounce(() => fetchPosts(currentPage, postsPerPage, inputValue), 300)
  }, [currentPage, inputValue, fetchPosts])

  
  function onChange(value:string){
    setInputValue(value)  
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    navigate({ search: params.toString() });
  }
  function clearSearch(){
    setInputValue('')
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-alert">Error loading posts: {error}</div>
      </div>
    )
  }

    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Blog Posts Dashboard</h1>
            <Search
              value={inputValue}
              totalPosts={totalPosts}
              onChange={onChange}
              onClearSearch={clearSearch}
            />
          </div>
          {loading ? (
            <LoadingComponent />
          ):(
          <div className="card-content">
            {!posts.length ? (
              <div className="empty-state">
              {inputValue ? `No posts found matching "${inputValue}".` : "No posts available."}
            </div>
            ):(
            <>
              {/* Desktop Table View */}
              <div className="table-container table-desktop">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: "4rem" }}>ID</th>
                      <th>Title</th>
                      <th>Body</th>
                      <th>Tags</th>
                      <th style={{ textAlign: "center" }}>Stats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <DesktopCard key={index} post={post}/>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile Card View */}
              <div className="mobile-cards">
                {posts.map((post, index) => (
                      <MobileCard key={index} post={post}/>
                    ))}
              </div>
            </>
            )}
            {posts.length !== 0 && (

            <Pagination totalPages={totalPages} totalPosts={totalPosts} start={startIndex} end={endIndex}/>
            )}
          </div>
          )}
        </div>
      </div>
    );
  }


export default App;
