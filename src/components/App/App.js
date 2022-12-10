import React, { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../Form';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { Box } from '../../components/Box';
import { MaineTitle } from './App.styled';

export const App = () => {
  const LSK_CONTACTS = 'myContacts';

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(LSK_CONTACTS);
    const initialValue = JSON.parse(saved);
    return (
      initialValue || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' }, // test
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' }, // test
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' }, // test
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }, // test
        { id: 'id-5', name: 'Anna Sim', number: '459-12-56' }, // test
        { id: 'id-6', name: 'Hermi Kla', number: '443-89-12' }, // test
        { id: 'id-7', name: 'Eduard Mendi', number: '645-17-79' }, // test
        { id: 'id-8', name: 'Nataly Iqwel', number: '227-91-26' }, // test
      ]
    );
  });


  const [filter, setFilter] = useState('');
  // Responsible for updating the localStorage
  useEffect(() => {
    localStorage.setItem(LSK_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  // Responsible for updating the state
  const handleInputChange = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  // Add new contacts, inform if contact already added, updating the state
  const addContact = (name, number) => {
    const addName = contacts.map(contact => contact.name);
    addName.includes(name);
    if (addName.includes(name)) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  //Responsible for rendering the requested/all contacts
  const findContactbyName = useMemo(() => {
    const fiterNameToLowerCase = filter.toLowerCase();
    const findContactsbyName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(fiterNameToLowerCase)
    );

    return findContactsbyName;
  }, [filter, contacts]);

  //Responsible for deleting contacts
  const deletContact = idx => {
    setContacts(prevState => {
      return prevState.filter(({ id }) => {
        return id !== idx;
      });
    });
  };

  // const renderContactsList = findContactbyName();
  return (
    <Box display="flex">
      <Box
        marginLeft="auto"
        marginRight="auto"
        padding={4}
        border="phonebook"
        backgroundColor="phonebookBcg"
        boxShadow="boxShadow"
        minWidth="420px"
      >
        <MaineTitle>Phonebook</MaineTitle>
        <ContactForm onSubmit={addContact} />
        <Filter filter={filter} onChange={handleInputChange} />
        <ContactList
          contactsQnt={findContactbyName.length}
          renderItems={findContactbyName}
          onDelitBtn={deletContact}
        />
      </Box>
    </Box>
  );
};
