import React, { useState } from 'react';
import {RootState} from "../store";
import {useSelector} from "react-redux";

interface HeaderProps {
  availableFunds: string;
  notificationCount: number;
}


const Header: React.FC<HeaderProps> = ({ availableFunds, notificationCount }) => {
  //TODO get user data from store
    const user = useSelector((state: RootState) => state.auth.user);



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
          Hey <span className="user_name">{user?.firstName},</span> welcome back!
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
          <img src="/images/avatar.jpg" alt="" title="" width="44" height="44"/>
          <span className="user_info">
            <span className="user_name">{user?.firstName} {user?.lastName}</span>
            <span className="user_type">{user?.userType}</span>
          </span>
        </button>
        
        {showProfile && (
          <div className="profile_inner">
            <div className="profile_head">
              <div className="profile_title">{user?.userType}</div>
              <button className="close_btn icon_close" aria-label="close" onClick={hideProfileModal}></button>
            </div>
            <div className="profile_content">
              <div className="profile_main">
                <div className="info_block">
                  <div className="user_position">{user?.userType}</div>
                  <div className="user_name">{'user?.firstName'} {user?.lastName}</div>
                  <div className="sign_info">Date Registered: {user?.createdAt}</div>
                  <div className="sign_info">Last Login: {new Date().toLocaleString()}</div>
                </div>
                <div className="image_block">
                  <img src="/images/avatar.jpg" alt="" title="" width="84" height="84"/>
                </div>
              </div>
              <ul className="profile_contacts">
                <li>
                  <div className="profile_label">Address</div>
                  <div className="profile_info">{user?.streetAddress}, {user?.city}, {user?.state} {user?.zip}</div>
                </li>
                <li>
                  <div className="profile_label">Phone</div>
                  <div className="profile_info">
                    <a href={`tel:${user?.phone}`}>{user?.phone}</a>
                  </div>
                </li>
                <li>
                  <div className="profile_label">Email</div>
                  <div className="profile_info">
                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                  </div>
                </li>
              </ul>
              <div className="about_user">
                <div className="profile_label">User Type:</div>
                <div className="profile_info">{user?.userType}</div>
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
                      <textarea 
                        id="total_required" 
                        name="total_required" 
                        placeholder="Enter your note here..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="field_actions">
                    <button className="standard_btn light_btn" onClick={newNoteHidden}>Cancel</button>
                    <button className="standard_btn dark_btn">Save Note</button>
                  </div>
                </div>
              )}
              {showEditForm && (
                <div className="edit_form">
                  <div className="fields_group">
                    <div className="field_col">
                      <label className="field_name" htmlFor="edit_firstName">First Name</label>
                      <div className="field_block">
                        <input 
                          type="text" 
                          id="edit_firstName" 
                          name="firstName" 
                          defaultValue={user?.firstName}
                        />
                      </div>
                    </div>
                    <div className="field_col">
                      <label className="field_name" htmlFor="edit_lastName">Last Name</label>
                      <div className="field_block">
                        <input 
                          type="text" 
                          id="edit_lastName" 
                          name="lastName" 
                          defaultValue={user?.lastName}
                        />
                      </div>
                    </div>
                    <div className="field_col">
                      <label className="field_name" htmlFor="edit_email">Email</label>
                      <div className="field_block">
                        <input 
                          type="email" 
                          id="edit_email" 
                          name="email" 
                          defaultValue={user?.email}
                        />
                      </div>
                    </div>
                    <div className="field_col">
                      <label className="field_name" htmlFor="edit_phone">Phone</label>
                      <div className="field_block">
                        <input 
                          type="tel" 
                          id="edit_phone" 
                          name="phone"
                          defaultValue={user?.phone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="field_actions">
                    <button className="standard_btn light_btn" onClick={hideForm}>Cancel</button>
                    <button className="standard_btn dark_btn">Save Changes</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header; 