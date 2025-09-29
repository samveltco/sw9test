// ©2024 Austin App House. All rights reserved.
import React, { useEffect, useState } from 'react';
import Notification from '../../notification';
import Select from '../../Select';

const WorkOrderTasks = ({ tasks, handler }) => {
  const [onSiteRequirements, setOnSiteRequirements] = useState(tasks);
  const [isModalOpen, changeModalState] = useState(false);
  const [selectedCategory, changeCategory] = useState('preArrivalRequirements');
  const [newTask, addDescriptionForNewTask] = useState('');
  const categoryOptions = [
    { label: 'Pre Arrival Requirements', value: 'preArrivalRequirements' },
    { label: 'On Site Requirements', value: 'onSiteRequirements' },
    { label: 'Completion Requirements', value: 'completionRequirements' },
  ];

  const TaskElement = ({ name, index, collection }) => (
    <span style={{ marginBottom: 10, width: 'fit-content' }} className="chip">
      {name}
      <a
        href="#"
        className="icon_close"
        aria-label="delete task"
        onClick={(e) => {
          e.preventDefault();
          setOnSiteRequirements({
            ...onSiteRequirements,
            [collection]: onSiteRequirements[collection].filter((_, i) => i !== index),
          });
          Notification('success', { message: 'Task was deleted' });
        }}
        style={{ paddingLeft: '6px' }}
      >close</a>
    </span>
  );
  const addNewTask = () => {
    if (!newTask || !selectedCategory) {
      Notification('warning', { message: 'Please enter a requirement.' });
    } else {
      Notification('success', { message: 'Task was added' });
      setOnSiteRequirements({
        ...onSiteRequirements,
        [selectedCategory]: [
          ...onSiteRequirements[selectedCategory],
          { name: newTask, checked: false, index: onSiteRequirements[selectedCategory].length },
        ],
      });
      addDescriptionForNewTask('');
    }
  };


  useEffect(() => {
    setOnSiteRequirements(tasks);
  }, [tasks]);
  useEffect(() => {
    handler(onSiteRequirements);
  }, [onSiteRequirements]);
  return (
    <>
      <div className="add_btns">
        <button
          type="button"
          className="standard_btn icon_plus"
          aria-label="add required steps"
          onClick={() => changeModalState(true)}
        >Add Required Steps</button>
      </div>
      <br />
      <table className="custom_table">
        <thead>
          <tr>
            <th className="arrival">Pre Arrival Requirements</th>
            <th className="site">On Site Requirements</th>
            <th className="completion">Completion Requirements</th>
          </tr>
        </thead>
        {onSiteRequirements && (
          <tbody>
            <tr>
              <td>
                {onSiteRequirements.preArrivalRequirements.map((el, i) => (
                  <TaskElement key={`pre-${i}`} name={el.name} index={i} collection="preArrivalRequirements" />
                ))}
              </td>
              <td>
                {onSiteRequirements.onSiteRequirements.map((el, i) => (
                  <TaskElement key={`site-${i}`} name={el.name} index={i} collection="onSiteRequirements" />
                ))}
              </td>
              <td>
                {onSiteRequirements.completionRequirements.map((el, i) => (
                  <TaskElement key={`comp-${i}`} name={el.name} index={i} collection="completionRequirements" />
                ))}
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {isModalOpen && (
        <div className="popup_block showed">
          <div className="popup_container">
            <div className="popup_head">
              <div className="popup_title">Add Requirement</div>
              <button
                className="close_btn icon_close"
                aria-label="close"
                onClick={() => {
                  addDescriptionForNewTask('');
                  changeModalState(false);
                }}
              />
            </div>
            <div className="popup_body">
              <div className="field_row">
                <div className="field_name">
                  <label htmlFor="requirementType">Select Requirement Type</label>
                </div>
                <div className="field_block">
                  <Select
                    inputId="requirementType"
                    options={categoryOptions}
                    placeholder="Select..."
                    value={categoryOptions.find(o => o.value === selectedCategory)}
                    onChange={(opt) => changeCategory(opt && opt.value)}
                  />
                </div>
              </div>

              <div className="field_row">
                <div className="field_name">
                  <label htmlFor="requirementName">Requirement</label>
                </div>
                <div className="field_block">
                  <input
                    id="requirementName"
                    type="text"
                    className="form_control"
                    placeholder="Type here..."
                    value={newTask}
                    onChange={(e) => addDescriptionForNewTask(e.target.value)}
                  />
                </div>
              </div>

              <div className="popup_footer">
                <button
                  className="standard_btn dark_btn"
                  aria-label="cancel"
                  type="button"
                  onClick={() => {
                    addDescriptionForNewTask('');
                    changeModalState(false);
                  }}
                >Cancel</button>
                <button
                  className="standard_btn light_btn"
                  aria-label="save"
                  type="button"
                  onClick={addNewTask}
                >Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkOrderTasks;
