# İletişim Kitabı — HW-06 (Redux Toolkit)

HW-03'te React local state ile yazdığım Phonebook uygulamasını bu ödevde **Redux Toolkit** ve **Redux Persist** kullanarak yeniden düzenledim. Arayüz ve tasarım tamamen aynı kaldı, sadece durum yönetimi katmanı değişti.

---

## HW-03'e Göre Ne Değişti?

| Konu | HW-03 | HW-06 |
|---|---|---|
| State yönetimi | `useState` | Redux Toolkit (`createSlice`) |
| Kalıcı depolama | `useEffect` + `localStorage` | Redux Persist |
| Prop geçişi | `onAdd`, `onDelete`, `onChange`, `contacts`, `filter` | Yok — bileşenler Redux'tan okuyor |
| Filtreleme | `App.jsx` içinde | `ContactList.jsx` içinde |
| ID üretimi | `ContactForm` içinde `nanoid()` | `contactsSlice` `prepare` callback'inde |

---

## Proje Yapısı

```
src/
├── redux/
│   ├── store.js           → store, persistReducer ve persistor yapılandırması
│   ├── contactsSlice.js   → kişi ekleme/silme eylemleri ve seçici
│   └── filtersSlice.js    → arama filtresi eylemi ve seçici
├── components/
│   ├── Contact/           → tek kişi kartı (sadece contact prop'u alır)
│   ├── ContactForm/       → kişi ekleme formu (prop almaz)
│   ├── ContactList/       → filtrelenmiş liste (prop almaz)
│   ├── SearchBox/         → arama kutusu (prop almaz)
│   └── ThemeToggle/       → karanlık/aydınlık tema (local state — Redux'a taşımadım)
├── App.jsx                → sadece düzen, state yok
└── main.jsx               → Provider + PersistGate
```

---

## Redux Başlangıç Durumu

```js
{
  contacts: {
    items: []      // kişi listesi — localStorage'a kaydediliyor
  },
  filters: {
    name: ""       // arama metni — kaydedilmiyor, her oturumda sıfırlanıyor
  }
}
```

---

## Eylemler (Actions)

| Eylem | Dilim | Açıklama |
|---|---|---|
| `addContact({ name, number })` | contacts | Yeni kişi ekler; `id`'yi slice içinde `nanoid` ile üretir |
| `deleteContact(id)` | contacts | Verilen `id`'ye sahip kişiyi listeden siler |
| `changeFilter(value)` | filters | Arama kutusundaki metni günceller |

## Seçiciler (Selectors)

| Seçici | Döndürdüğü |
|---|---|
| `selectContacts(state)` | `state.contacts.items` — tüm kişi dizisi |
| `selectNameFilter(state)` | `state.filters.name` — güncel filtre metni |

---

## Redux Persist

Sadece `contacts.items` dizisi `localStorage`'a kaydediliyor. Sayfa yenilendiğinde kişiler korunur, arama kutusu boş gelir.

`redux-persist/lib/storage` Vite'ın ESM ortamında düzgün çalışmadığı için `localStorage`'ı doğrudan saran özel bir storage nesnesi yazdım:

```js
const storage = {
  getItem: key => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: key => Promise.resolve(localStorage.removeItem(key)),
};
```

---

## Kullanılan Teknolojiler

- **React 19** — arayüz
- **Redux Toolkit** — durum yönetimi (`createSlice`, `configureStore`)
- **React Redux** — bileşen bağlantısı (`useSelector`, `useDispatch`)
- **Redux Persist** — localStorage kalıcılığı
- **Formik + Yup** — form doğrulama
- **CSS Modules** — bileşen bazlı stillendirme
- **Vite** — proje altyapısı

---

## Çalıştırma

```bash
npm install
npm run dev     # geliştirme sunucusu → http://localhost:5173
npm run build   # üretim derlemesi
```
