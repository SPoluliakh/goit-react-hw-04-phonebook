import PropTypes from 'prop-types';
import { List } from './ContactList.styled';

import ContactListItem from '../ContactListItem';

const ContactList = ({ renderItems, onDelitBtn, contactsQnt }) => {
  return (
    <>
      <h2>Contacts : {contactsQnt}</h2>
      <List>
        {renderItems.map(({ name, number, id }) => (
          <ContactListItem
            key={id}
            onDelitBtn={onDelitBtn}
            name={name}
            number={number}
            id={id}
          />
        ))}
      </List>
    </>
  );
};

ContactList.propTypes = {
  renderItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDelitBtn: PropTypes.func,
  contactsQnt: PropTypes.number.isRequired,
};

export default ContactList;
