import { AuthenticationProvider } from './src/firebase/authentication/authenticationProvider';
import Router from './src/router';

export default function App() {
  return (

    <AuthenticationProvider>
      <Router/>
    </AuthenticationProvider>
   
  );
}

