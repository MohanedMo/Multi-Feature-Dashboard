import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";

import "./header.css"

const Header = () => {
  const likes = [
    {
      name: "Services",
      route: "#services"
    },
    {
      name: "Portfolio",
      route: "#portfolio"
    },
    {
      name: "About",
      route: "#about"
    },
    {
      name: "Contact",
      route: "#contact"
    }
  ]
  const [toggleLinks, setToggleLinks] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggleLinks(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header>
      <div className="container">
        <img className="logo" src={logo} alt="Logo" />
        <div className="links" ref={menuRef}>
          <button onClick={() => setToggleLinks(!toggleLinks)} className="icon">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul style={{display: toggleLinks ? "block" : "none"}}>
            {likes.map((link, index) => (
            <li key={index}><a href={link.route} onClick={() => setToggleLinks(false)}>{link.name}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
