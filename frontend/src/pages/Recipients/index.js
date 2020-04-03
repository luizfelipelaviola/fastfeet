import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdAdd,
  MdCreate,
  MdDeleteForever,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import PopupMenu from '~/components/PopupMenu';
import api from '~/services/api';
import Loading from '~/components/Loading';

export default function Recipients() {
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
      const response = await api.get('recipients', {
        params: {
          page,
          ...(search && { q: search }),
        },
      });
      setData(response.data.recipients);
      setActiveAmount(response.data.recipients.length);
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
    if (window.confirm('Tem certeza que deseja deletar este destinatário?')) {
      try {
        const response = await api.delete(`recipients/${id}`);
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
            Não foram encontrados destinatários.
          </div>
        </>
      );
    }

    const recipients = data.map(recipient => {
      return (
        <tr key={recipient.id}>
          <td>#{`0${recipient.id}`}</td>
          <td>{recipient.name}</td>
          <td>{`${recipient.street}, ${
            recipient.number
          }${recipient.complement && `, ${recipient.complement}`}, ${
            recipient.neighborhood
          } - ${recipient.city} - ${recipient.state} - ${
            recipient.zipcode
          }`}</td>
          <td>
            <PopupMenu>
              <Link to={`/recipients/${recipient.id}/edit`}>
                <MdCreate size={15} color="#4D85EE" />
                Editar
              </Link>
              <button type="button" onClick={() => handleDelete(recipient.id)}>
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
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{recipients}</tbody>
        </table>
        <nav>{pageControls}</nav>
        <footer>
          Exibindo {activeAmount} de {amount} destinatários
        </footer>
      </>
    );
  }

  return (
    <div>
      <main>
        <h2>Gerenciando destinatários</h2>
        <header>
          <div className="input-group">
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por destinarários"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Link className="action" to="/recipients/new">
            <MdAdd size={16} color="#FFF" />
            CADASTRAR
          </Link>
        </header>
        <DataBody />
      </main>
    </div>
  );
}
