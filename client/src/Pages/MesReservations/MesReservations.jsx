import { Table, Tag } from "antd";
import {  ArrowLeftOutlined, UserOutlined, RestOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MesReservations = () => {
  const reservations = [
    { id: 1, restaurant: "Le Gourmet", date: "2025-03-05", heure: "19:00", place: 2, status: "en attente" },
    { id: 2, restaurant: "Chez Luigi", date: "2025-03-06", heure: "20:30", place: 4, status: "accepté" },
    { id: 3, restaurant: "Sushi World", date: "2025-03-07", heure: "18:45", place: 3, status: "refusé" },
  ];

  const getStatusTag = (status) => {
    let color;
    switch (status) {
      case "accepté":
        color = "green";
        break;
      case "refusé":
        color = "red";
        break;
      default:
        color = "gold";
    }
    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", align: "center" },
    { title: "Restaurant", dataIndex: "restaurant", key: "restaurant" },
    { title: "Date", dataIndex: "date", key: "date", align: "center" },
    { title: "Heure", dataIndex: "heure", key: "heure", align: "center" },
    { title: "Places", dataIndex: "place", key: "place", align: "center" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status", 
      align: "center", 
      render: (status) => getStatusTag(status) 
    },
  ];

  const navigate = useNavigate();

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


    <div style={{ padding: 24, width: "90%", margin:"auto", marginTop:"2rem", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Mes Réservations</h2>
      <Table 
        columns={columns} 
        dataSource={reservations} 
        pagination={false} 
        bordered 
        rowKey="id" 
      />
    </div>
    </div>

   
  );
};

export default MesReservations;
