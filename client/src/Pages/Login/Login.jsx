import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <Button type="default" style={{ marginTop: 10 ,marginLeft:20}} onClick={() => window.history.back()}>
            <b>Retour</b>
        </Button>
      <Card className="w-96 shadow-lg" style={{ width: 400, margin: "auto", marginTop: "5rem" }}>
        <h2 className="text-center text-2xl font-semibold mb-4" style={{textAlign: 'center'}}>Connexion</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Veuillez entrer votre email!", type: "email" }]}
          >
            <Input placeholder="Entrez votre email" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Veuillez entrer votre mot de passe!" }]}
          >
            <Input.Password placeholder="Entrez votre mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
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
