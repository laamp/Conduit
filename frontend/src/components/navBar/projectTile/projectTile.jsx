import React from 'react';

export const ProjectTile = ({ project }) => (
    <>
        <p>{project.title}</p>
        <p>{project.tasks.length}</p>
    </>
);
