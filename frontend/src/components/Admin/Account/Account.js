import React from 'react'
import Sidebar from "./Sidebar";
import ProfileForm from "./ProfileForm";
import SecurityForm from "./SecurityForm";

const Account = () => {
    return (
        <div className="flex flex-col md:grid md:grid-cols-12 px-4 md:px-0">
            <Sidebar></Sidebar>
            <ProfileForm></ProfileForm>
        </div>
    )
}

export default Account
