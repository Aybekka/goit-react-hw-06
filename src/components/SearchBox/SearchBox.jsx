import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
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
        onChange={e => dispatch(changeFilter(e.target.value))}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
