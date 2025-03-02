import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import image1 from "../../Assets/restaurants/1.jpeg";
import image10 from "../../Assets/restaurants/10.jpeg";
import image11 from "../../Assets/restaurants/11.jpeg";
import image2 from "../../Assets/restaurants/2.jpeg";
import image3 from "../../Assets/restaurants/3.jpeg";
import image4 from "../../Assets/restaurants/4.jpeg";
import image5 from "../../Assets/restaurants/5.jpeg";
import image6 from "../../Assets/restaurants/6.jpeg";
import image7 from "../../Assets/restaurants/7.jpeg";
import image8 from "../../Assets/restaurants/8.jpeg";
import image9 from "../../Assets/restaurants/9.jpeg";
import image12 from "../../Assets/Banniere/1.webp";
import Nav from "../../Components/Nav/Nav";

// Liste d'images
const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

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
const shuffledImages = shuffleArray(images);

// Données fictives de restaurants
const restaurants = [
  { id: 1, name: "Le Bernardin", address: "155 W 51st St, New York, NY 10019", rating: 5, seats: 50 },
  { id: 2, name: "The French Laundry", address: "6640 Washington St, Yountville, CA 94599", rating: 5, seats: 45 },
  { id: 3, name: "Nobu", address: "105 Hudson St, New York, NY 10013", rating: 4, seats: 80 },
  { id: 4, name: "L'Atelier de Joël Robuchon", address: "5th Avenue, New York, NY 10001", rating: 5, seats: 60 },
  { id: 5, name: "Per Se", address: "10 Columbus Circle, New York, NY 10023", rating: 5, seats: 50 },
  { id: 6, name: "Eleven Madison Park", address: "11 Madison Ave, New York, NY 10010", rating: 5, seats: 80 },
  { id: 7, name: "Osteria Francescana", address: "Via Stella, 22, Modena, Italy", rating: 5, seats: 30 },
  { id: 8, name: "The Ledbury", address: "127 Ledbury Rd, London, UK", rating: 5, seats: 40 },
  { id: 9, name: "Mugaritz", address: "Ctra. Oiartzun, 27, 20100 Errenteria, Spain", rating: 4, seats: 50 },
  { id: 10, name: "Gaggan", address: "68/1 Soi Langsuan, Lumpini, Pathumwan, Bangkok, Thailand", rating: 4, seats: 60 },
  { id: 11, name: "La Pergola", address: "Via Alberto Cadlolo, 101, Rome, Italy", rating: 5, seats: 50 },
  { id: 12, name: "The Fat Duck", address: "High St, Bray, Maidenhead, UK", rating: 5, seats: 40 },
  { id: 13, name: "Alinea", address: "1723 N Halsted St, Chicago, IL 60614", rating: 5, seats: 55 },
  { id: 14, name: "Mirazur", address: "30 Av. Aristide Briand, Menton, France", rating: 5, seats: 40 },
  { id: 15, name: "Quintonil", address: "Calle Newton 55, Polanco, Mexico City, Mexico", rating: 5, seats: 45 },
  { id: 16, name: "Blue Hill at Stone Barns", address: "630 Bedford Rd, Tarrytown, NY 10591", rating: 5, seats: 50 }
];

// Assigner une image aléatoire à chaque restaurant
const assignImages = () => {
  return restaurants.map((restaurant, index) => ({
    ...restaurant,
    image: shuffledImages[index % shuffledImages.length], // Affecte l'image de manière cyclique si le nombre de restaurants est supérieur au nombre d'images
  }));
};

const Acceuil = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(12);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false); // État pour afficher la fenêtre de commentaire
  const [currentRestaurant, setCurrentRestaurant] = useState(null); // Restaurant sélectionné pour le commentaire
  const [comment, setComment] = useState(""); // Commentaire saisi

  const navigate = useNavigate();

  // Fonction de surlignage du texte
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "orangered", fontWeight: "bold" }}>{part}</span>
      ) : (
        part
      )
    );
  };

  // Filtrage des restaurants par nom, adresse ou avis
  const filteredRestaurants = assignImages().filter(restaurant => {
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


  //gestion des commentaires sur des restaurants
  const handleShowCommentModal = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setComment(""); // Réinitialiser le commentaire après la fermeture
  };

  const handleCommentSubmit = () => {
    console.log(`Commentaire pour ${currentRestaurant.name}: ${comment}`);
    handleCloseCommentModal();
  };


  return (

    

    <div style={{ padding: "2rem" }}>
      <Nav onSearch={setSearchTerm} />

    <div>
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Bienvenue sur Monresto</h1>
        
        <div  style={{ margin:"auto" , width: "95%",  borderRadius: "8px", padding: "1rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <img
            style={{ textAlign: "center",height:"300px" , width: "100%" }}
            src={image12} alt="" srcset="" />
        </div>
        
    </div>


      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Nos Restaurants populaires</h2>
      {filteredRestaurants.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1rem" }}>
          {filteredRestaurants.slice(0, visible).map((restaurant) => (
            <div key={restaurant.id} style={{
              border: "1px solid #ddd", 
              borderRadius: "8px", 
              padding: "1rem", 
              textAlign: "center", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative" // Ajoute position relative pour le bouton en bas
            }}>
              <img src={restaurant.image} alt={restaurant.name} style={{ width: "100%", borderRadius: "8px" }} />
              <h3 style={{ margin: "0.5rem 0" }}>{highlightText(restaurant.name, searchTerm)}</h3>
              <p style={{ margin: "0.25rem 0" }}>{highlightText(restaurant.address, searchTerm)}</p>
              <p style={{ margin: "0.25rem 0" }}>places : {restaurant.seats}</p>
              <p style={{ margin: "0.25rem 0" }}>{restaurant.rating} ⭐</p>

              {/* Bouton "Réserver" en bas de la carte */}
              <button onClick={() => navigate("/resto")}
              style={{
                position: "absolute", // Positionner le bouton en bas
                bottom: "1rem", // Ajouter de l'espace en bas
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
              {/* Bouton "Commentaire" */}
              <button onClick={() => handleShowCommentModal(restaurant)} style={{
                position: "absolute", // Positionner le bouton en bas
                marginTop: "1rem", // Ajouter de l'espace en bas
                bottom: "1rem", // Ajouter de l'espace en bas
                left: "75%", 
                transform: "translateX(-50%)", 
                padding: "0.5rem 1rem", 
                backgroundColor: "grey", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                cursor: "pointer"
              }}>
                  Commentaire
                </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#888" }}>Aucun restaurant trouvé</p>
      )}

      {/* Modal pour le commentaire */}
      {showCommentModal && (
        <div style={{
          position: "fixed", top: "0", left: "0", right: "0", bottom: "0", backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: "1000"
        }}>
          <div style={{
            backgroundColor: "white", padding: "2rem", borderRadius: "8px", width: "300px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
          }}>
            <h3>Commentaire pour {currentRestaurant.name}</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Votre commentaire..."
              rows="4"
              style={{ width: "93%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #ccc", resize: "none" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleCloseCommentModal} style={{ 
                
                padding: "0.5rem 1rem", 
                backgroundColor: "orangered", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                cursor: "pointer" 
                }}>
                Fermer
              </button>
              <button onClick={handleCommentSubmit} style={{
                 
                padding: "0.5rem 1rem", 
                backgroundColor: "green", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                cursor: "pointer"}}>
                Soumettre
              </button>
            </div>
          </div>
        </div>
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


        {/* boutton flottant pour voire mes réservations  */}
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
  onClick={() => navigate("/mesreservations")} // Redirige vers la page des réservations
>
  <b>Voir réservations</b> 
      </Button>




    </div>
  );
};

export default Acceuil;
