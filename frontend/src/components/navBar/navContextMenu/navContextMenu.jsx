import React from 'react';

export const NavContextMenu = ({ projectId, deleteProject }) => (
    <div className='nav-context-menu' onClick={() => console.log('hello')}>
        Delete project {projectId}
    </div>
);
