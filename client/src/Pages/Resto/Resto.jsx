import React, { useState } from "react";
import { StarOutlined, ArrowLeftOutlined, UserOutlined, RestOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Input, Form, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Remplacer moment par dayjs


import image1 from "../../Assets/restaurants/1.jpeg";
import image2 from "../../Assets/restaurants/2.jpeg";
import image3 from "../../Assets/restaurants/3.jpeg";
import image4 from "../../Assets/restaurants/4.jpeg";

const Resto = () => {
  const navigate = useNavigate();
  
  // Exemple de données
  const restaurant = {
    name: "Le Gourmet",
    address: "123 Rue de la Gastronomie, Paris",
    seats: 50,
    hours: "10:00 - 22:00",
    images: [image1, image2, image3, image4],
    menu: [
      { name: "Spaghetti Bolognese", type: "Plats", price: "15€" },
      { name: "Pizza Margherita", type: "Plats", price: "12€" },
      { name: "Coca-Cola", type: "Boissons", price: "2€" }
    ],
    ratings: 4.5,
    reviews: [
      { user: "Alice", rating: 5, comment: "Excellent service!" },
      { user: "Bob", rating: 4, comment: "Très bon, mais un peu cher." }
    ]
  };

  // États pour gérer l'affichage des modales
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [isModal3Visible, setIsModal3Visible] = useState(false);

  // Afficher la première modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Fermer la première modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Afficher la deuxième modal après confirmation de la première modal
  const showModal2 = () => {
    setIsModalVisible(false); // Fermer la première modal
    setIsModal2Visible(true); // Afficher la deuxième modal
  };

  // Fermer la deuxième modal
  const handleCancel2 = () => {
    setIsModal2Visible(false);
  };

  // Soumettre les informations de la réservation
  const handleSubmit = (values) => {
    console.log("Réservation confirmée avec les informations suivantes :", values);
    setIsModal2Visible(false); // Fermer la deuxième modal
  };

  // Afficher la troisième modal après confirmation de la deuxième modal
  const showModal3 = () => {
    setIsModal2Visible(false); // Fermer la deuxième modal
    setIsModal3Visible(true); // Afficher la troisième modal
  };

  // Fermer la troisième modal
  const handleCancel3 = () => {
    setIsModal3Visible(false);
  };

  // Soumettre les informations de la réservation
  const handleSubmit3 = (values) => {
    console.log("Payement confirmé avec les informations suivantes :", values);
    setIsModal3Visible(false); // Fermer la troisième modal
  };

  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  
    const onFinish = (values) => {
      setLoading(true);
      console.log("Paiement soumis:", values);
      setTimeout(() => {
        setLoading(false);
        /* onClose(); */
      }, 2000);
    };
  

  return (
    <div>
      {/* Header avec Logo et Info utilisateur */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", position: "sticky", top: 0, zIndex: 100, marginTop: "-1rem"  }}>
        <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333" }}>
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
        </div>
        <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333" }}>
        <RestOutlined />
          Monresto
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "1rem", color: "#333" }}> <UserOutlined /> Utilisateur</span>
        </div>
      </header>

      {/* Retour en arrière */}
      {/* <Button 
        onClick={() => navigate(-1)} 
        style={{ 
          margin: "1rem", 
          backgroundColor: "black", 
          color: "white", 
          borderColor: "black" 
        }}
      >
        <ArrowLeftOutlined /> Retour
      </Button> */}

      {/* Section principale du restaurant */}
      <div style={{ display: "flex", padding: "2rem" }}>
        {/* Image du restaurant */}
        <div style={{ flex: 1 }}>
          <img 
            src={restaurant.images[0]} 
            alt="restaurant" 
            style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
          />
        </div>

        {/* Informations sur le restaurant */}
        <div style={{ flex: 2, marginLeft: "2rem" }}>
          <h2>{restaurant.name}</h2>
          <p><strong>Adresse:</strong> {restaurant.address}</p>
          <p><strong>Places disponibles:</strong> {restaurant.seats}</p>
          <p><strong>Horaires:</strong> {restaurant.hours}</p>
          <h3>Menu</h3>
          <ul>
            {restaurant.menu.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px" }}>Note:</span>
            {[...Array(5)].map((_, i) => (
              <StarOutlined key={i} style={{ color: i < restaurant.ratings ? "gold" : "#dcdcdc" }} />
            ))}
            <span style={{ marginLeft: "8px" }}>{restaurant.ratings} / 5</span>
          </div>

          {/* Bouton Réserver qui affiche la modal */}
          <Button 
            style={{ marginTop: "1rem", backgroundColor: "orangered", color: "white" }} 
            onClick={showModal}
          >
            Réserver
          </Button>
        </div>
      </div>

      {/* Section des autres photos */}
      <div style={{ padding: "2rem 4rem", backgroundColor: "#f9f9f9" }}>
        <h3>Autres photos du restaurant</h3>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
          {restaurant.images.map((image, index) => (
            <Card
              key={index}
              hoverable
              cover={<img alt="restaurant" src={image} />}
              style={{ width: "calc(25% - 1rem)", marginBottom: "1rem", borderRadius: "8px" }}
            />
          ))}
        </div>
      </div>

      {/* Section des avis */}
      <div style={{ padding: "2rem", backgroundColor: "#fff" }}>
        <h3>Commentaires</h3>
        {restaurant.reviews.map((review, index) => (
          <div key={index} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span><strong>{review.user}</strong></span>
              <div style={{ display: "flex", alignItems: "center" }}>
                {[...Array(5)].map((_, i) => (
                  <StarOutlined key={i} style={{ color: i < review.rating ? "gold" : "#dcdcdc" }} />
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Première modal pour confirmer la réservation */}
      <Modal
        title="Réservation"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={showModal2}>
            Confirmer
          </Button>,
        ]}
      >
        <p>Veuillez confirmer votre réservation pour le restaurant "{restaurant.name}".</p>
      </Modal>

      {/* Deuxième modal pour entrer les informations de réservation */}
      <Modal
        title="Informations de Réservation"
        visible={isModal2Visible}
        onCancel={handleCancel2}
        footer={[
          <Button key="back" onClick={handleCancel2}>
            Annuler
          </Button>,
          <Button
           key="submit" 
           type="primary" 
           onClick={() => {
            handleSubmit();
            showModal3();
          }}
           
           >
            Confirmer la réservation
          </Button>,
        ]}
      >
        <Form /* onFinish={handleSubmit} */ layout="vertical">
          <Form.Item
            label="Nom"
            name="name"
            rules={[{ required: true, message: "Veuillez entrer votre nom!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Veuillez entrer votre email!" }]}
          >
            <Input placeholder="monresto@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Téléphone"
            name="phone"
            rules={[{ required: true, message: "Veuillez entrer votre numéro de téléphone!"}]}
          >
            <Input placeholder="+228 99887766" />
          </Form.Item>
          <Form.Item
            label="Nombre de personnes"
            name="seats"
            rules={[{ required: true, message: "Veuillez entrer le nombre de personnes!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Veuillez choisir une date!" }]}
          >
            <DatePicker
                style={{ width: "100%" }}
                defaultValue={dayjs()} // Utiliser dayjs au lieu de moment
                format="DD/MM/YYYY"
            />

          </Form.Item>
          <Form.Item
            label="Heure"
            name="time"
            rules={[{ required: true, message: "Veuillez entrer l'heure!" }]}
          >
            <Input type="time" />
          </Form.Item>
          
        </Form>
      </Modal>

      {/* Troisième modal pour entrer les informations de payement */}
      <Modal
        title="Informations de Payement"
        visible={isModal3Visible}
        onCancel={handleCancel3}
        footer={[
          <Button key="back" onClick={handleCancel3}>
            Annuler
          </Button>,
          <Button
           key="submit" 
           type="primary" 
           onClick={handleSubmit3}
           >
            Confirmer le payement
          </Button>,
        ]}
      >
        <Form onFinish={onFinish} /* onFinish={handleSubmit} */ layout="vertical">
        <Form.Item
          label="Nom sur la carte"
          name="cardName"
          rules={[{ required: true, message: "Veuillez entrer le nom sur la carte!" }]}
        >
          <Input placeholder="Nom sur la carte" />
        </Form.Item>

        <Form.Item
          label="Numéro de carte"
          name="cardNumber"
          rules={[{ required: true, message: "Veuillez entrer le numéro de carte!" }]}
        >
          <Input placeholder="**** **** **** ****" maxLength={16} />
        </Form.Item>

        <Form.Item label="Date d'expiration" style={{ display: "flex", gap: 10 }}>
          <Form.Item name="expiryMonth" rules={[{ required: true }]} style={{ display: "inline-block", width: "48%" }}>
            <Input placeholder="MM" maxLength={2} />
          </Form.Item>
          <Form.Item name="expiryYear" rules={[{ required: true }]} style={{ display: "inline-block", width: "48%" }}>
            <Input placeholder="YY" maxLength={2} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="CVV"
          name="cvv"
          rules={[{ required: true, message: "Veuillez entrer le CVV!" }]}
        >
          <Input placeholder="123" maxLength={3} />
        </Form.Item>

        <Form.Item
          label="Méthode de paiement"
          name="paymentMethod"
          rules={[{ required: true, message: "Veuillez sélectionner une méthode de paiement!" }]}
        >
          <Select placeholder="Sélectionner une méthode">
            <Option value="visa">Carte Visa</Option>
            <Option value="mastercard">MasterCard</Option>
            <Option value="stripe">Stripe</Option>
            <Option value="paypal">PayPal</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
            Payer
          </Button>
        </Form.Item>
          
        </Form>
      </Modal>

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

export default Resto;
