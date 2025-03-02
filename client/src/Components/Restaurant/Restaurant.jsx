import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Upload, Space, message, Image, Row, Col, List } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState(null); // Stocke un seul restaurant
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [vitrineFileList, setVitrineFileList] = useState([]);
  const [supplementaireFileList, setSupplementaireFileList] = useState([]);
  
  // Simuler des commentaires des clients
  const [comments, setComments] = useState([
    "Le service était excellent, je recommande vivement!",
    "La nourriture était bonne, mais l'attente était longue.",
    "Ambiance agréable, mais les prix sont un peu élevés."
  ]);

  // Ouvrir la modal (ajout ou modification)
  const showModal = () => {
    if (restaurant) {
      form.setFieldsValue(restaurant);
      setVitrineFileList(restaurant.imageVitrine || []);
      setSupplementaireFileList(restaurant.imagesSupplementaires || []);
    } else {
      form.resetFields();
      setVitrineFileList([]);
      setSupplementaireFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Ajouter ou modifier le restaurant
  const onFinish = (values) => {
    const newRestaurant = { 
      ...values, 
      imageVitrine: vitrineFileList, 
      imagesSupplementaires: supplementaireFileList 
    };
    setRestaurant(newRestaurant);
    message.success(restaurant ? "Restaurant mis à jour !" : "Restaurant ajouté !");
    setIsModalVisible(false);
  };

  // Suppression du restaurant
  const handleDelete = () => {
    setRestaurant(null);
    message.success("Restaurant supprimé !");
  };

  // Gestion des fichiers uploadés
  const handleVitrineChange = ({ fileList }) => setVitrineFileList(fileList);
  const handleSupplementaireChange = ({ fileList }) => setSupplementaireFileList(fileList);

  // Colonnes du tableau
  const columns = [
    { title: "Nom", dataIndex: "nom", key: "nom" },
    { title: "Adresse", dataIndex: "adresse", key: "adresse" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Places", dataIndex: "places", key: "places" },
    { title: "Horaires", dataIndex: "horaires", key: "horaires" },
    { title: "Menu", dataIndex: "menu", key: "menu" },
    { title: "Montant (€)", dataIndex: "montantReservation", key: "montantReservation" },
    {
      title: "Image Vitrine",
      dataIndex: "imageVitrine",
      key: "imageVitrine",
      render: (images) => images?.length > 0 ? <Image width={80} src={images[0].thumbUrl} /> : "Aucune"
    },
    {
      title: "Images Supplémentaires",
      dataIndex: "imagesSupplementaires",
      key: "imagesSupplementaires",
      render: (images) => images?.length > 0 
        ? images.map((img, index) => <Image key={index} width={50} src={img.thumbUrl} style={{ marginRight: 8 }} />) 
        : "Aucune"
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} onClick={showModal}>Modifier</Button>
          <Button icon={<DeleteOutlined />} danger onClick={handleDelete}>Supprimer</Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: "24px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Gestion du Restaurant</h2>

      {/* Bouton Ajouter (désactivé si un restaurant existe) */}
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={showModal} 
        disabled={!!restaurant} 
        style={{ marginBottom: "16px" }}
      >
        Ajouter un Restaurant
      </Button>

      {/* Tableau */}
      <Table columns={columns} dataSource={restaurant ? [restaurant] : []} rowKey="nom" pagination={false} />

      {/* Section Commentaires */}
      {restaurant && (
        <div style={{ marginTop: "30px" }}>
          <h3>Commentaires des clients :</h3>
          <List
            bordered
            dataSource={comments}  // Affichage des commentaires existants
            renderItem={(comment, index) => (
              <List.Item>
                <strong>Commentaire {index + 1}:</strong> {comment}
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
        width={800} // Largeur du formulaire augmentée
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Champs en 3 colonnes pour un formulaire plus rectangulaire */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="nom" label="Nom du Restaurant" rules={[{ required: true, message: "Champ obligatoire" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="adresse" label="Adresse" rules={[{ required: true, message: "Champ obligatoire" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="contact" label="Contact" rules={[{ required: true, message: "Champ obligatoire" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="places" label="Nombre de Places" rules={[{ required: true, message: "Champ obligatoire" }]}>
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="horaires" label="Horaires" rules={[{ required: true, message: "Champ obligatoire" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="menu" label="Menu Disponible" rules={[{ required: true, message: "Champ obligatoire" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="montantReservation" label="Montant de Réservation (€)" rules={[{ required: true, message: "Champ obligatoire" }]}>
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
                  fileList={supplementaireFileList} 
                  onChange={handleSupplementaireChange} 
                  maxCount={4} 
                  beforeUpload={() => false}
                >
                  {supplementaireFileList.length < 4 && <UploadOutlined />}
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

export default Restaurant;
