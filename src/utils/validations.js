import * as Yup from 'yup';

export const enterpriseSchema = Yup.object().shape({
  name: Yup.string().max(255, 'Máximo 255 caracteres').required('Nombre es obligatorio'),
  foundingDate: Yup.date().required('Fecha de constitución es obligatoria'),
  type: Yup.string().oneOf(['Distribuidor', 'Mayorista', 'Usuario final'], 'Tipo de empresa inválido').required('Tipo de empresa es obligatorio'),
  comments: Yup.string().max(1020, 'Máximo 1020 caracteres'),
  favorite: Yup.boolean(),
});
