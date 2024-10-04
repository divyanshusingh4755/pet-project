import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, InputAdornment } from '@mui/material';
import PetDetail from './Detail';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebounce } from 'use-debounce';
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

    // Use debouncedSearchTerm in filtering
    const filteredPets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );


    useEffect(() => {
        const fetchPets = async () => {
            const response = await axios.get('https://api.thecatapi.com/v1/breeds');
            setPets(response.data);
            setLoading(false);
        };
        fetchPets();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    const handlePetClick = (pet) => {
        setSelectedPet(pet);
    };

    return (
        <div>
            <TextField
                className="search-bar"
                variant="outlined"
                placeholder="Search for a pet..."
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Grid container spacing={2}>
                {filteredPets.map((pet) => (
                    <Grid item xs={12} sm={6} md={4} key={pet.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="card" onClick={() => handlePetClick(pet)}>
                                <CardContent>
                                    <Typography variant="h5">{pet.name}</Typography>
                                    <Typography color="textSecondary">{pet.temperament}</Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
            {selectedPet && <PetDetail pet={selectedPet} onClose={() => setSelectedPet(null)} />}
        </div>
    );
};

export default PetList;
