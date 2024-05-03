import React from 'react';
import './Item.css';

const Item = ({ contact, onDelete, onEdit }) => {
  return (
    <>
      <p onDoubleClick={() => onEdit(contact)}>
        {contact.fName} {contact.lName}
      </p>
      <span onClick={() => onDelete(contact.id)}>X</span>
    </>
  );
}

export default Item;