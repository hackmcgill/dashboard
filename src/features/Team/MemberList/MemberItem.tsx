import React from 'react';

import { HackerStatus, IMemberName } from '../../../config';
import theme from '../../../shared/Styles/theme';


const MemberItem: React.FC<IMemberName> = (props) => {
    const applied = props.status === HackerStatus.HACKER_STATUS_NONE;

    return <div className="item">
        <div>
            <div className="name">{props.firstName} {props.lastName}</div>
            <div className="school">{props.school}</div>
        </div>
        <div className={'status' + (applied ? ' incomplete' : ' applied')}>
            {applied ? 'Incomplete Application' : 'Applied'}
        </div>

        <style jsx>{`
            .item {
                border-bottom: 1px solid ${theme.colors.purpleLight};
                padding: 16px 24px;
                
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .item:first-child {
                border-top: 1px solid ${theme.colors.purpleLight};
            }

            .item .school {
                font-size: 14px;
                color: ${theme.colors.black60};
            }

            .item .status {
                font-size: 14px;
                color: ${theme.colors.purple};
            }

            .item .status.incomplete {
                color: ${theme.colors.redMed};
            }
        `}</style>
    </div>
};

export default MemberItem;
