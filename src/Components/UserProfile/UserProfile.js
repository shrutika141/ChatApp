import React from 'react';

const UserProfile = () => {
    return (
        <div class="settings-tray">
            <img class="profile-image" src="https://randomuser.me/api/portraits/men/39.jpg" alt="" />
            <span class="settings-tray--right">
                <i class="ri-refresh-line"></i>
                <i class="ri-message-2-fill"></i>
                <i class="ri-menu-line"></i>
            </span>
        </div>
    );
};

export default UserProfile;
