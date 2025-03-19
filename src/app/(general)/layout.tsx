import NavBar from "../Components/NavBar";
import ProviderHistorial from "../Provider/ProviderHistorial";



export default function  LayoutSecundario({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
    
   
      <ProviderHistorial>
      <NavBar></NavBar>
      {children}
      </ProviderHistorial>
 
 
   
      
    </>
  );
}