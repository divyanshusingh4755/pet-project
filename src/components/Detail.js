import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const PetDetail = ({ pet, onClose }) => {
    const [open, setOpen] = useState(false);

    const handleImageClick = () => {
        setOpen(true);
    };

    return (
       <Dialog open={Boolean(pet)} onClose={onClose}>
            <DialogTitle>{pet.name}</DialogTitle>
            <DialogContent>
                <img src={pet?.image?.url} alt={pet.name} onClick={handleImageClick} style={{ cursor: 'pointer', width: '100%' }} />
                <Typography variant="body1">Temperament: {pet.temperament}</Typography>
                <Typography variant="body1">Description: {pet.description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <img src={pet?.image?.url} alt={pet.name} style={{ width: '100%' }} />
            </Dialog>
        </Dialog>
    );
};

export default PetDetail;
