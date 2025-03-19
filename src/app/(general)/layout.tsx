import NavBar from "../Components/NavBar";
import ProviderUsuario from "../Provider/ProviderUsuario";
import ProviderHistorial from "../Provider/ProviderHistorial";
import ProviderExpediente from "../Provider/ProviderExpediente";



export default function  LayoutSecundario({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
    
    <ProviderUsuario>
      <ProviderHistorial>
        <ProviderExpediente>
      <NavBar></NavBar>
      {children}
      </ProviderExpediente>
      </ProviderHistorial>
    </ProviderUsuario>
 
   
      
    </>
  );
}