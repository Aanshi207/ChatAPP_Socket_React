import React from 'react';
import { Skeleton, Box, Paper, useTheme, CircularProgress } from '@mui/material';

const SigninSkeleton = () => {

  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      
      {/* <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "background.default" }}>
        
        <Paper elevation={6} sx={{ width: { xs: "90%", lg: "100%" }, maxWidth: 700, p: 4, borderRadius: 3 }}>
          
          <Box display="flex" justifyContent="center" mb={3}>
            <Skeleton variant="text" width="40%" height={40} />
          </Box>

          <Box mt={3}>
            <Skeleton variant="text" width="15%" height={20} sx={{ mt: 4 }} /> 
            <Skeleton variant="rectangular" fullWidth height={56} sx={{ borderRadius: 1 }} />
          </Box>

          <Box mt={2}>
           
            <Skeleton variant="text" width="20%" height={20} />
            <Skeleton variant="rectangular" fullWidth height={56} sx={{ borderRadius: 1 }} />
          </Box>

      
          <Skeleton 
            variant="rectangular" 
            fullWidth 
            height={50} 
            sx={{ mt: 6, borderRadius: 1 }} 
          />

          <Box display="flex" justifyContent="center" alignItems="center" mt={4} sx={{ gap: 1 }}>
            <Skeleton variant="text" width="50%" height={20} />
          </Box>

        </Paper>
      </Box> */}

      <CircularProgress size="3rem" />
    </Box>
  );
};

export default SigninSkeleton;
