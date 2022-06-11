import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
        items: [],
        filter: ''
    };

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        add(state, action) {
            state.items =  [...state.items, action.payload];
        },
        remove(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        filter(state, action) {
            state.filter = action.payload;
        }
    }
})

export default contactsSlice;
export const { add, remove, filter } = contactsSlice.actions;
export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;