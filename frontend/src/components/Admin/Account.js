import React from 'react'
import Sidebar from "../UI/Settings/Sidebar";
import Form from "../UI/Settings/Form";

const Account = () => {
    return (
        <div className="flex flex-col md:grid md:grid-cols-12 px-4 md:px-0">
            <Sidebar></Sidebar>
            <Form></Form>
        </div>
    )
}

export default Account
