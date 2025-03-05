import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import image12 from "../../Assets/Banniere/1.webp";
import Nav from "../../Components/Nav/Nav";

const Acceuil = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(12);
  const [isExpanded, setIsExpanded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);  // Utiliser un état pour stocker les restaurants récupérés
  const [loading, setLoading] = useState(true);  // État pour gérer le chargement

  const navigate = useNavigate();

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Mélanger les images
  const images = [/* Ajouter ici tes images, comme dans ton code */];
  const shuffledImages = shuffleArray(images);

  // Utiliser useEffect pour charger les restaurants depuis l'API
  useEffect(() => {
    fetch('/api/restaurants')
      .then(response => response.json())
      .then(data => {
        // Assigner les images mélangées aux restaurants
        const restaurantsWithImages = data.map((restaurant, index) => ({
          ...restaurant,
          image: shuffledImages[index % shuffledImages.length],
        }));
        setRestaurants(restaurantsWithImages);  // Mettre à jour l'état avec les restaurants récupérés
        setLoading(false);  // Terminer le chargement
      })
      .catch(error => {
        console.error('Erreur lors du chargement des restaurants:', error);
        setLoading(false);
      });
  }, []);  // Ce useEffect se lance une seule fois au montage du composant

  // Filtrer les restaurants en fonction du terme de recherche
  const filteredRestaurants = restaurants.filter(restaurant => {
    const searchLower = searchTerm.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.address.toLowerCase().includes(searchLower) ||
      restaurant.rating.toString().includes(searchLower)
    );
  });

  const handleShowMore = () => {
    setVisible(visible + 4);
    setIsExpanded(true);
  };

  const handleShowLess = () => {
    setVisible(12);
    setIsExpanded(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Nav onSearch={setSearchTerm} />
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Bienvenue sur Monresto</h1>
        
        <div  style={{ margin:"auto" , width: "95%",  borderRadius: "8px", padding: "1rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <img
            style={{ textAlign: "center",height:"300px" , width: "100%" }}
            src={image12} alt="" srcSet="" />
        </div>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Nos Restaurants populaires</h2>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#888" }}>Chargement...</p>
      ) : filteredRestaurants.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1rem" }}>
          {filteredRestaurants.slice(0, visible).map((restaurant) => (
            <div key={restaurant.id} style={{
              border: "1px solid #ddd", 
              borderRadius: "8px", 
              padding: "1rem", 
              textAlign: "center", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative"
            }}>
              <img src={restaurant.image} alt={restaurant.name} style={{ width: "100%", borderRadius: "8px" }} />
              <h3 style={{ margin: "0.5rem 0" }}>{restaurant.name}</h3>
              <p style={{ margin: "0.25rem 0" }}>{restaurant.address}</p>
              <p style={{ margin: "0.25rem 0" }}>places : {restaurant.seats}</p>
              <p style={{ margin: "0.25rem 0" }}>{restaurant.rating} ⭐</p>
              <button onClick={() => navigate("/resto")} style={{
                position: "absolute", 
                bottom: "1rem", 
                left: "20%", 
                transform: "translateX(-50%)", 
                padding: "0.5rem 1rem", 
                backgroundColor: "orangered", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                cursor: "pointer"
              }}>
                Réserver
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#888" }}>Aucun restaurant trouvé</p>
      )}

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        {isExpanded ? (
          <button onClick={handleShowLess} style={{ padding: "0.5rem 1rem", backgroundColor: "orangered", color: "white", borderRadius: "8px", border: "none", marginTop: "1rem" }}>
            Voir moins
          </button>
        ) : (
          visible < filteredRestaurants.length && (
            <button onClick={handleShowMore} style={{ padding: "0.5rem 1rem", backgroundColor: "orangered", color: "white", borderRadius: "8px", border: "none", marginTop: "1rem" }}>
              Voir plus
            </button>
          )
        )}
      </div>

      <Button
        type="primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          fontSize: "1.2rem",
          backgroundColor: "white",
          color: "orangered",
          border: "solid 5px or",
          borderRadius: "50px",
          padding: "25px 30px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => navigate("/mesreservations")}
      >
        <b>Voir réservations</b>
      </Button>
    </div>
  );
};

export default Acceuil;
