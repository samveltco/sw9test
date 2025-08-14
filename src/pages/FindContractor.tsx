import React, { useState } from 'react';
import Layout from '../components/Layout';
import { RangeSearchActions, ChecklistFilters, ContractorCard, Contractor } from '../components/findContractor';

const FindContractor: React.FC = () => {
  const [distance, setDistance] = useState(60);
  const [filters, setFilters] = useState(
    Array.from({ length: 12 }).map((_, i) => ({ id: String(i + 1), label: 'Passed Gold Background Test', checked: i < 4 }))
  );

  const contractors: Contractor[] = [
    {
      id: 'c1',
      name: 'Contractor Test',
      code: '130710',
      address: '650 S R L Thornton Fwy Dallas, Texas, 75203',
      phone: '(531) 151-5151',
      email: 'yenokyanharutyun4@gmail.com',
      avatar: '/images/avatar.jpg',
      badgeIcon: '/images/p1.png',
      badges: [
        { label: 'Project Management Certified', date: '5/13/2023' },
        { label: 'Cabling Certified', date: '5/13/2023' }
      ]
    }
  ];

  const toggleFilter = (id: string, checked: boolean) => {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, checked } : f)));
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

      <RangeSearchActions distance={distance} onDistanceChange={setDistance} />

      <ChecklistFilters items={filters} onToggle={toggleFilter} />

      <div className="cards_list">
        <span className="shadow_block top_shadow"></span>
        {contractors.map((c) => (
          <ContractorCard key={c.id} contractor={c} />
        ))}
        <span className="shadow_block bottom_shadow"></span>
      </div>
    </Layout>
  );
};

export default FindContractor; 