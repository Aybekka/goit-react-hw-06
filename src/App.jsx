import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <ThemeToggle />
    <h1 className={styles.title}>Phonebook</h1>
    <div className={styles.formWrapper}>
      <ContactForm />
    </div>
    <h2 className={styles.contactsTitle}>Contacts</h2>
    <SearchBox />
    <ContactList />
  </div>
);

export default App;
