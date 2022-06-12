import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Filter.module.css';
import { filter, getFilter} from '../../redux/contactsSlice'

export default function Filter() {
  const {name} = useSelector(getFilter);
  const dispatch = useDispatch();
  
  const onFilterInput = event => {
    dispatch(filter(event.target.value));
  }
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        name="filter"
        value={name}
        onChange={onFilterInput}
      />
    </label>
  );
}