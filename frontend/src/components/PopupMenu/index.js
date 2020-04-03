import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, Badge, Popup } from './styles';

export default function PopupMenu({ children }) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={toggleVisible}>
        <MdMoreHoriz size={16} color="C6C6C6" />
      </Badge>
      <Popup visible={visible}>{children}</Popup>
    </Container>
  );
}

PopupMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
