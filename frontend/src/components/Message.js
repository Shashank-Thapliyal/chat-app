import React from 'react';
import "../componentCss/Message.css";

const Message = ({ user, message, classNames }) => {
    if (user)
    {
        return (
            <div className={`message ${classNames}`}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    else
    {
        return (
            <div className={`message ${classNames}`}>
                {`You : ${message}`}
            </div>
        )
    }
}

export default Message;
