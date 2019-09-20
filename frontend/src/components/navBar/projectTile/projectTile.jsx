import React from 'react';

export const ProjectTile = ({ project, numOfTasks }) => {
    return (
        <>
            <p>{project.title}</p>
            <p>{numOfTasks}</p>
        </>
    );
}
