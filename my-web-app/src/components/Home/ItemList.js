import React, { useState } from 'react';

const ItemList = ({ items, setItems }) => {
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredItems = items.filter(item => item.name.includes(filter));

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const addItem = (name, category, date) => {
    const newItem = { id: items.length + 1, name, category, date };
    setItems([...items, newItem]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(items.map(item => (item.id === id ? updatedItem : item)));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <input type="text" placeholder="Filter by name" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <button onClick={() => setSortField('name')}>Sort by Name</button>
      <button onClick={() => setSortField('date')}>Sort by Date</button>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>Toggle Sort Order</button>

      <ul>
        {sortedItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.category} - {item.date}
            <button onClick={() => updateItem(item.id, { ...item, name: 'Updated Name' })}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => addItem('New Item', 'Category C', '2024-06-04')}>Add Item</button>
    </div>
  );
};

export default ItemList;
