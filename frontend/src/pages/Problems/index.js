import React, { useState, useEffect } from 'react';
import {
  MdDeleteForever,
  MdVisibility,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';

import PopupMenu from '~/components/PopupMenu';
import ModalContainer from '~/components/Modal';
import Modal from './Modal';
import api from '~/services/api';
import Loading from '~/components/Loading';

export default function Problems() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [amount, setAmount] = useState(0);
  const [activeAmount, setActiveAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState('');

  async function request() {
    try {
      setLoading(true);
      const response = await api.get('problems');
      setData(response.data.deliveries);
      setActiveAmount(response.data.deliveries.length);
      setAmount(response.data.pages.amount);
      setPages(response.data.pages.total);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Falha na comunicação com o servidor');
      }
    }
  }

  useEffect(() => {
    request();
  }, [page]);

  function handlePage(i) {
    setPage(i);
  }

  async function handleModal(id) {
    const response = await api.get(`delivery/${id}/problems`);
    setProblem(response.data);
    setOpen(true);
  }

  function handleCancel() {}

  function DataBody() {
    if (loading) {
      return <Loading amount={5} />;
    }

    if (!amount) {
      return (
        <>
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            Não foram encontrados destinatários.
          </div>
        </>
      );
    }

    const deliveries = data.map(delivery => {
      return (
        <tr key={delivery.id}>
          <td>#{`0${delivery.id}`}</td>
          <td>
            {delivery.problem[
              delivery.problem.length - 1
            ].description.substring(0, 40)}
            {delivery.problem[delivery.problem.length - 1].description.length >
              40 && '...'}
          </td>
          <td>
            <PopupMenu>
              <button type="button" onClick={() => handleModal(delivery.id)}>
                <MdVisibility size={15} color="#8E5BE8" />
                Visualizar
              </button>
              <button type="button" onClick={() => handleCancel(delivery.id)}>
                <MdDeleteForever size={15} color="#DE3B3B" />
                Cancelar encomenda
              </button>
            </PopupMenu>
          </td>
        </tr>
      );
    });

    const pageControls = [];
    pageControls.push(
      <button
        key="previous"
        type="button"
        onClick={() => handlePage(page - 1)}
        disabled={page === 1 ? 'disabled' : null}
      >
        <MdChevronLeft size={20} color="#FFF" />
      </button>
    );

    for (let i = 1; i <= pages; i += 1) {
      pageControls.push(
        <button key={`page_${i}`} type="button" onClick={() => handlePage(i)}>
          {i}
        </button>
      );
    }

    pageControls.push(
      <button
        key="next"
        type="button"
        onClick={() => handlePage(page + 1)}
        disabled={page === pages ? 'disabled' : null}
      >
        <MdChevronRight size={20} color="#FFF" />
      </button>
    );

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Último problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{deliveries}</tbody>
        </table>
        <nav>{pageControls}</nav>
        <footer>
          Exibindo {activeAmount} de {amount} encomendas
        </footer>
      </>
    );
  }

  return (
    <div>
      <main>
        <h2>Problemas na entrega</h2>
        <DataBody />
      </main>
      <ModalContainer>
        <Modal open={open} setOpen={setOpen} problem={problem} />
      </ModalContainer>
    </div>
  );
}
