# Build a photo-app

- Use react-router-dom
- Form module: Formik
- Style: node-sass
- UI library: reactstrap
- Redux: Redux toolkit

## Custom Field

- Cau noi giua Ui control va Formik
- UI control la mot controlled component voi props:
  - name: ten xac dinh control
  - value: gia tri cua control
  - onChange: trigger ham nay voi gia tri moi khi co thay doi
  - onBlur: xac dinh khi nao thi control nay bi touched

## Formik

- formik dung errors va touched de show errors
- const { field, form, type, label, placeholder, disabled } = props;
- {...field} bao gom cac thuoc tinh: name, value, onChange, onBlur
- formik dung FastField de control UI control,

## React-hook-form

- Dung controller de control cac UI control
- const { name, label, form, disabled, options } = props;
- render: name, value, onChange, onBlur
- Show errors:
  - const { errors } = form;
  - const errorMessage = errors[name]?.message;
  - const hasError = !!errorMessage;
