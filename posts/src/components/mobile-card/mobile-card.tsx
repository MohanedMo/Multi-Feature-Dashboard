import State from "../state/state";
import "./mobile-card.css"

interface Post {
  post: {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  };
}


const MobileCard = ({post}: Post) => {
    const stateList = [
    {
      name: "flat-color-icons:like",
      numbers: post.reactions.likes,
      color: "hugeicons:view",
    },
    {
      name: "mdi:dislike-outline",
      numbers: post.reactions.dislikes,
      color: "#6b7280",
    },
    {
      name: "hugeicons:view",
      numbers: post.views,
      color: "#3b82f6",
    },
  ];
    return ( 
        <div key={post.id} className="post-card">
                    <div className="post-card-header">
                      <div className="post-card-content">
                        <div className="post-card-id">
                          <span className="badge badge-outline font-mono">#{post.id}</span>
                        </div>
                        <h3 className="post-card-title">{post.title}</h3>
                        <p className="post-card-body">{post.body}</p>
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
                        {stateList.map((state, index) => (
            <State
              key={index}
              stateNumbers={state.numbers}
              icon={state.name}
              color={state.color}
            />
          ))}
                      </div>
                    </div>
                  </div>
     );
}
 
export default MobileCard;