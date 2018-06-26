import { loading } from '../../common/components/loading';
import { Users as UsersComponent } from '../components/users';
import { UsersState } from '../state';

export const Users =
loading<UsersState>('usersState', (usersState) => usersState.loadUsers())(
  UsersComponent
);
