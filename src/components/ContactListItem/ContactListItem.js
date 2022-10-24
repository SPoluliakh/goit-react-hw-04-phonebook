import PropTypes from 'prop-types';
import { ListItem, ListItemText, ListItemBtn } from './ContactListItem.styled';

const ContactListItem = ({ onDelitBtn, name, number, id }) => {
  return (
    <>
      <ListItem>
        <ListItemText>
          {name}: {number}
        </ListItemText>
        <ListItemBtn type="button" onClick={() => onDelitBtn(id)}>
          Delet
        </ListItemBtn>
      </ListItem>
    </>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelitBtn: PropTypes.func,
  id: PropTypes.string.isRequired,
};
