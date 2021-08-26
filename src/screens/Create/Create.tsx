import React, { useState } from 'react';
import useLocalStorage from './../../helpers/useLocalStorage';
import { IUser, defaultUsers, defaultUser } from './../../domains/Domains';
import './Create.css';

interface IState {
  users: Array<IUser>;
  user: IUser;
}
interface IProps {}

const Create: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [users, setUsers] = useLocalStorage<IState['users']>(
    'users',
    defaultUsers,
  );
  const [user, setUser] = useState<IState['user']>(defaultUser);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFriendClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string,
  ): void => {
    setUser({ ...user, friends: [...user.friends, { name }] });
  };

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setUsers([...users, user]);
    setUser(defaultUser);
  };

  return (
    <div>
      <div>
        <button onClick={event => handleSave(event)}>Save</button>
      </div>
      <div className="user-form">
        <label>Name</label>
        <input
          type="text"
          onChange={event => handleChangeName(event)}
          placeholder={'name'}
          name={'name'}
          className={''}
          value={user.name}
        />
      </div>
      <div>
        {users.map((u, index) => (
          <li
            className={
              user.friends.filter(friend => friend.name == u.name).length > 0
                ? 'underline'
                : ''
            }
            key={index}>
            {u.name}{' '}
            <button onClick={event => handleFriendClick(event, u.name)}>
              add
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Create;
