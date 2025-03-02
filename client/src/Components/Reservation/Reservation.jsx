import React, { useState } from "react";
import { Table, Tag, Button, Space } from "antd";

const Reservation = () => {
  // Données fictives des réservations
  const [reservations, setReservations] = useState([
    { id: 1, client: "Jean Dupont", email: "jean.dupont@email.com", tel: "0123456789", place: 4, date: "2025-03-10", heure: "19:00", status: "En attente" },
    { id: 2, client: "Marie Curie", email: "marie.curie@email.com", tel: "0987654321", place: 2, date: "2025-03-11", heure: "20:30", status: "En attente" },
    { id: 3, client: "Albert Einstein", email: "albert.einstein@email.com", tel: "0678901234", place: 6, date: "2025-03-12", heure: "18:45", status: "En attente" }
  ]);

  // Fonction pour mettre à jour le statut de la réservation
  const updateStatus = (id, newStatus) => {
    setReservations(reservations.map(res => res.id === id ? { ...res, status: newStatus } : res));
  };

  // Colonnes du tableau
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Client", dataIndex: "client", key: "client" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Téléphone", dataIndex: "tel", key: "tel" },
    { title: "Places", dataIndex: "place", key: "place" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Heure", dataIndex: "heure", key: "heure" },
    { 
      title: "Statut", 
      dataIndex: "status", 
      key: "status",
      render: status => (
        <Tag color={status === "Acceptée" ? "green" : status === "Refusée" ? "red" : "orange"}>
          {status}
        </Tag>
      ) 
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => updateStatus(record.id, "Acceptée")} style={{ backgroundColor: "green", borderColor: "green" }}>
            Accepter
          </Button>
          <Button type="primary" danger onClick={() => updateStatus(record.id, "Refusée")}>
            Refuser
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: "24px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Liste des Réservations</h2>
      <Table columns={columns} dataSource={reservations} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default Reservation;
