// Arama filtresi için ayrı bir dilim oluşturdum — contacts slice'ına karıştırmak istemedim
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  // filtreyi persist etmiyorum, sayfa yenilenince arama kutusunun boş gelmesi daha mantıklı
  initialState: { name: '' },
  reducers: {
    // her tuş vuruşunda input'tan gelen yeni değeri state'e yazıyorum
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;

export const selectNameFilter = state => state.filters.name;

export default filtersSlice.reducer;
