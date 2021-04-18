import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  options: [],
  disabled: false,
};

function SelectField(props) {
  const { field, options, label, placeholder, disabled, form } = props;

  const { name, value } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find((option) => option.value === value);

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
        className={showError ? 'is-invalid' : ''}
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default SelectField;

// onChange phai dat duoi field neu duoc dinh nghia lai
// FormFeedback cua reactstrap can invalid o truoc no moi chiu show errors, vi the o SelectField can className chua' is-invalid
