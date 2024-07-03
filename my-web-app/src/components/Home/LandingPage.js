import React, { Component } from 'react';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem('items')) || [],
      newItem: { name: '', category: '', date: '' },
      filter: '',
      sortField: ''
    };
  }

  handleChange = (e) => {
    this.setState({ newItem: { ...this.state.newItem, [e.target.name]: e.target.value } });
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleSortChange = (e) => {
    this.setState({ sortField: e.target.value });
  };

  handleInsert = () => {
    const newItem = { ...this.state.newItem, id: this.state.items.length + 1 };
    const updatedItems = [...this.state.items, newItem];
    this.setState({ items: updatedItems });
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  handleUpdate = (id) => {
    const updatedItems = this.state.items.map(item =>
      item.id === id ? this.state.newItem : item
    );
    this.setState({ items: updatedItems });
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  handleDelete = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems });
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  render() {
    const filteredItems = this.state.items.filter(item =>
      item.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    const sortedItems = this.state.sortField
      ? filteredItems.sort((a, b) => a[this.state.sortField].localeCompare(b[this.state.sortField]))
      : filteredItems;

    return (
      <div>
        <h2>Landing Page</h2>
        <input type="text" placeholder="Filter by name" value={this.state.filter} onChange={this.handleFilterChange} />
        <select onChange={this.handleSortChange}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="date">Date</option>
        </select>
        <ul>
          {sortedItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.category} - {item.date}
              <button onClick={() => this.handleUpdate(item.id)}>Edit</button>
              <button onClick={() => this.handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h3>Add New Item</h3>
        <input type="text" name="name" placeholder="Name" value={this.state.newItem.name} onChange={this.handleChange} />
        <input type="text" name="category" placeholder="Category" value={this.state.newItem.category} onChange={this.handleChange} />
        <input type="date" name="date" placeholder="Date" value={this.state.newItem.date} onChange={this.handleChange} />
        <button onClick={this.handleInsert}>Add</button>
      </div>
    );
  }
}

export default LandingPage;
