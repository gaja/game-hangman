import { KeyboardEvent, ChangeEvent, useState } from 'react';
import { setUserName } from './usernameSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStartTime } from '../MainScreen/mainScreenSlice';
import useSound from 'use-sound';

import audioIntro from '/sound/intro.mp3'
import './userName.css'

export function UserName() {
  const [play] = useSound(audioIntro, { loop: true });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [uname, setUname] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUname(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (uname.length) {
        play()
        dispatch(setUserName(uname));
        dispatch(setStartTime());
        nav('/');
      }
    }
  };

  return (
    <div className="container">
      <div>
        <img src="./images/htitle.jpeg" width="100%" />
      </div>
      <div className="username">
        <label htmlFor="uname">Enter your name:</label>
        <input
          type="text"
          id="uname"
          onChange={handleChange}
          name="uname"
          onKeyUp={handleEnter}
          placeholder="Press enter to confirm"
        />
      </div>
    </div>
  );
}

export default UserName;
