import React, { useContext, useMemo } from 'react';
import { ProfileCard } from '../../../commons/profile_card/profile_card';
import { ProjectsFront } from './projects_front/projects_front';
import { ProjectsBack } from './projects_back/projects_back';
import { AddButton } from './add_button_rounded/add_button_rounded';
import { ProjectDialog } from './project_dialog/project_dialog';

import { mapProjectsFromJsonResume, mapPublicationsFromJsonResume } from './data/mapping';
import { DeveloperProfileContext } from '../../../../utils/context/contexts';
import { validateProjectsComplete } from './data/validator';
import { SIDES } from '../../../commons/profile_card/profile_card_side/side';
import { useMode } from '../../../hooks/use_mode';

const ProjectsCardComponent = ({ variant, side, type }) => {
    console.log(type);
    const [mode] = useMode();
    const { data, isEditing } = useContext(DeveloperProfileContext);

    let mappedObject;
    if (type === 'publications') {
        mappedObject = mapPublicationsFromJsonResume(data);
    } else {
        mappedObject = mapProjectsFromJsonResume(data);
    }

    const mappedData = useMemo(() => mappedObject, [data]);

    const isComplete = useMemo(() => validateProjectsComplete(mappedData), [mappedData]);

    const currentSide = useMemo(() => {
        if (!isComplete && !isEditing) {
            return SIDES.FRONT;
        }
        return side;
    }, [side, isComplete, isEditing]);

    if (!isComplete && mode !== 'edit') {
        return null;
    }
    return (
        <ProfileCard
            kind="blogs"
            data={mappedData}
            isComplete={isComplete}
            isEditingProfile={isEditing}
            sides={{
                front: (props) => <ProjectsFront {...props} />,
                back: (props) => <ProjectsBack {...props} />
            }}
            variant={variant}
            side={currentSide}
            customEditAction={(props) => <AddButton title="Ajouter un projet" {...props} />}
            editDialog={{
                component: ProjectDialog,
                data: {}
            }}
        />
    );
};

export const ProjectsCard = ProjectsCardComponent;
