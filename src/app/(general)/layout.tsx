import NavBar from "../Components/NavBar";
import ProviderUsuario from "../Provider/ProviderUsuario";
import ProviderHistorial from "../Provider/ProviderHistorial";

export default function  LayoutSecundario({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
    
    <ProviderUsuario>
      <ProviderHistorial>
      <NavBar></NavBar>
      {children}
      </ProviderHistorial>
    </ProviderUsuario>
 
   
      
    </>
  );
}