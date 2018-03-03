import React from "react";
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

const InputForm = props => {
    let {open, handleCancel, type, contact, handlePost} = props;
    let title = 'Modify Contact';
    let name, phone, email, qq, wechat;
    if(type === 'add') {
        contact = {name, phone, email, qq, wechat};
        title = 'Add New Contact';
    }
    return (
        <Dialog
          open={open}
          onClose={handleCancel}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              type="text"
              fullWidth={true}
              label="name"
              margin="dense"
              disabled={type==='modify'}
              defaultValue={contact.name}
              inputRef={input=>name=input}
            />
            <TextField
              fullWidth={true}
              margin="dense"
              type="number"
              label="phone"
              defaultValue={contact.phone}
              inputRef={input=>phone=input}
            />
            <TextField
              type="email"
              margin="dense"
              fullWidth={true}
              label="email"
              defaultValue={contact.email}
              inputRef={input=>email=input}
            />
            <TextField
              type="number"
              margin="dense"
              label="QQ"
              fullWidth={true}
              defaultValue={contact.qq}
              inputRef={input=>qq=input}
            />
            <TextField
              type="text"
              margin="dense"
              label="wechat"
              fullWidth={true}
              defaultValue={contact.wechat}
              inputRef={input=>wechat=input}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button 
                onClick={()=>{
                    let newContact = {
                        ...contact,
                        name: name.value,
                        phone: phone.value,
                        email: email.value,
                        qq: qq.value,
                        wechat: wechat.value
                    }
                    handlePost(type, newContact);
                }} 
                color="primary">
              {type}
            </Button>
          </DialogActions>
        </Dialog>
      )
}

InputForm.prototype = {
    open: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handlePost: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    contact: PropTypes.object
}

export default InputForm;