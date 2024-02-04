import React from 'react';
import { Toaster } from 'react-hot-toast'

const Message = () => {
     // toast.success(response.data.message, { position: "top-center" })
    // toast.success(loginDone.message, { position: "top-center" })
   // toast.error(error, { position: "top-center" })
    return (<>
        <div style={{ fontSize: '50px', width: '100%' }}>
            <Toaster />
        </div>
    </>);
}

export default Message;