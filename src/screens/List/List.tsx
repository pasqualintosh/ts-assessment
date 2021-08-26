import React from 'react';
import useLocalStorage from '../../helpers/useLocalStorage';
import { IUser, defaultUsers } from '../../domains/Domains';

interface IState {
  users: Array<IUser>;
}

interface IProps {}

const List: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [users, setUsers] = useLocalStorage<IState['users']>(
    'users',
    defaultUsers,
  );

  return (
    <div>
      <div>
        <button>
          <a href={`/users/create`}>New</a>
        </button>
      </div>
      <div>
        {users.map((user, index) => (
          <li key={index}>
            <a href={`/user/${user.name}`}>{user.name}</a>
          </li>
        ))}
      </div>
    </div>
  );
};

export default List;
