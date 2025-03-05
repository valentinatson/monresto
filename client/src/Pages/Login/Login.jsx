import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", values);
      console.log("Login Response:", response.data);
      
      const { token, role, user } = response.data; // Assurez-vous que l'API renvoie l'objet `user`

      
      // Stocker les informations de l'utilisateur dans localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user)); // Stocke l'utilisateur (nom, email...)

      message.success("Connexion réussie !");

      console.log(localStorage.getItem("role"));

      
      // Redirection en fonction du rôle
      if (role === "restaurateur") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

      // Rafraîchir la page pour mettre à jour le Navbar
      window.location.reload();
    } catch (error) {
      console.error("Erreur de connexion :", error);
      message.error(error.response?.data?.message || "Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Button type="default" style={{ marginTop: 10, marginLeft: 20 }} onClick={() => window.history.back()}>
        <b>Retour</b>
      </Button>
      <Card className="w-96 shadow-lg" style={{ width: 400, margin: "auto", marginTop: "5rem" }}>
        <h2 className="text-center text-2xl font-semibold mb-4">Connexion</h2>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Veuillez entrer votre email!", type: "email" }]}>
            <Input placeholder="Entrez votre email" />
          </Form.Item>

          <Form.Item label="Mot de passe" name="password" rules={[{ required: true, message: "Veuillez entrer votre mot de passe!" }]}>
            <Input.Password placeholder="Entrez votre mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Se connecter
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p>Vous n'avez pas encore de compte ? <Link to="/signup">S'inscrire</Link></p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
