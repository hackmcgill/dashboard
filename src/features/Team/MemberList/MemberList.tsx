import React from 'react';

import { IMemberName } from '../../../config';
import MemberItem from './MemberItem';


interface IMemberListProps {
    members: IMemberName[];
}

const MemberList: React.FC<IMemberListProps> = (props) => (
    <div className="list">
        {props.members.map((member, index) =>
            <MemberItem {...member} key={index} />
        )}

        <style jsx>{`
            .list {
                margin-top: 16px;
                margin-bottom: 16px;
            }
        `}</style>
    </div>
);

export default MemberList;
