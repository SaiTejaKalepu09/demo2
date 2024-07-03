import bcrypt from 'bcryptjs';

export const register = async (username, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password with a salt rounds of 10
  const newUser = { username, password: hashedPassword };

  // Check if the user already exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    throw new Error('User already exists');
  }

  // Add the new user to the list of users
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
};
