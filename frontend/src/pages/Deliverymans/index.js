import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdAdd,
  MdCreate,
  MdDeleteForever,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import stc from 'string-to-color';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Avatar } from '~/pages/_layouts/default/styles';
import PopupMenu from '~/components/PopupMenu';
import { GetUserStr } from '~/util/AvatarFunctions';
import api from '~/services/api';
import Loading from '~/components/Loading';

export default function Deliverymans() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [amount, setAmount] = useState(0);
  const [activeAmount, setActiveAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  async function request() {
    try {
      setLoading(true);
      const response = await api.get('deliverymans', {
        params: {
          page,
          ...(search && { q: search }),
        },
      });
      setData(response.data.deliverymans);
      setActiveAmount(response.data.deliverymans.length);
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
  }, [search, page]);

  function handlePage(i) {
    setPage(i);
  }

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja deletar este entregador?')) {
      try {
        const response = await api.delete(`deliverymans/${id}`);
        toast.success(response.data.message);
        request();
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error('Falha na comunicação com o servidor');
        }
      }
    }
  }

  function DataBody() {
    if (loading) {
      return <Loading amount={5} />;
    }

    if (!amount) {
      return (
        <>
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            Não foram encontrados entregadores.
          </div>
        </>
      );
    }

    const deliverymans = data.map(deliveryman => {
      return (
        <tr key={deliveryman.id}>
          <td>#{`0${deliveryman.id}`}</td>
          <td>
            <span className="name">
              <Avatar color={stc(deliveryman.name)}>
                {deliveryman.avatar ? (
                  <img src={deliveryman.avatar.url} alt={deliveryman.name} />
                ) : (
                  GetUserStr(deliveryman.name)
                )}
              </Avatar>
            </span>
          </td>
          <td>{deliveryman.name}</td>
          <td>{deliveryman.email}</td>
          <td>
            <PopupMenu>
              <Link to={`/deliverymans/${deliveryman.id}/edit`}>
                <MdCreate size={15} color="#4D85EE" />
                Editar
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(deliveryman.id)}
              >
                <MdDeleteForever size={15} color="#DE3B3B" />
                Excluir
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
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{deliverymans}</tbody>
        </table>
        <nav>{pageControls}</nav>
        <footer>
          Exibindo {activeAmount} de {amount} entregadores
        </footer>
      </>
    );
  }

  return (
    <div>
      <main>
        <h2>Gerenciando entregadores</h2>
        <header>
          <div className="input-group">
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por entregadores"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Link className="action" to="/deliverymans/new">
            <MdAdd size={16} color="#FFF" />
            CADASTRAR
          </Link>
        </header>
        <DataBody />
      </main>
    </div>
  );
}
