import React, { useEffect, useRef } from 'react';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/core';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { Input, AsyncSelect } from '~/components/Form';
import { Container } from './styles';

export default function EditDelivery() {
  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`deliveries/${id}`);

        formRef.current.setData({
          product: response.data.product,
        });
        formRef.current.setFieldValue('deliveryman', {
          value: response.data.deliveryman.id,
          label: response.data.deliveryman.name,
        });
        formRef.current.setFieldValue('recipient', {
          value: response.data.recipient.id,
          label: response.data.recipient.name,
        });
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

  async function loadDeliverymans(inputValue) {
    const response = await api.get('deliverymans', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.deliverymans.map(option => {
      return {
        value: option.id,
        label: option.name,
      };
    });

    return data;
  }

  async function loadRecipients(inputValue) {
    const response = await api.get('recipients', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.recipients.map(option => {
      return {
        value: option.id,
        label: option.name,
      };
    });

    return data;
  }

  async function handleSubmit() {
    const data = formRef.current.getData();
    const schema = Yup.object().shape({
      recipient: Yup.string().required('Escolha um destinatário'),
      deliveryman: Yup.string().required('Escolha um entregador'),
      product: Yup.string().required('Defina o nome do produto'),
    });

    try {
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put(`deliveries/${id}`, {
        recipient_id: data.recipient,
        deliveryman_id: data.deliveryman,
        product: data.product,
      });

      toast.success(`Encomenda '${response.data.product}' editada com sucesso`);
      history.push('/deliveries');
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
      }
      if (err.response) {
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
          <h2>Edição de encomendas</h2>
          <div className="controls">
            <Link to="/deliveries" className="return">
              <MdChevronLeft size={16} color="#FFF" />
              VOLTAR
            </Link>
            <button type="button" onClick={handleSubmit} className="action">
              <MdDone size={16} color="#FFF" />
              SALVAR
            </button>
          </div>
        </header>
        <div className="content">
          <Form ref={formRef}>
            <div className="grid-2">
              <AsyncSelect
                name="recipient"
                loadOptions={loadRecipients}
                placeholder="Pesquisar..."
                noOptionsMessage={() => 'Digite o nome desejado'}
                label="Destinatário"
              />
              <label>
                <AsyncSelect
                  name="deliveryman"
                  loadOptions={loadDeliverymans}
                  placeholder="Pesquisar..."
                  noOptionsMessage={() => 'Digite o nome desejado'}
                  label="Entregador"
                />
              </label>
            </div>
            <Input name="product" label="Nome do produto" type="text" />
          </Form>
        </div>
      </main>
    </Container>
  );
}
