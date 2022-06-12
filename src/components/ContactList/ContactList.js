import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, getContacts, getFilter } from '../../redux/contactsSlice';
import s from './ContactList.module.css';
import ContactItem from './ContactItem/ContactItem';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filterContact = useSelector(getFilter);
  const dispatch = useDispatch();

  const onDeleteBtnClick = (contactId) => {
    dispatch(remove(contactId));
  }
  
  const formData = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterContact.toLocaleLowerCase())
  );
  
  return (
    <ul className={s.list}>
      {formData.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      ))}
    </ul>
  );
}