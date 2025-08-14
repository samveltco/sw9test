import React from 'react';
import Layout from '../components/Layout';

const PMTools: React.FC = () => {
  return (
    <Layout>
      <div className="welcome_block">
        <div className="welcome_words">
          Hey <span className="user_name">Mani,</span> welcome back!
        </div>
        <div className="welcome_info">Welcome to The Valyant Group</div>
        <div className="available_funds">Funds Available: $1,268.22</div>
      </div>

      <div className="tools_section">
        <div className="head_section">
          <h1 className="page_title">PM Tools</h1>
          <div className="block_sub">These features are in beta testing. Inquire with</div>
          <div className="block_sub"><a href="mailto:support@sourcew9.com">support@sourcew9.com</a>if interested in being a beta client</div>
        </div>
        <ul className="tools_list">
          <li>
            <div className="block_tools">
              <div className="page_title icon_sitemap">Site Routing</div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="btn_link">Route your site list</a>
            </div>
          </li>
          <li>
            <div className="block_tools">
              <div className="page_title icon_curve">Project Control Center</div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="btn_link">Track everything about your project</a>
            </div>
          </li>
          <li>
            <div className="block_tools">
              <div className="page_title icon_bulb">SW9STEIN</div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="btn_link">Ask SW9 AI</a>
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default PMTools; 