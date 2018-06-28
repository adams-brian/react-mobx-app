import loading from '../../common/components/loading';
import Users from '../components/users';
import UsersState from '../state';

export default loading<UsersState>('usersState', (usersState) => usersState.loadUsers())(
  Users
);
