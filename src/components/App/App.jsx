import ContactList from '../ContactList';
import Filter from '../Filter';
import s from '../App/App.module.css';
import { ContactForm } from 'components/ContactForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFilterValueState,
  getItemsValueState,
} from 'redux/contacts/contacts-selectors';

import * as actions from '../../redux/contacts/contacts-actions';
export const App = () => {
  const contacts = useSelector(getItemsValueState);
  const filter = useSelector(getFilterValueState);
  const dispatch = useDispatch();

  const addContacts = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === normalizedName)) {
      alert(`${name} is already in contacts`);
    } else {
      return dispatch(actions.addContact({ name, number }));
    }
  };

  const deleteContacts = contactsId => {
    dispatch(actions.deleteContact(contactsId));
  };

  const changeFilter = e => {
    dispatch(actions.changeFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={s.div}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={e => addContacts(e)} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContacts={deleteContacts}
      />
    </div>
  );
};
