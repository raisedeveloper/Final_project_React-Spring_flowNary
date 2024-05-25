import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'layouts/authentication/components/Footer';

// ----------------------------------------------------------------------

export default function boardListIndex() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Footer />
    </DashboardLayout>
  );
}