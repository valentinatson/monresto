import React from "react";
import { SearchOutlined, RestOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Nav = ({ onSearch }) => {

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(e.target.value); // Passe la valeur de la recherche à la fonction onSearch
  };

  const navigete = useNavigate();

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem",
     backgroundColor: "white", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", position: "sticky", top: 0, zIndex: 100, marginTop: "-1rem" }}>
      {/* Logo */}
      <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333" }}><RestOutlined /> Monresto</div>

      {/* Barre de recherche */}
      <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <input
          type="text"
          placeholder="Rechercher un restaurant par son nom, adresse ou avis"
          style={{ padding: "0.5rem", outline: "none", border: "none", width: "600px" }}
          onChange={handleSearch} // met à jour la recherche au fur et à mesure de la saisie
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "orangered", color: "white", border: "none" }}>
          <SearchOutlined />
        </button>
      </form>

      {/* Boutons */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <button 
          onClick={() => navigete("/login")}
        style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0", borderRadius: "8px", border: "none" }}>
          Login
        </button>
        <button 
          onClick={() => navigete("/signup")}
        style={{ padding: "0.5rem 1rem", backgroundColor: "orangered", color: "white", borderRadius: "8px", border: "none" }}>
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Nav;
