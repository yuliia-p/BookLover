import React from 'react';

export default function MenuItems(props) {
  return (
    props.categories.map((category, index) => {
      return <Category key={index} category={category} />;
    })

  );
}

function Category(props) {
  return (
      <option value={props.category.display_name}>{props.category.display_name}</option>
  );
}
