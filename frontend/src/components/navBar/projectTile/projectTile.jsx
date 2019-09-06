import React from 'react';

export const ProjectTile = props => (
    <div>
        <p>this is a project tile</p>
        {Object.values(props).map((p, i) => (
            <p key={`project-tile-${i}`}>{p.title}{p.tasks.length}</p>
        ))}
    </div>
);
