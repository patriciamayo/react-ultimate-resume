import React from 'react';
import { createUseStyles } from 'react-jss';

import { ProgressBar } from '@welovedevs/ui/progress_bar/progress_bar';
import { Typography } from '@welovedevs/ui/typography/typography';

import { styles } from './other_skill_progress_styles';

const useStyles = createUseStyles(styles);

const OtherSkillProgress = ({ color, value, name, keywords }) => {
    const classes = useStyles({ color });
    return (
        <div style={{ paddingBottom: '24px' }}>
            <div className={classes.container}>
                <Typography variant="h4" component="h4" color={color} customClasses={{ container: classes.skillLabel }}>
                    {name}
                </Typography>
                <ProgressBar
                    customClasses={{ container: classes.progressBarCustomContainer, bar: classes.progressBarCustomBar }}
                    value={value}
                />
            </div>
            <Typography variant="h5" component="h5" color={color}>
                {keywords}
            </Typography>
        </div>
    );
};

export default OtherSkillProgress;
