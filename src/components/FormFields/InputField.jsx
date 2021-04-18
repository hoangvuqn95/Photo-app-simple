import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, placeholder, disabled } = props;

  const { name } = field;
  // { name, values, onChange, onBlur} = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={name}
        // name={name}
        // onChange={onChange}
        // onBlur={onBlur}
        // value={value}
        {...field}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        invalid={showError}
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
