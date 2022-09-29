import React, { useState, useEffect } from 'react';
import { useAuth } from './context/authContext';

export default function Family({ data, isCheckedFather }) {
  const { user, setUser } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(user.role.permissions.includes(data.name) || isCheckedFather);
  });

  const expand = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = () => {
    setUser((s) => {
      let p = s.role.permissions;
      var i = s.role.permissions.indexOf(data.name);
      i === -1 ? p.push(data.name) : p.splice(i, 1);
      return {
        ...s,
        role: {
          ...s.role,

          // 👇️ override value for nested country property
          permissions: p,
        },
      };
    });
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      <span onClick={expand}>{data.name}</span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={isCheckedFather}
      />
      {JSON.stringify(isVisible)}/{JSON.stringify(isCheckedFather)}
      {isVisible ? (
        data?.childs?.map((child) => {
          return (
            <div style={{ paddingLeft: 10 }}>
              <Family data={child} isCheckedFather={isChecked} />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
