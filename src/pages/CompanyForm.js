// src/components/CompanyForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';

const CompanyForm = ({ onSubmit, onCancel, initialData }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState(''); 
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setDate(initialData.date);
      setComments(initialData.comments);
      setFavorite(initialData.favorite);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const validationErrors = {};

    // Validación de campos obligatorios
    if (!name) validationErrors.name = 'El nombre es obligatorio';
    if (!type) validationErrors.type = 'El tipo de empresa es obligatorio'; // Validar tipo
    if (!date) validationErrors.date = 'La fecha es obligatoria';

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({ name, type, date, comments, favorite });
  };

  return (
    <Form>
      <Form.Field required>
        <label>Nombre</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </Form.Field>
      
      <Form.Field required>
        <label>Tipo de Empresa</label>
        <Form.Select
          placeholder='Seleccione un tipo de empresa'
          options={[
            { key: 'distributor', text: 'Distribuidor', value: 'Distribuidor' },
            { key: 'wholesaler', text: 'Mayorista', value: 'Mayorista' },
            { key: 'end_user', text: 'Usuario Final', value: 'Usuario Final' },
          ]}
          value={type}
          onChange={(e, { value }) => setType(value)}
        />
        {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
      </Form.Field>

      <Form.Field required>
        <label>Fecha de Constitución</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
      </Form.Field>

      <Form.Field>
        <label>Comentarios</label>
        <input 
          value={comments} 
          onChange={(e) => setComments(e.target.value)} 
        />
      </Form.Field>

      <Form.Field>
        <label>Favorita</label>
        <input 
          type="checkbox" 
          checked={favorite} 
          onChange={(e) => setFavorite(e.target.checked)} 
        />
      </Form.Field>

      <Button type='button' onClick={handleSubmit}>Guardar</Button>
      <Button type='button' onClick={onCancel}>Cancelar</Button>
    </Form>
  );
};

export default CompanyForm;
