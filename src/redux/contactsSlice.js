// Kişiler için Redux dilimi — ekleme, silme ve seçici fonksiyonları burada tanımlıyorum
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [] },
  reducers: {
    addContact: {
      // reducer sadece payload'ı state'e ekliyor, id üretmek slice'ın işi
      reducer(state, action) {
        state.items.push(action.payload);
      },
      // prepare callback sayesinde nanoid'i bileşen içinde çağırmak zorunda kalmıyorum
      prepare({ name, number }) {
        return { payload: { id: nanoid(), name, number } };
      },
    },
    // action.payload olarak kişinin id'si geliyor, ona göre filtreliyorum
    deleteContact(state, action) {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

// redux-persist _persist anahtarı eklediği için state.contacts.items'a erişmem gerekiyor
export const selectContacts = state => state.contacts.items;

export default contactsSlice.reducer;
