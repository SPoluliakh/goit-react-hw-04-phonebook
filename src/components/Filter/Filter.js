import PropTypes from 'prop-types';

const Filter = ({ filter, onChange }) => {
  return (
    <>
      <h2>Find contacts by name</h2>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onChange}
      ></input>
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Filter;
