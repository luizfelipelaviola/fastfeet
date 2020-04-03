import React, { useState, useRef } from 'react';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Input } from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';
import AvatarInput from '~/components/AvatarInput';

export default function NewDeliveryman() {
  const [name, setName] = useState('');
  const formRef = useRef(null);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  async function handleSubmit() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Insira um nome'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Insira um e-mail válido'),
      });
      const data = formRef.current.getData();
      formRef.current.setErrors({});
      await schema.validate(data, {
        abortEarly: false,
      });

      const send = {
        avatar_id: null,
        name: '',
        email: '',
      };

      if (data.avatar_id) {
        const fileData = new FormData();
        fileData.append('file', data.avatar_id);
        const file = await api.post('files', fileData);
        send.avatar_id = file.data.id;
      }

      send.name = data.name;
      send.email = data.email;

      await api.post('deliverymans', send);

      toast.success(`Entregador cadastrado com sucesso`);
      history.push('/deliverymans');
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
    <div>
      <main>
        <header>
          <h2>Cadastro de entregadores</h2>
          <div className="controls">
            <Link to="/deliverymans" className="return">
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
            <AvatarInput name="avatar_id" userName={name} />
            <Input
              name="name"
              label="Nome"
              value={name}
              onChange={handleNameChange}
            />
            <Input name="email" label="Email" />
          </Form>
        </div>
      </main>
    </div>
  );
}
