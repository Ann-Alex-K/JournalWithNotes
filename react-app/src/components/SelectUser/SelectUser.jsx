import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = e => {
    const curUser = e.target.value;
    setUserId(curUser);
  };

  return (
    <>
      <select
        name='user'
        id='user'
        onChange={changeUser}
        value={userId}
        className={styles['select']}
      >
        <option value='1'>Kate</option>
        <option value='2'>Jhon</option>
      </select>
    </>
  );
}

export default SelectUser;
