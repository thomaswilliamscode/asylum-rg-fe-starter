import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { colors } from '../../../src/styles/data_vis_colors';
const { primary_accent_color } = colors;




const ProfileButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleButtonClick = () => {
    history.push('/profile');
  };

  const buttonStyle = {
    backgroundColor: `${primary_accent_color}`,
    color: isHovered ? `lightblue` : 'black',
    border: 'none',
    // padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: isHovered ? 'underline' : 'none',
  };
  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleButtonClick()}
    >
      Profile
    </button>
  );
};

export default ProfileButton;