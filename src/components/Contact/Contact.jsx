// HW-03'te contact ve onDelete prop alıyordu, şimdi sadece contact geliyor
import { useDispatch } from 'react-redux';
import { FaUser, FaPhone } from 'react-icons/fa';
import { deleteContact } from '../../redux/contactsSlice';
import styles from './Contact.module.css';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <span className={styles.name}>
          <FaUser className={styles.icon} />
          {name}
        </span>
        <span className={styles.number}>
          <FaPhone className={styles.icon} />
          {number}
        </span>
      </div>
      {/* silme işlemini doğrudan dispatch ediyorum, callback zinciri yok */}
      <button
        className={styles.deleteBtn}
        onClick={() => dispatch(deleteContact(id))}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
