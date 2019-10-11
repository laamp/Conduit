import React from 'react';

export const ProjectTile = ({ project, numOfTasks }) => (
    <div className='project-tile'>
        <p>{project.title}</p>
        <p>{numOfTasks}</p>
    </div>
);
