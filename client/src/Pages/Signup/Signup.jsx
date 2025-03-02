import React from "react";
import { Form, Input, Button, Select, Card } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const Signup = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <Button type="default" style={{ marginTop: 10 ,marginLeft:20}} onClick={() => window.history.back()}>
            <b>Retour</b>
        </Button>
      <Card className="w-96 shadow-lg" style={{ width: 400, margin: "auto" }}>
        <h2 className="text-center text-2xl font-semibold mb-4" style={{ textAlign: 'center' }}>Inscription</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400, margin: "auto", padding: 20, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", borderRadius: 8 }}
        >
          <Form.Item
            label="Nom d'utilisateur"
            name="username"
            rules={[{ required: true, message: "Veuillez entrer votre nom d'utilisateur!" }]}
          >
            <Input placeholder="Nom d'utilisateur" />
          </Form.Item>

          <Form.Item
            label="Téléphone"
            name="telephone"
            rules={[{ required: true, message: "Veuillez entrer votre numéro de téléphone!" }]}
          >
            <Input placeholder="Numéro de téléphone" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Veuillez entrer un email valide!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Veuillez entrer votre mot de passe!" }]}
          >
            <Input.Password placeholder="Mot de passe" />
          </Form.Item>

          <Form.Item
            label="Rôle"
            name="role"
            rules={[{ required: true, message: "Veuillez sélectionner un rôle!" }]}
          >
            <Select placeholder="Sélectionner un rôle">
              <Option value="client">Client</Option>
              <Option value="restaurateur">Restaurateur</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              S'inscrire
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
          
        </div>
      </Card>
    </div>
  );
};

export default Signup;
