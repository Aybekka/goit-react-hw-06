// HW-03'te value ve onChange prop olarak geliyordu, şimdi ikisini de Redux'tan alıyorum
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  // filtre değerini store'dan okuyorum, input'un value'su buradan geliyor
  const filter = useSelector(selectNameFilter);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="search">
        Find contacts by name
      </label>
      <input
        id="search"
        className={styles.input}
        type="text"
        value={filter}
        // her değişiklikte store'u güncelliyorum, ContactList otomatik yeniden render oluyor
        onChange={e => dispatch(changeFilter(e.target.value))}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
