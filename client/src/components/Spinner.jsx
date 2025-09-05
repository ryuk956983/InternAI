import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex' }} className="absolute flex flex-col gap-2 items-center justify-center h-full w-full z-100 bg-[#00000090]">
      <CircularProgress />
      <h1 className='text-xl text-white font-semibold'>Searching...</h1>
    </Box>
  );
}