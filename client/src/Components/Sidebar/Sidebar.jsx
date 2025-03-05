import { CreditCardOutlined, UserOutlined, DashboardOutlined, ShopOutlined, ShoppingCartOutlined, RestOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const Sidebar = () => {
  const navigate = useNavigate(); // Pour la redirection après logout

  // Récupérer le nom de l'utilisateur connecté depuis le localStorage
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Supprimer l'utilisateur du stockage
    navigate("/login"); // Rediriger vers la page de connexion
  };

  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: "Dashboard", path: "/dashboard" },
    { key: '2', icon: <ShopOutlined />, label: "Restaurant", path: "/dashboard/restaurant" },
    { key: '3', icon: <ShoppingCartOutlined />, label: "Réservation", path: "/dashboard/reservation" },
    { key: '4', icon: <CreditCardOutlined />, label: "Paiement", path: "/dashboard/payment" }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider width={250} style={{ backgroundColor: '#fff', position: 'fixed', left: 0, top: 0, height: '100vh', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ padding: '16px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <RestOutlined /> Monresto
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[menuItems.find(item => item.label === selectedMenu)?.key]}
          style={{ height: '100%', borderRight: 0, fontSize: '1.1rem' }}
          onClick={({ key }) => {
            const menuItem = menuItems.find(item => item.key === key);
            if (menuItem) setSelectedMenu(menuItem.label);
          }}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: <Link to={item.path}>{item.label}</Link>
          }))}
        />
      </Sider>

      {/* Layout principal */}
      <Layout style={{ marginLeft: 250 }}>
        {/* Header avec le menu actif et les infos utilisateur */}
        <Header style={{ 
          background: '#fff', 
          padding: '0 16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          height: '64px', 
          borderBottom: '1px solid rgb(196, 196, 196)', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          position: "sticky", 
          top: 0, 
          zIndex: 101, 
          marginTop: "-1rem" 
        }}>
          {/* Nom du menu sélectionné */}
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', background: '#f0f0f0', padding: '2px 8px', borderRadius: '8px', color:'#333', height: '45px', display: 'flex', alignItems: 'center' }}>
            {selectedMenu}
          </span>

          {/* Info utilisateur + Logout */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              <UserOutlined /> {userName ? userName : "Utilisateur"}
            </span>
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </div>
        </Header>

        {/* Contenu avec l'outlet pour les composants */}
        <Content
          style={{
            padding: '24px',
            margin: 0,
            minHeight: 280,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Outlet /> {/* Les composants enfants seront rendus ici */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
