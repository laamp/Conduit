import React from 'react';

export const ProjectTile = ({ project, numOfTasks }) => (
    <>
        <p>{project.title}</p>
        <p>{numOfTasks}</p>
    </>
);
