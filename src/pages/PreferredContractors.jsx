import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { PreferredGroupsTable, PreferredGroup, AddGroupModal } from '../components/preferred';
import getContractorGroups from '../utils/api/get/getContractorGroups';
import deleteGroup from '../utils/api/delete/deleteGroup';

const PreferredContractors = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const handleAdd = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedGroup(null);
    const data = getContractorGroups().then(res => setGroups(res));
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getContractorGroups();
      setGroups(data);
    };
    fetchGroups();
  }, []);


  const handleEdit = (id) => {
    setSelectedGroup(id);
    console.log(id)
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // setGroups((prev) => prev.filter((g) => g.id !== id));
    setGroups((prev) => prev.filter((g) => g._id !== id))
    deleteGroup(id);
  };

  return (
    <Layout>
      <div className="welcome_block">
        <div className="welcome_words">
          Hey <span className="user_name">Mani,</span> welcome back!
        </div>
        <div className="welcome_info">Welcome to The Valyant Group</div>
        <div className="available_funds">Funds Available: $1,268.22</div>
      </div>

      <div className="preferred_section">
        <div className="head_section">
          <h1 className="page_title">Preferred Contractor Groups</h1>
          <button className="standard_btn icon_plus orange_btn" aria-label="Create work order" onClick={handleAdd}>Add group</button>
        </div>

        <PreferredGroupsTable groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <AddGroupModal selectedGroup={selectedGroup} isOpen={isModalOpen} onClose={handleClose} />
    </Layout>
  );
};

export default PreferredContractors; 