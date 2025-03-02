import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Payement = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "85vh" }}>
      <Result
        status="warning"
        title="Service Indisponible"
        subTitle="Le service de paiement est actuellement en maintenance. Merci de revenir plus tard."
        /* extra={
          <Button type="primary" onClick={() => navigate("/dashboard")}>
            Retour au Dashboard
          </Button>
        } */
      />
    </div>
  );
};

export default Payement;






















































































































/* import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const Payement = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Paiement soumis:", values);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal title="Paiement" visible={visible} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={onFinish}>
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
  );
};

export default Payement;
 */