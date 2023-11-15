import { KeyboardEvent, ChangeEvent, useState } from 'react';
import { setUserName } from './usernameSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function UserName() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [uname, setUname] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUname(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (uname.length) {
        dispatch(setUserName(uname));
        nav('/');
      }
    }
  };

  return (
    <>
      <label htmlFor="uname">Enter your name:</label>
      <input
        type="text"
        id="uname"
        onChange={handleChange}
        name="uname"
        onKeyUp={handleEnter}
        placeholder="Press enter to confirm"
      />
    </>
  );
}

export default UserName;
