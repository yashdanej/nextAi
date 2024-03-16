import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import InputFileUpload from './InputFileUpload';
import { useState } from 'react';

export default function BasicModalDialog({Remover, open, setOpen}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const uploadImage = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        try {
            const options = {
                method: "POST",
                body: formData
            }
            const response = await fetch('https://nextai-e8qc.onrender.com/upload', options);
            const data = await response.json();
            console.log('data', data);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new project</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Upload image</FormLabel>
                <InputFileUpload uploadImage={uploadImage} setSelectedImage={setSelectedImage} />
              </FormControl>
                {
                    selectedImage && <img style={{width: '500px', maxHeight: '500px', objectFit: 'cover'}} src={URL.createObjectURL(selectedImage)} alt="" />
                }
              <Button type="submit" onClick={Remover}>Remove</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}