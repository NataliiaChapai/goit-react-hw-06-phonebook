import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {add, remove, filter, getContacts, getFilter} from '../redux/contactsSlice'


export default function App() {
  const contacts = useSelector(getContacts);
  const filterContact = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    if (contacts.find(contact => contact.name === formData.name)) {
      return alert(`${formData.name} is already in contacts`);
    }
    let id = nanoid();
    dispatch(add({...formData, id}));
  }

  const handleFilter = event => {
    dispatch(filter(event.target.value));
  }

  const handleDeleteItem = (contactId) => {
    dispatch(remove(contactId));
  }
  
  const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterContact.toLocaleLowerCase())
  );
  
  return (
    <div style={{ alignItems: 'center', padding: '50px' }}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit}/>
      <h2>Contacts</h2>
      <Filter value={filterContact} onFilterInput={handleFilter} />
      <ContactList formData={filterContacts} onDeleteBtnClick={handleDeleteItem}/>
    </div>
  );
}