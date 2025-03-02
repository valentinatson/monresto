import React, { useState } from "react";
import { Card, Button, Col, Row, Modal, Form, Input, InputNumber, message, Space, List, Typography, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
/* import { UploadFile } from "antd/es/upload/interface"; */

const { Title } = Typography;
const { confirm } = Modal;

const Dashboard = () => {
  const [restaurant, setRestaurant] = useState(null); // Stocke un restaurant
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vitrineFileList, setVitrineFileList] = useState([]); // Fichiers pour l'image vitrine
  const [supplementaryFileList, setSupplementaryFileList] = useState([]); // Fichiers pour images supplémentaires
  const [form] = Form.useForm();

  // Simuler des réservations
  const [reservations, setReservations] = useState({
    pending: 0, // Nombre de réservations en attente
    accepted: 0, // Nombre de réservations acceptées
    rejected: 0, // Nombre de réservations refusées
  });

  // Simuler des commentaires avec informations clients
  const [comments, setComments] = useState([
    {
      name: "Jean Dupont",
      phone: "1234567890",
      email: "jean.dupont@email.com",
      comment: "Le service était excellent, je recommande vivement!",
    },
    {
      name: "Marie Martin",
      phone: "0987654321",
      email: "marie.martin@email.com",
      comment: "La nourriture était bonne, mais l'attente était longue.",
    },
    {
      name: "Pierre Durand",
      phone: "1122334455",
      email: "pierre.durand@email.com",
      comment: "Ambiance agréable, mais les prix sont un peu élevés.",
    },
  ]);

  // Fonction pour afficher ou masquer la modal
  const showModal = () => {
    if (restaurant) {
      form.setFieldsValue(restaurant);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Fermer la modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gérer les changements des images
  const handleVitrineChange = ({ fileList }) => {
    setVitrineFileList(fileList);
  };

  const handleSupplementaryChange = ({ fileList }) => {
    setSupplementaryFileList(fileList); // Correction ici
  };

  // Ajouter ou modifier le restaurant
  const onFinish = (values) => {
    setRestaurant({ ...values, vitrine: vitrineFileList, supplementaryImages: supplementaryFileList });
    message.success(restaurant ? "Restaurant mis à jour !" : "Restaurant ajouté !");
    setIsModalVisible(false);
  };

  // Supprimer le restaurant
  const showDeleteConfirm = () => {
    confirm({
      title: "Êtes-vous sûr de vouloir supprimer ce restaurant ?",
      icon: <ExclamationCircleOutlined />,
      content: "Cette action est irréversible.",
      onOk() {
        setRestaurant(null);
        message.success("Restaurant supprimé !");
      },
    });
  };

  // Affichage des informations du restaurant en cartes
  const restaurantInfo = restaurant ? (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Nom" bordered={false} className="dashboard-card">
          {restaurant.nom}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Adresse" bordered={false} className="dashboard-card">
          {restaurant.adresse}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Contact" bordered={false} className="dashboard-card">
          {restaurant.contact}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Places Disponibles" bordered={false} className="dashboard-card">
          {restaurant.places}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Montant de Réservation (€)" bordered={false} className="dashboard-card">
          {restaurant.montantReservation}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Menu Disponible" bordered={false} className="dashboard-card">
          {restaurant.menu}
        </Card>
      </Col>
    </Row>
  ) : (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Ajouter un Restaurant
      </Button>
    </div>
  );

  return (
    <div
      style={{
        padding: "40px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Tableau de Bord - Gestion du Restaurant
      </Title>

      {/* Affichage des statistiques de réservation */}
      {restaurant && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card bordered={false}>
                <Title level={4}>Réservations en Attente</Title>
                <p>{reservations.pending}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Title level={4}>Réservations Acceptées</Title>
                <p>{reservations.accepted}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Title level={4}>Réservations Refusées</Title>
                <p>{reservations.rejected}</p>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {/* Boutons de gestion du restaurant */}
      {restaurant && (
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <Space size="large">
            <Button type="primary" icon={<EditOutlined />} onClick={showModal} size="large">
              Modifier Restaurant
            </Button>
            <Button danger icon={<DeleteOutlined />} onClick={showDeleteConfirm} size="large">
              Supprimer Restaurant
            </Button>
          </Space>
        </div>
      )}

      {/* Affichage des informations du restaurant sous forme de cartes */}
      {restaurantInfo}

      {/* Affichage des images sélectionnées */}
      {restaurant && (
        <div style={{ marginTop: "30px" }}>
          <Title level={3}>Images du Restaurant</Title>
          <Row gutter={16}>
            {vitrineFileList.length > 0 && (
              <Col span={8}>
                <Card title="Image Vitrine" bordered={false}>
                  <img
                    src={
                      vitrineFileList[0].url ||
                      URL.createObjectURL(vitrineFileList[0].originFileObj)
                    }
                    alt="Vitrine"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Card>
              </Col>
            )}

            {supplementaryFileList.length > 0 &&
              supplementaryFileList.map((file, index) => (
                <Col span={8} key={index}>
                  <Card title={`Image Supplémentaire ${index + 1}`} bordered={false}>
                    <img
                      src={file.url || URL.createObjectURL(file.originFileObj)}
                      alt={`Image ${index + 1}`}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}

      {/* Section des commentaires des clients */}
      {restaurant && (
        <div style={{ marginTop: "30px" }}>
          <Title level={3}>Commentaires des clients :</Title>
          <List
            bordered
            dataSource={comments}
            renderItem={(comment, index) => (
              <List.Item>
                <div>
                  <h4>{comment.name}</h4>
                  <p>
                    <strong>Téléphone:</strong> {comment.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {comment.email}
                  </p>
                  <p>
                    <strong>Commentaire:</strong> {comment.comment}
                  </p>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}

      {/* Modal de Formulaire */}
      <Modal
        title={restaurant ? "Modifier le Restaurant" : "Ajouter un Restaurant"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Champs en 3 colonnes pour un formulaire plus rectangulaire */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="nom"
                label="Nom du Restaurant"
                rules={[{ required: true, message: "Champ obligatoire" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="adresse"
                label="Adresse"
                rules={[{ required: true, message: "Champ obligatoire" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="contact"
                label="Contact"
                rules={[{ required: true, message: "Champ obligatoire" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="places"
                label="Nombre de Places"
                rules={[{ required: true, message: "Champ obligatoire" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="horaires"
                label="Horaires"
                rules={[{ required: true, message: "Champ obligatoire" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="menu"
                label="Menu Disponible"
                rules={[{ required: true, message: "Champ obligatoire" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="montantReservation"
                label="Montant de Réservation (€)"
                rules={[{ required: true, message: "Champ obligatoire" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="imageVitrine" label="Image Vitrine">
                <Upload
                  listType="picture-card"
                  fileList={vitrineFileList}
                  onChange={handleVitrineChange}
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  {vitrineFileList.length < 1 && <UploadOutlined />}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="imagesSupplementaires" label="Images Supplémentaires (Max 4)">
                <Upload
                  listType="picture-card"
                  fileList={supplementaryFileList}
                  onChange={handleSupplementaryChange}
                  maxCount={4}
                  beforeUpload={() => false}
                >
                  {supplementaryFileList.length < 4 && <UploadOutlined />}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
              {restaurant ? "Modifier" : "Ajouter"}
            </Button>
            <Button onClick={handleCancel}>Annuler</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
