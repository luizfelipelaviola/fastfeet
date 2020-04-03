import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import { Container } from './styles';

export default function Modal({ open, setOpen, problem }) {
  const ref = createRef();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
          <div className="label">VISUALIZAR PROBLEMA</div>
          {problem &&
            problem.map(item => (
              <div key={item.id} className="problem">
                <div className="head">
                  {format(
                    utcToZonedTime(parseISO(item.createdAt), timezone),
                    "'Em' dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                    { locale: pt }
                  )}
                </div>
                <div className="body">{item.description}</div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  problem: PropTypes.any.isRequired,
};
