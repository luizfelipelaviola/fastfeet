import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import { useField } from '@unform/core';
import ReactInputMask from 'react-input-mask';

export function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      <label htmlFor={fieldName}>
        {label}
        <input
          name={fieldName}
          id={fieldName}
          ref={inputRef}
          className={error ? 'error' : ''}
          defaultValue={defaultValue}
          {...rest}
        />
      </label>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export function MaskedInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      <label htmlFor={fieldName}>
        {label}
        <ReactInputMask
          name={fieldName}
          id={fieldName}
          ref={inputRef}
          className={error ? 'error' : ''}
          defaultValue={defaultValue}
          {...rest}
        />
      </label>
    </>
  );
}

MaskedInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export function AsyncSelect({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <label htmlFor={fieldName}>
        {label}
        <Select
          name={name}
          cacheOptions
          defaultValue={defaultValue}
          ref={selectRef}
          className="select"
          classNamePrefix={error ? 'error react-select' : 'react-select'}
          {...rest}
        />
      </label>
    </>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
