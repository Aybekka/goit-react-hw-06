import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be 50 characters or less')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number must be at least 3 characters')
    .max(50, 'Number must be 50 characters or less')
    .required('Number is required'),
});

const initialValues = { name: '', number: '' };

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <Field
            id="name"
            name="name"
            type="text"
            className={styles.input}
            placeholder="Rosie Simpson"
          />
          <ErrorMessage name="name" component="span" className={styles.error} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="number">
            Number
          </label>
          <Field
            id="number"
            name="number"
            type="tel"
            className={styles.input}
            placeholder="459-12-56"
          />
          <ErrorMessage
            name="number"
            component="span"
            className={styles.error}
          />
        </div>

        <button className={styles.submitBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
