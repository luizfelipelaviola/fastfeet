import React, { useRef, useEffect } from 'react';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Input, MaskedInput } from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';
import { Container } from './styles';

export default function EditRecipient() {
  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`recipients/${id}`);
        formRef.current.setData(response.data);
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error('Falha na comunicação com o servidor');
        }
      }
    }
    loadData();
  }, []);

  async function handleSubmit() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Insira o nome do destinarátio'),
        street: Yup.string().required('Insira o logradouro'),
        number: Yup.number().required('Insira o número'),
        complement: Yup.string(),
        neighborhood: Yup.string().required('Insira o bairro'),
        city: Yup.string().required('Insira a cidade'),
        state: Yup.string().required('Insira o Estado'),
        zipcode: Yup.string().required('Insira o CEP'),
      });
      const data = formRef.current.getData();
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`recipients/${id}`, data);

      toast.success('Destinatário editado com sucesso');
      history.push('/recipients');
    } catch (err) {
      const validationErrors = {};
      const errors = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          errors.push(error.message);
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        toast.error(errors[0]);
      } else if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Falha na comunicação com o servidor');
      }
    }
  }

  return (
    <Container>
      <main>
        <header>
          <h2>Edição de destinatário</h2>
          <div className="controls">
            <Link to="/recipients" className="return">
              <MdChevronLeft size={16} color="#FFF" />
              VOLTAR
            </Link>
            <button type="button" className="action" onClick={handleSubmit}>
              <MdDone size={16} color="#FFF" />
              SALVAR
            </button>
          </div>
        </header>
        <div className="content">
          <Form ref={formRef}>
            <Input name="name" label="Nome" />

            <div className="grid-5">
              <Input name="street" label="Rua" />
              <Input name="number" label="Número" />
              <Input name="complement" label="Complemento" />
            </div>

            <div className="grid-4">
              <Input name="neighborhood" label="Bairro" />
              <Input name="city" label="Cidade" />
              <Input name="state" label="Estado" />
              <MaskedInput mask="99.999-999" name="zipcode" label="CEP" />
            </div>
          </Form>
        </div>
      </main>
    </Container>
  );
}
