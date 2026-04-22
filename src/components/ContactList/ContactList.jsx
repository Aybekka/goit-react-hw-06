// HW-03'te contacts ve onDelete prop olarak geliyordu, artık prop almıyor
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

const ContactList = () => {
  // iki farklı slice'tan veri çekiyorum, her ikisi değişince bileşen yeniden render oluyor
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  // filtreleme mantığını App'ten buraya taşıdım, mantıksal olarak daha doğru yeri burası
  const visibleContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {/* Contact bileşenine sadece contact objesini geçiriyorum, onDelete prop'u yok artık */}
      {visibleContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
