import React, { useState, useEffect } from "react";
import { SearchOutlined, RestOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Nav = ({ onSearch }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Vérifier l'authentification et récupérer l'utilisateur à partir du token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Décodage du payload du token JWT
        setUser({ name: decoded.name, role: decoded.role });  // Mise à jour de l'état de l'utilisateur
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");  // Supprimer le token JWT
    setUser(null);                      // Réinitialiser l'état de l'utilisateur
    navigate("/login");                // Rediriger vers la page de connexion
  };

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem",
      backgroundColor: "white", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", position: "sticky", top: 0, zIndex: 100, marginTop: "-1rem" }}>
      
      {/* Logo */}
      <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333" }}>
        <RestOutlined /> Monresto
      </div>

      {/* Barre de recherche */}
      <form style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <input
          type="text"
          placeholder="Rechercher un restaurant"
          style={{ padding: "0.5rem", outline: "none", border: "none", width: "600px" }}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "orangered", color: "white", border: "none" }}>
          <SearchOutlined />
        </button>
      </form>

      {/* Affichage dynamique */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ fontWeight: "bold" }}> <UserOutlined/> {user.name}</span>  {/* Affichage du nom */}
            <button 
              onClick={handleLogout}
              style={{ padding: "0.5rem 1rem", backgroundColor: "red", color: "white", borderRadius: "8px", border: "none" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate("/login")}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0", borderRadius: "8px", border: "none" }}>
              Login
            </button>
            <button 
              onClick={() => navigate("/signup")}
              style={{ padding: "0.5rem 1rem", backgroundColor: "orangered", color: "white", borderRadius: "8px", border: "none" }}>
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
