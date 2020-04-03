import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Modal({ open, setOpen, deliveryInfo }) {
  const ref = createRef();

  function handleClick(event) {
    if (event.target === ref.current) {
      setOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  });

  return (
    <Container open={open} ref={ref}>
      <div className="modal-content">
        <div className="modal-body">
          <div className="label">Informações da encomenda</div>
          <p>{deliveryInfo.product}</p>
          <hr />
          <div className="label">Informações do destinatário</div>
          <p>
            {deliveryInfo.street}, {deliveryInfo.number}
          </p>
          <p>
            {deliveryInfo.city} - {deliveryInfo.state}
          </p>
          <p>{deliveryInfo.zipcode}</p>
          <hr />
          <div className="label">Datas</div>
          {deliveryInfo.created ? (
            <p>
              <strong>Criado em:</strong> {deliveryInfo.created}
            </p>
          ) : null}
          {deliveryInfo.started ? (
            <p>
              <strong>Retirada:</strong> {deliveryInfo.started}
            </p>
          ) : null}
          {deliveryInfo.delivered ? (
            <p>
              <strong>Entregue:</strong> {deliveryInfo.delivered}
            </p>
          ) : null}
          {deliveryInfo.cancelled ? (
            <p>
              <strong>Cancelado em:</strong> {deliveryInfo.cancelled}
            </p>
          ) : null}
          <hr />
          <div className="label">Assinatura do destinatário</div>
          <div className="sign">
            {deliveryInfo.signature ? (
              <img src={deliveryInfo.signature} alt="FastFeet" />
            ) : (
              <div style={{ textAlign: 'center ' }}>
                Nenhuma assinatura fornecida
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  deliveryInfo: PropTypes.shape({
    product: PropTypes.any,
    created: PropTypes.any,
    street: PropTypes.any,
    number: PropTypes.any,
    city: PropTypes.any,
    state: PropTypes.any,
    zipcode: PropTypes.any,
    started: PropTypes.any,
    delivered: PropTypes.any,
    cancelled: PropTypes.any,
    signature: PropTypes.any,
  }).isRequired,
};
