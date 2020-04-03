import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdAdd,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
  MdChevronLeft,
  MdChevronRight,
  MdReportProblem,
} from 'react-icons/md';
import stc from 'string-to-color';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Avatar } from '~/pages/_layouts/default/styles';

import PopupMenu from '~/components/PopupMenu';
import ModalContainer from '~/components/Modal';
import Loading from '~/components/Loading';
import Modal from './Modal';
import { GetUserStr } from '~/util/AvatarFunctions';
import api from '~/services/api';
import { DeliveryProblems } from './styles';

export default function Deliveries() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [amount, setAmount] = useState(0);
  const [activeAmount, setActiveAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    product: '',
    street: '',
    number: '',
    city: '',
    state: '',
    zipcode: '',
    started: '',
    delivered: '',
    cancelled: '',
    signature: '',
  });

  async function request() {
    try {
      setLoading(true);
      const response = await api.get('deliveries', {
        params: {
          page,
          ...(search && { q: search }),
          ...(problem && { p: true }),
        },
      });
      const orders = response.data.orders.map(order => {
        if (order.end_date) {
          order.status = 'success';
          order.statusName = 'ENTREGUE';
        } else if (order.canceled_at) {
          order.status = 'cancelled';
          order.statusName = 'CANCELADA';
        } else if (order.start_date) {
          order.status = 'collected';
          order.statusName = 'RETIRADA';
        } else {
          order.status = 'pending';
          order.statusName = 'PENDENTE';
        }
        return {
          ...order,
          created_at: order.createdAt
            ? format(parseISO(order.createdAt), 'dd/MM/yyyy', {
                locale: pt,
              })
            : null,
          start_date: order.start_date
            ? format(parseISO(order.start_date), 'dd/MM/yyyy', {
                locale: pt,
              })
            : null,
          canceled_at: order.canceled_at
            ? format(parseISO(order.canceled_at), 'dd/MM/yyyy', {
                locale: pt,
              })
            : null,
          end_date: order.end_date
            ? format(parseISO(order.end_date), 'dd/MM/yyyy', {
                locale: pt,
              })
            : null,
        };
      });
      setData(orders);
      setActiveAmount(orders.length);
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
  }, [search, page, problem]);

  function handleModal(info) {
    setDeliveryInfo(info);
    setOpen(true);
  }

  function handlePage(i) {
    setPage(i);
  }

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja deletar esta encomenda?')) {
      try {
        const response = await api.delete(`deliveries/${id}`);
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
            Não foram encontradas encomendas.
          </div>
        </>
      );
    }

    const items = data.map(item => {
      return (
        <tr key={item.id}>
          <td>#{`0${item.id}`}</td>
          <td>{item.recipient.name}</td>
          <td>
            <span className="name">
              <Avatar color={stc(item.deliveryman.name)}>
                {item.deliveryman.avatar ? (
                  <img
                    src={item.deliveryman.avatar.url}
                    alt={item.deliveryman.name}
                  />
                ) : (
                  GetUserStr(item.deliveryman.name)
                )}
              </Avatar>
              {item.deliveryman.name}
            </span>
          </td>
          <td>{item.recipient.city}</td>
          <td>{item.recipient.state}</td>
          <td>
            <span className={`state-indicator ${item.status}`}>
              {item.statusName}
            </span>
          </td>
          <td>
            <PopupMenu>
              <button
                type="button"
                onClick={() =>
                  handleModal({
                    product: item.product,
                    created: item.created_at,
                    started: item.start_date,
                    delivered: item.end_date,
                    cancelled: item.canceled_at,
                    signature: item.signature ? item.signature.url : null,
                    ...item.recipient,
                  })
                }
              >
                <MdVisibility size={15} color="#8E5BE8" />
                Visualizar
              </button>
              <Link to={`/deliveries/${item.id}/edit`}>
                <MdCreate size={15} color="#4D85EE" />
                Editar
              </Link>
              <button type="button" onClick={() => handleDelete(item.id)}>
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
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
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
        <h2>Gerenciando encomendas</h2>
        <header>
          <div className="input-group">
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por encomendas"
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div>
            <DeliveryProblems
              problem={problem}
              onClick={() => setProblem(!problem)}
            >
              <MdReportProblem size={16} color="#FFF" />
              EXIBIR APENAS ENTREGAS COM PROBLEMAS
            </DeliveryProblems>
            <Link className="action" to="/deliveries/new">
              <MdAdd size={16} color="#FFF" />
              CADASTRAR
            </Link>
          </div>
        </header>
        <DataBody />
      </main>
      <ModalContainer>
        <Modal open={open} setOpen={setOpen} deliveryInfo={deliveryInfo} />
      </ModalContainer>
    </div>
  );
}
