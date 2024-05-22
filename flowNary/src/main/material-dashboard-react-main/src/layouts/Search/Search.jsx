// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MySearchList from "examples/Navbars/DashboardNavbar/search/MySearchList";
import React, { useState } from "react";

export default function search() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MySearchList />

    </DashboardLayout >
  );
}

