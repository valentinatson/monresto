import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, InputNumber, Upload, Space, message, Image, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [vitrineFileList, setVitrineFileList] = useState([]);
  const [supplementaireFileList, setSupplementaireFileList] = useState([]);

  // Récupérer tous les restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/restaurants"); // URL de votre API
        setRestaurants(response.data);
      } catch (error) {
        message.error("Erreur lors de la récupération des restaurants");
      }
    };
    fetchRestaurants();
  }, []);

  // Ouvrir la modal pour ajouter ou modifier un restaurant
  const showModal = () => {
    form.resetFields();
    setVitrineFileList([]);
    setSupplementaireFileList([]);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Ajouter ou modifier un restaurant
  const onFinish = async (values) => {
    const newRestaurant = {
      ...values,
      image1: vitrineFileList[0]?.url,
      image2: vitrineFileList[1]?.url,
      image3: vitrineFileList[2]?.url,
      image4: vitrineFileList[3]?.url
    };

    try {
      if (newRestaurant.id) {
        // Modifier un restaurant existant
        await axios.put(`http://localhost:5000/api/restaurants/${newRestaurant.id}`, newRestaurant);
        message.success("Restaurant modifié !");
      } else {
        // Ajouter un nouveau restaurant
        await axios.post("http://localhost:5000/api/restaurants", newRestaurant);
        message.success("Restaurant ajouté !");
      }
      setIsModalVisible(false);
      setRestaurants([...restaurants, newRestaurant]); // Ajouter à la liste des restaurants
    } catch (error) {
      message.error("Erreur lors de la sauvegarde du restaurant");
    }
  };

  // Supprimer un restaurant
  const handleDelete = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:5000/api/restaurants/${restaurantId}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId));
      message.success("Restaurant supprimé !");
    } catch (error) {
      message.error("Erreur lors de la suppression du restaurant");
    }
  };

  // Colonnes du tableau
  const columns = [
    { title: "Nom", dataIndex: "name", key: "name" },
    { title: "Adresse", dataIndex: "address", key: "address" },
    { title: "Nombre de places", dataIndex: "seats", key: "seats" },
    { title: "Horaires", dataIndex: "hours", key: "hours" },
    {
      title: "Images",
      key: "images",
      render: (text, record) => (
        <div>
          {record.image1 && <Image width={80} src={record.image1} />}
          {record.image2 && <Image width={80} src={record.image2} />}
          {record.image3 && <Image width={80} src={record.image3} />}
          {record.image4 && <Image width={80} src={record.image4} />}
        </div>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>Modifier</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>Supprimer</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={showModal} 
        style={{ marginBottom: 20 }}
      >
        Ajouter un restaurant
      </Button>

      <Table columns={columns} dataSource={restaurants} rowKey="id" />

      {/* Modal pour ajouter/modifier un restaurant */}
      <Modal
        title="Ajouter / Modifier un Restaurant"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Nom" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Adresse" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="seats" label="Nombre de places" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="hours" label="Horaires" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image1" label="Image 1">
            <Upload listType="picture-card" fileList={vitrineFileList} onChange={({ fileList }) => setVitrineFileList(fileList)} maxCount={1}>
              {vitrineFileList.length < 1 && <UploadOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item name="image2" label="Image 2">
            <Upload listType="picture-card" fileList={supplementaireFileList} onChange={({ fileList }) => setSupplementaireFileList(fileList)} maxCount={1}>
              {supplementaireFileList.length < 1 && <UploadOutlined />}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sauvegarder
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Restaurant;
