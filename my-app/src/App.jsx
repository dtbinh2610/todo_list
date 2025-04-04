import { useLocation } from "react-router-dom";
import Layout from './component/layout/layout';
import Body from './component/body/body';



function App() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("User:", user);
  
  
  return (
    <Layout>
            <Body  /> 
    </Layout>
  );
}

export default App
