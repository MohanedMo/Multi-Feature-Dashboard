import State from "../state/state";

import "./desktop-card.css";

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

const DesktopCard = ({ post }: Post) => {
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
    <tr key={post.id}>
      <td style={{ fontWeight: "500" }}>{post.id}</td>
      <td>
        <div style={{ fontWeight: "500", width: "220px" }}>{post.title}</div>
      </td>
      <td>
        <div className="body">
          {post.body}
        </div>
      </td>
      <td>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="badge badge-secondary">
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="badge badge-outline">+{post.tags.length - 2}</span>
          )}
        </div>
      </td>
      <td>
        <div className="stats-group" style={{ justifyContent: "center" }}>
          {stateList.map((state, index) => (
            <State
              key={index}
              stateNumbers={state.numbers}
              icon={state.name}
              color={state.color}
            />
          ))}
        </div>
      </td>
    </tr>
  );
};

export default DesktopCard;
