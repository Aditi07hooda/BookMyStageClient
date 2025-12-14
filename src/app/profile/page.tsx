import UserProfileMain from '@/components/profile/studentProfile/UserProfileMain';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const ProfilePage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <UserProfileMain/>
                </main>
            </Wrapper>
        </>
    );
};

export default ProfilePage;