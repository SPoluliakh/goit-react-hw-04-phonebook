import React, { useState, useEffect } from 'react';
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
        { id: 'id-1', name: 'Rosie Simpson (test)', number: '459-12-56' }, // test
        { id: 'id-2', name: 'Hermione Kline (test)', number: '443-89-12' }, // test
        { id: 'id-3', name: 'Eden Clements (test)', number: '645-17-79' }, // test
        { id: 'id-4', name: 'Annie Copeland (test)', number: '227-91-26' }, // test
        { id: 'id-5', name: 'Anna Sim (test)', number: '459-12-56' }, // test
        { id: 'id-6', name: 'Hermi Kla (test)', number: '443-89-12' }, // test
        { id: 'id-7', name: 'Eduard Mendi (test)', number: '645-17-79' }, // test
        { id: 'id-8', name: 'Nataly Iqwel (test)', number: '227-91-26' }, // test
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
  const findContactbyName = () => {
    const fiterNameToLowerCase = filter.toLowerCase();
    const findContactsbyName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(fiterNameToLowerCase)
    );

    return findContactsbyName;
  };

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
          contactsQnt={findContactbyName().length}
          renderItems={findContactbyName()}
          onDelitBtn={deletContact}
        />
      </Box>
    </Box>
  );
};

// import React, { Component } from 'react';
// import { nanoid } from 'nanoid';
// import ContactForm from '../Form';
// import ContactList from '../ContactList';
// import Filter from '../Filter';
// import { Box } from '../../components/Box';
// import { MaineTitle } from './App.styled';

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson (test)', number: '459-12-56' }, // test
//       { id: 'id-2', name: 'Hermione Kline (test)', number: '443-89-12' }, // test
//       { id: 'id-3', name: 'Eden Clements (test)', number: '645-17-79' }, // test
//       { id: 'id-4', name: 'Annie Copeland (test)', number: '227-91-26' }, // test
//       { id: 'id-5', name: 'Anna Sim (test)', number: '459-12-56' }, // test
//       { id: 'id-6', name: 'Hermi Kla (test)', number: '443-89-12' }, // test
//       { id: 'id-7', name: 'Eduard Mendi (test)', number: '645-17-79' }, // test
//       { id: 'id-8', name: 'Nataly Iqwel (test)', number: '227-91-26' }, // test
//     ],
//     filter: '',
//   };

//   LSK_CONTACTS = 'myContacts';
//   componentDidMount() {
//     const contactList = localStorage.getItem(this.LSK_CONTACTS);
//     if (JSON.parse(contactList)) {
//       this.setState({ contacts: JSON.parse(contactList) });
//     }
//   }

//   componentDidUpdate(prevState) {
//     const oldContacts = prevState.contacts;
//     const newContacts = this.state.contacts;
//     if (oldContacts !== newContacts) {
//       localStorage.setItem(this.LSK_CONTACTS, JSON.stringify(newContacts));
//     }
//   }

//   // Responsible for updating the state
//   handleInputChange = evt => {
//     const { name, value } = evt.currentTarget;
//     this.setState({ [name]: value });
//   };

//   // Add new contacts, inform if contact already added, updating the state
//   addContact = (name, number) => {
//     const addName = this.state.contacts.map(contact => contact.name);
//     addName.includes(name);
//     if (addName.includes(name)) {
//       return alert(`${name} is already in contacts`);
//     }
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   //Responsible for rendering the requested/all contacts
//   findContactbyName = () => {
//     const { filter, contacts } = this.state;
//     const fiterNameToLowerCase = filter.toLowerCase();
//     const findContactsbyName = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(fiterNameToLowerCase)
//     );

//     return findContactsbyName;
//   };

//   //Responsible for deleting contacts
//   deletContact = idx => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== idx),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const renderContactsList = this.findContactbyName();
//     return (
//       <Box display="flex">
//         <Box
//           marginLeft="auto"
//           marginRight="auto"
//           padding={4}
//           border="phonebook"
//           backgroundColor="phonebookBcg"
//           boxShadow="boxShadow"
//           minWidth="420px"
//         >
//           <MaineTitle>Phonebook</MaineTitle>
//           <ContactForm onSubmit={this.addContact} />
//           <Filter filter={filter} onChange={this.handleInputChange} />
//           <ContactList
//             contactsQnt={renderContactsList.length}
//             renderItems={renderContactsList}
//             onDelitBtn={this.deletContact}
//           />
//         </Box>
//       </Box>
//     );
//   }
// }
