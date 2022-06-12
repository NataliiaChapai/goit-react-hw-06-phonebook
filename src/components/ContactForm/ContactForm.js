import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';
import { add, getContacts } from '../../redux/contactsSlice';

export default function ContactForm() {
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const onSubmit = (formData) => {
        if (contacts.find(contact => contact.name === formData.name)) {
            return alert(`${formData.name} is already in contacts`);
        }
        let id = nanoid();
        dispatch(add({...formData, id}));
    }

    const handleInputChange = () => event => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit?.({name, number});
        resetForm();
    }

    function resetForm() {
      setName('');
      setNumber('');
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.label} htmlFor="name">
                Name
            </label>
            <input
                className={s.input}
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange(name)}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            <label className={s.label} htmlFor="number">
                Number
            </label>
            <input
                className={s.input}
                type="tel"
                name="number"
                value={number}
                onChange={handleInputChange(name)}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            <button className={s.btn} type="submit">
                Add contact
            </button>
        </form>
    );
}