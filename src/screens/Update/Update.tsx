import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../helpers/useLocalStorage';
import { IUser, defaultUsers, defaultUser } from '../../domains/Domains';
import { useParams } from 'react-router-dom';
import './Update.css';

interface IState {
  users: Array<IUser>;
  user: IUser;
}
interface IProps {
  update?: boolean;
}

interface IParams {
  name: string;
}

const Create: React.FC<IProps> = (props: IProps): JSX.Element => {
  let { name } = useParams<IParams>();
  const [users, setUsers] = useLocalStorage<IState['users']>(
    'users',
    defaultUsers,
  );
  const [user, setUser] = useState<IState['user']>(defaultUser);

  useEffect(() => {
    if (props.update) {
      const item = users.find(user => user.name == name);
      setUser(item ? item : defaultUser);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFriendClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string,
  ): void => {
    if (user.friends.filter(friend => friend.name === name).length == 0) {
      setUser({ ...user, friends: [...user.friends, { name }] });
    } else {
      const all = user.friends.filter(friend => friend.name !== name);
      setUser({ ...user, friends: [...all] });
    }
  };

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    if (props.update) {
      const all: IState['users'] = users.filter(u => u.name !== name);
      setUsers([...all, user]);
      setUser(defaultUser);
    } else {
      setUsers([...users, user]);
      setUser(defaultUser);
    }
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
          onChange={event => handleChange(event)}
          placeholder={'name'}
          name={'name'}
          className={''}
          value={user.name}
        />
      </div>
      <div>
        {users
          .filter(u => u.name !== name)
          .map((u, index) => (
            <li
              className={
                user.friends.filter(friend => friend.name == u.name).length > 0
                  ? 'underline'
                  : ''
              }
              key={index}>
              {u.name}{' '}
              <button onClick={event => handleFriendClick(event, u.name)}>
                {user.friends.filter(friend => friend.name === u.name).length >
                0
                  ? 'remove'
                  : 'add'}
              </button>
            </li>
          ))}
      </div>
    </div>
  );
};

export default Create;
