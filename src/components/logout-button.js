import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { colors } from '../../src/styles/data_vis_colors';
const { primary_accent_color } = colors;


const LogoutButton = () => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const buttonStyle = {
    backgroundColor: `${primary_accent_color}`,
    color: isHovered ? `lightblue` : 'black',
    border: 'none',
    // padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: isHovered ? 'underline' : 'none',
  };
  const { logout } = useAuth0();
  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
