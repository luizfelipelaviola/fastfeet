import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';
import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <Container>
      <nav>
        <img src={logo} alt="FastFeet" />
        <ul>
          <li>
            <Link
              to="/deliveries"
              className={`${pathname.startsWith('/deliveries') && 'active'}`}
            >
              ENCOMENDAS
            </Link>
          </li>
          <li>
            <Link
              to="/deliverymans"
              className={`${pathname.startsWith('/deliverymans') && 'active'}`}
            >
              ENTREGADORES
            </Link>
          </li>
          <li>
            <Link
              to="/recipients"
              className={`${pathname.startsWith('/recipients') && 'active'}`}
            >
              DESTINATÁRIOS
            </Link>
          </li>
          <li>
            <Link
              to="/problems"
              className={`${pathname.startsWith('/problems') && 'active'}`}
            >
              PROBLEMAS
            </Link>
          </li>
        </ul>
      </nav>
      <aside>
        <strong>Admin FastFeet</strong>
        <button type="button" onClick={() => dispatch(signOut())}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}
