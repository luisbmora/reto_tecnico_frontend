import React, { useState, useEffect } from 'react';
import { Table, Button, Icon, Modal, Input, Grid, Header, Segment } from 'semantic-ui-react';
import CompanyForm from './CompanyForm';
import { createCompany, getCompanies, updateCompany, deleteCompany } from '../services/companyService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que el contexto está correctamente importado

const CompanyDashboard = () => {
  const { logout } = useAuth(); // Usar el contexto para manejar la lógica de cierre de sesión
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(5);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const loadCompanies = async () => {
    try {
        const companiesData = await getCompanies();
        const sortedCompanies = companiesData.sort((a, b) => 
            a.name.localeCompare(b.name) 
        );
        setCompanies(sortedCompanies);
    } catch (error) {
        console.error('Error al cargar las empresas:', error);
        toast.error('Error al cargar las empresas');
    }
};

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleAddCompany = async (newCompany) => {
    try {
      const createdCompany = await createCompany(newCompany);
      setCompanies([...companies, createdCompany]);
      toast.success('Empresa creada exitosamente');
    } catch (error) {
      console.error('Error al crear la empresa:', error);
      toast.error('Error al crear la empresa');
    }
  };

  const handleUpdateCompany = async (id, updatedData) => {
    try {
      await updateCompany(id, updatedData);
      loadCompanies();
      toast.success('Empresa actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la empresa:', error);
      toast.error('Error al actualizar la empresa');
    }
  };

  const handleDeleteCompany = async (companyId) => {
    try {
        await deleteCompany(companyId); 
        loadCompanies(); 
        // setCompanies(updatedCompanies); 
        toast.success('Empresa eliminada');
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        toast.error('Error al eliminar la empresa');
    }
};


  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCompany(null);
  };

  const handleCreateCompany = () => {
    setShowModal(true);
  };

  const handleSubmitForm = async (company) => {
    if (editingCompany) {
      await handleUpdateCompany(editingCompany.id, company);
    } else {
      await handleAddCompany(company);
    }
    setShowModal(false);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <Grid padded style={{ padding: '20px' }}>
      <Grid.Row>
        <Grid.Column width={16} textAlign="right">
          <Button basic color="red" onClick={handleLogout}>
            <Icon name="sign-out" /> Cerrar Sesión
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as='h2' textAlign='left'>
            Dashboard de Empresas
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            icon='search'
            placeholder='Buscar por nombre...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button basic color="blue" onClick={handleCreateCompany} style={{ marginLeft: '10px' }}>
            <Icon name="plus" /> Crear Empresa
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment>
            {currentCompanies.length === 0 ? (
              <p>No hay empresas con ese nombre, dar de alta en el botón de agregar empresa</p>
            ) : (
              <Table textAlign='center' celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Tipo de Empresa</Table.HeaderCell>
                    <Table.HeaderCell>Fecha de Constitución</Table.HeaderCell>
                    <Table.HeaderCell>Comentarios</Table.HeaderCell>
                    <Table.HeaderCell>Favorita</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {currentCompanies.map((company, index) => (
                    <Table.Row key={company.id}>
                      <Table.Cell>{index + 1 + (currentPage - 1) * companiesPerPage}</Table.Cell>
                      <Table.Cell>{company.name}</Table.Cell>
                      <Table.Cell>{company.type}</Table.Cell>
                      <Table.Cell>{formatDate(company.date)}</Table.Cell>
                      <Table.Cell>{company.comments || 'Sin comentarios'}</Table.Cell>
                      <Table.Cell>{company.favorite ? 'Sí' : 'No'}</Table.Cell>
                      <Table.Cell>
                        <Button color="yellow" icon onClick={() => { setEditingCompany(company); setShowModal(true); }}>
                          <Icon name="edit" />
                        </Button>
                        <Button icon color="red" onClick={() => handleDeleteCompany(company.id)}>
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              {Array.from({ length: Math.ceil(filteredCompanies.length / companiesPerPage) }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  color={currentPage === index + 1 ? 'blue' : null}
                  style={{ margin: '0 5px' }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Modal.Header>{editingCompany ? 'Editar Empresa' : 'Crear Nueva Empresa'}</Modal.Header>
        <Modal.Content>
          <CompanyForm
            onCancel={handleCloseModal}
            onSubmit={handleSubmitForm}
            initialData={editingCompany}
          />
        </Modal.Content>
      </Modal>
    </Grid>
  );
};

export default CompanyDashboard;
