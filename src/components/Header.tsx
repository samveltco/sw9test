import React, { useState } from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  availableFunds: string;
  notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ user, availableFunds, notificationCount }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showNewNote, setShowNewNote] = useState(false);

  const showProfileModal = () => setShowProfile(true);
  const hideProfileModal = () => setShowProfile(false);
  const showForm = () => setShowEditForm(true);
  const hideForm = () => setShowEditForm(false);
  const newNoteShow = () => setShowNewNote(true);
  const newNoteHidden = () => setShowNewNote(false);

  return (
    <div className="header">
      <div className="welcome_block">
        <div className="welcome_words">
          Hey <span className="user_name">{user.name.split(' ')[0]},</span> welcome back!
        </div>
        <div className="welcome_info">Welcome to The Valyant Group</div>
        <div className="available_funds">Funds Available: {availableFunds}</div>
      </div>
      
      <div className="notifications">
        <button className="notif_btn icon_notif" aria-label="notifications">
          <span className="count_block">{notificationCount}</span>
        </button>
      </div>
      
      <div className="profile_block">
        <button className="profile_btn" aria-label="profile" onClick={showProfileModal}>
          <img src={user.avatar} alt="" title="" width="44" height="44"/>
          <span className="user_info">
            <span className="user_name">{user.name}</span>
            <span className="user_type">{user.type}</span>
          </span>
        </button>
        
        {showProfile && (
          <div className="profile_inner">
            <div className="profile_head">
              <div className="profile_title">{user.company}</div>
              <button className="close_btn icon_close" aria-label="close" onClick={hideProfileModal}></button>
            </div>
            <div className="profile_content">
              <div className="profile_main">
                <div className="info_block">
                  <div className="user_position">{user.company}</div>
                  <div className="user_name">{user.name}</div>
                  <div className="sign_info">Date Registered: {user.registrationDate}</div>
                  <div className="sign_info">Last Login: {user.lastLogin}</div>
                </div>
                <div className="image_block">
                  <img src={user.avatar} alt="" title="" width="84" height="84"/>
                </div>
              </div>
              <ul className="profile_contacts">
                <li>
                  <div className="profile_label">Address</div>
                  <div className="profile_info">{user.address}</div>
                </li>
                <li>
                  <div className="profile_label">Website</div>
                  <div className="profile_info">
                    <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a>
                  </div>
                </li>
                <li>
                  <div className="profile_label">Phone</div>
                  <div className="profile_info">
                    <a href={`tel:${user.phone.replace(/[^0-9]/g, '')}`}>{user.phone}</a>
                  </div>
                </li>
                <li>
                  <div className="profile_label">Email</div>
                  <div className="profile_info">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </div>
                </li>
              </ul>
              <div className="about_user">
                <div className="profile_label">Bio / About:</div>
                <div className="profile_info">{user.bio}</div>
              </div>
              <div className="profile_actions">
                <button className="standard_btn light_btn icon_plus" aria-label="add new role" onClick={newNoteShow}>Add new note</button>
                <button className="standard_btn dark_btn icon_pencil" aria-label="edit" onClick={showForm}>Edit</button>
              </div>
              {showNewNote && (
                <div className="new_note">
                  <div className="field_col">
                    <label className="field_name" htmlFor="total_required">Add new note</label>
                    <div className="field_block">
                      <textarea name="total_required" id="total_required" maxLength={500} placeholder="Type here"></textarea>
                    </div>
                  </div>
                  <div className="profile_actions">
                    <button className="standard_btn dark_btn" aria-label="cancel" onClick={newNoteHidden}>Cancel</button>
                    <button className="standard_btn lightest_btn" aria-label="save and publish">Save & Publish</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {showEditForm && (
          <div className="profile_inner form_account">
            <div className="profile_head">
              <div className="profile_title">Edit account</div>
              <button className="close_btn icon_close" aria-label="close" onClick={hideForm}></button>
            </div>
            <div className="profile_content">
              <div className="profile_main">
                <div className="fields_group">
                  <div className="image_block">
                    <img src={user.avatar} alt="" title="" width="84" height="84"/>
                  </div>
                  <div className="add_btns">
                    <label className="standard_btn icon_upload">
                      <input type="file" name="file_attach"/>
                      Upload image
                    </label>
                    <div className="type_block">jpg or png</div>
                  </div>
                </div>
              </div>
              {/* Add more form fields as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header; 