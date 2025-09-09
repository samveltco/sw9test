// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { MDBInput } from 'mdbreact';
import FieldLabel from '../../FieldLabel';

const TeamMembersField = field => {
  const handleChange = userId => {
    const clientIds = new Set([...field.input.value]);
    if (clientIds.has(userId)) {
      clientIds.delete(userId);
    } else {
      clientIds.add(userId);
    }
    field.input.onChange([...clientIds]);
  };

  return field.users ? (
    <div>
      <FieldLabel label={field.label} required={field.required} />
      {field.users.map(client => (
        <MDBInput
          key={client.userId}
          id={client.name}
          label={client.name}
          type="checkbox"
          value={client.userId || null}
          name={client.name}
          checked={
            field.input.value.length > 0
              ? field.input.value.includes(client.userId)
              : false
          }
          onChange={() => handleChange(client.userId)}
        />
      ))}
      {field.meta.touched && field.meta.error && (
        <span className="span-error">{field.meta.error}</span>
      )}
    </div>
  ) : (
    <></>
  );
};

export default TeamMembersField;
