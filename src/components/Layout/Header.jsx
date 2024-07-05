import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';
import AuthNav from '../auth-nav';

const { primary_accent_color } = colors;


function HeaderContent() {
  // useState for isLogged in
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: primary_accent_color,
        // border: '1px solid orange',
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '20%',
          //  border: '1px solid blue',
        }}
      >
        <AuthNav />
        <Link to="/" style={{ color: '#E2F0F7',  }}>
        {/* {paddingRight: '75px'} */}
          Home
        </Link>
        <Link to="/graphs" style={{ color: '#E2F0F7' }}>
          Graphs
        </Link>
      </div>
    </div>
  );
}

export { HeaderContent };
