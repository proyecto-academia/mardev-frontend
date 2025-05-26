import React from 'react';
import PropTypes from 'prop-types';


export default  function UserInfo({ user }) {
    return (
        <div>
            <h1>User Information</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role.name}</p>
            <p><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
    );
};
