import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ManageTeamsTable, TeamRow, AddTeamModal } from '../components/manageTeams';
import getTeams from "../utils/api/get/getTeams";
import createTeam from "../utils/api/post/createTeam";
import updateTeam from "../utils/api/patch/updateTeam";
import deleteTeam from "../utils/api/delete/deleteTeam";
import getTeam from "../utils/api/get/getTeam";

const ManageTeams: React.FC = () => {
    const [teams, setTeams] = useState<TeamRow[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState<TeamRow | undefined>(undefined);

    useEffect(() => {
        const fetchTeams = async () => {
            const data = await getTeams();
            if (data?.length) {
                setTeams(
                    data.map((team: any) => ({
                        id: team._id,
                        name: team.name,
                        members: team.teamUsersCount || 0,
                        membersIds: team.members || [],
                    }))
                );
            }
        };
        fetchTeams();
    }, []);

    const handleAdd = () => {
        setEditingTeam(undefined);
        setIsModalOpen(true);
    };

    const handleClose = () => setIsModalOpen(false);

    const handleSave = async ({
                                  id,
                                  name,
                                  members,
                              }: { id?: string; name: string; members: string[] }) => {
        if (id) {
            const result = await updateTeam({ _id: id, name, members });
            if (result.success) {
                setTeams(prev =>
                    prev.map(t => (t.id === id ? { ...t, name, members: members.length, membersIds: members } : t))
                );
                setIsModalOpen(false);
            }
        } else {
            const result = await createTeam({ name, members });
            if (result.success) {
                setTeams(prev => [
                    { id: `t${prev.length + 1}`, name, members: members.length, membersIds: members },
                    ...prev,
                ]);
                setIsModalOpen(false);
            }
        }
    };

    const handleEdit = async (id: string) => {
        const teamData = await getTeam(id);
        if (teamData) {
            setEditingTeam({
                id: teamData._id,
                name: teamData.name,
                members: teamData.members?.length || 0,
                membersIds: teamData.members || [],
            });
            setIsModalOpen(true);
        }
    };


    const handleDelete = async (id: string) => {
        setTeams(prev => prev.filter(t => t.id !== id));
        await deleteTeam(id);
    };

    return (
        <Layout>
            {/* <div className="welcome_block">
                <div className="welcome_words">
                    Hey <span className="user_name">Mani,</span> welcome back!
                </div>
                <div className="welcome_info">Welcome to The Valyant Group</div>
                <div className="available_funds">Funds Available: $1,268.22</div>
            </div> */}

            <div className="manage_teams_section">
                <div className="head_section">
                    <h1 className="page_title">Manage Teams</h1>
                    <button
                        className="standard_btn icon_plus orange_btn"
                        aria-label="Create work order"
                        onClick={handleAdd}
                    >
                        Add Team
                    </button>
                </div>
                <ManageTeamsTable teams={teams} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

            <AddTeamModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSave={handleSave}
                editingTeam={editingTeam}
            />
        </Layout>
    );
};

export default ManageTeams;
