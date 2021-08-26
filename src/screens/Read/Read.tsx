import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser, defaultUsers, defaultUser } from '../../domains/Domains';
import useLocalStorage from '../../helpers/useLocalStorage';

interface IState {
  users: Array<IUser>;
  user: IUser | undefined;
}
interface IProps {}

interface IParams {
  name: string;
}

const Read: React.FC<IProps> = (props): JSX.Element => {
  let { name } = useParams<IParams>();
  const [users, setUsers] = useLocalStorage<IState['users']>(
    'users',
    defaultUsers,
  );
  const [user, setUser] = useState<IState['user']>(defaultUser);

  useEffect(() => {
    const item = users.find(user => user.name == name);
    setUser(item ? item : defaultUser);
  }, []);

  return (
    <div>
      <div>{name}</div>
      <div>
        {user?.friends.map((u, index) => (
          <li key={index}>{u.name}</li>
        ))}
      </div>
    </div>
  );
};

export default Read;
