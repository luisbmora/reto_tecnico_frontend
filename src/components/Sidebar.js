// src/components/Sidebar.js

import React, { useState } from 'react';
import { Menu, Icon, Dropdown, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


//para añadir el sidebar que se contrajera utilicé chatGPT
const Sidebar = ({ name, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false); // Estado para manejar si está contraído o no

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Alterna entre expandido y contraído
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Menu
        vertical
        inverted
        fixed="left"
        style={{
          width: collapsed ? '80px' : '250px', // Cambia el ancho si está contraído
          height: '100vh',
          transition: 'width 0.3s', // Transición suave al expandir o contraer
        }}
      >
        <Menu.Item>
          <Button icon onClick={toggleSidebar} basic inverted>
            <Icon name={collapsed ? 'angle right' : 'angle left'} />
          </Button>
        </Menu.Item>

        {/* Solo mostrar si el sidebar NO está colapsado */}
        {!collapsed && (
          <>
            <Menu.Item as={Link} to="/dashboard">
              <Icon name="dashboard" />
              Dashboard
            </Menu.Item>
          </>
        )}

        
        <Menu.Item style={{ marginTop: 'auto' }}>
          <Dropdown
            trigger={
              <span>
                <Icon name="user circle" size="large" />
                {!collapsed && <span>{name}</span>}
              </span>
            }
            pointing={collapsed ? 'top right' : 'top left'}
            className="link item"
          >
            <Dropdown.Menu>
              <Dropdown.Item>
              </Dropdown.Item>
              <Dropdown.Item onClick={onLogout}>
                <span >
                  <Icon name="sign-out" /> Cerrar sesión
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
