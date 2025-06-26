import { useState } from "react";

/*Components*/
import LoadingComponent from "./components/loading/loading";
import Search from "./components/search/search";
import DesktopCard from "./components/desktop-card/desktop-card";

/*Functions*/
import { debounce } from "./utils/helper-functions";

/*Files*/
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function searchPosts() {
    if (inputValue.length) {
      console.log(inputValue);
    }
  }

  function onChange(value: string) {
    setInputValue(value);
    searchPosts();
    debounce(searchPosts, 400);
  }
  const clearSearch = () => {
    setInputValue("");
  };

  const postsData = [
    {
      id: 1,
      title: "His mother had always taught him",
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      tags: ["history", "american", "crime"],
      reactions: {
        likes: 192,
        dislikes: 25,
      },
      views: 305,
      userId: 121,
    },
    {
      id: 2,
      title: "He was an expert but not in a discipline",
      body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
      tags: ["french", "fiction", "english"],
      reactions: {
        likes: 859,
        dislikes: 32,
      },
      views: 4884,
      userId: 91,
    },
    {
      id: 3,
      title: "Dave watched as the forest burned up on the hill.",
      body: "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
      tags: ["magical", "history", "french"],
      reactions: {
        likes: 1448,
        dislikes: 39,
      },
      views: 4152,
      userId: 16,
    },
    {
      id: 4,
      title: "All he wanted was a candy bar.",
      body: "All he wanted was a candy bar. It didn't seem like a difficult request to comprehend, but the clerk remained frozen and didn't seem to want to honor the request. It might have had something to do with the gun pointed at his face.",
      tags: ["mystery", "english", "american"],
      reactions: {
        likes: 359,
        dislikes: 18,
      },
      views: 4548,
      userId: 47,
    },
  ];

  if (loading) {
    return <LoadingComponent />;
  } else {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Blog Posts Dashboard</h1>
            <Search
              value={inputValue}
              totalPosts={224}
              onChange={onChange}
              onClearSearch={clearSearch}
            />
          </div>
          <div className="card-content">
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
                    {postsData.map(post => (
                      <DesktopCard key={post.id} post={post}/>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tablet Table View */}
              {/* <div className="table-container table-tablet">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: "4rem" }}>ID</th>
                      <th>Title</th>
                      <th>Tags</th>
                      <th style={{ textAlign: "center" }}>Stats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="font-medium">{post.id}</td>
                        <td>
                          <div className="font-medium">{truncateText(post.title, 40)}</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                            {truncateText(post.body, 60)}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                            {post.tags.slice(0, 1).map((tag) => (
                              <span key={tag} className="badge badge-secondary">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 1 && (
                              <span className="badge badge-outline">+{post.tags.length - 1}</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.75rem" }}
                          >
                            <div className="stat-item">
                              <HeartIcon />
                              <span>{post.reactions.likes}</span>
                            </div>
                            <div className="stat-item">
                              <EyeIcon />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}

              {/* Mobile Card View */}
              {/* <div className="mobile-cards">
                {posts.map((post) => (
                  <div key={post.id} className="post-card">
                    <div className="post-card-header">
                      <div className="post-card-content">
                        <div className="post-card-id">
                          <span className="badge badge-outline font-mono">#{post.id}</span>
                        </div>
                        <h3 className="post-card-title">{post.title}</h3>
                        <p className="post-card-body">{truncateText(post.body, 120)}</p>
                      </div>
                    </div>

                    <div className="post-card-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="badge badge-secondary">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && <span className="badge badge-outline">+{post.tags.length - 3}</span>}
                    </div>

                    <div className="post-card-stats">
                      <div className="stats-group">
                        <div className="stat-item">
                          <HeartIcon />
                          <span>{post.reactions.likes}</span>
                        </div>
                        <div className="stat-item">
                          <ThumbsDownIcon />
                          <span>{post.reactions.dislikes}</span>
                        </div>
                        <div className="stat-item">
                          <EyeIcon />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
