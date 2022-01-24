import React from 'react';
import Attachment from '../../Images/Attachment';

const MessageForm = ({ submitHandler, text, setText, setImg }) => {
    return(
        <div class="row">
          <div class="col-12">
            <form class="chat-box-tray" onSubmit={submitHandler}>
                <label htmlFor="img">
                    <i class="ri-file-upload-line"></i>
                </label>
                <input  onChange={(e) => setImg(e.target.files[0])}
                    type="file" id="img" accept="image/*"  style={{ display: "none" }} />
                <input type="text" placeholder="Type your message here..." value={text} onChange={(e) => setText(e.target.value)} />
                <button class="btn btn-sm btn-primary">Send</button>
            </form>
          </div>
        </div> 
    );
};

export default MessageForm;
