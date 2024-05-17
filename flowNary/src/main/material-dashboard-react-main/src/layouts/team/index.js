// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


export default function team() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <img src="team.png" width={700} height={700} style={{marginLeft:130}}></img>


    </DashboardLayout>
  );
}