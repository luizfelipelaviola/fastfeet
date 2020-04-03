import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import stc from 'string-to-color';
import { MdImage } from 'react-icons/md';
import { useField } from '@unform/core';

import { Container } from './styles';
import { hexToRgb, GetUserStr } from '~/util/AvatarFunctions';

export default function AvatarInput({ name, userName }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const [color, setColor] = useState(hexToRgb('#DDDDDD'));
  const nameStr = GetUserStr(userName);

  useEffect(() => {
    setColor(hexToRgb(userName ? stc(userName) : '#DDDDDD'));
    if (inputRef.current) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'files[0]',
        clearValue(ref) {
          ref.value = '';
          setPreview(null);
        },
        setValue(_, value) {
          setPreview(value);
        },
      });
    }
  }, [inputRef, userName, fieldName, registerField]);

  const colorURI = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='${color}' stroke-width='4' stroke-dasharray='5%2c10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`;

  async function handleChange() {
    const input = inputRef.current;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = result => setPreview(result.target.result);
      reader.readAsDataURL(input.files[0]);
    }
  }

  function addImageOverlay() {
    return (
      <span>
        <MdImage size={40} color="#DDD" />
        Adicionar foto
      </span>
    );
  }

  function addCharOverlay() {
    return <div>{nameStr}</div>;
  }

  return (
    <Container color={color} colorURI={colorURI}>
      <label htmlFor={name}>
        <div>
          {nameStr && !preview ? addCharOverlay() : addImageOverlay()}
          <img src={preview || ''} alt="" />
        </div>

        <input
          name={name}
          type="file"
          accept="image/*"
          id={name}
          onChange={handleChange}
          ref={inputRef}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};
