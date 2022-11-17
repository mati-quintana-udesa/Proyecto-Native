import { AuthenticationProvider } from './src/firebase/authentication/authenticationProvider';
import Router from './src/router';
import { StyleSheet } from 'react-native';

export default function App() {
  return (

    <AuthenticationProvider>
      <Router/>
    </AuthenticationProvider>
   
  );
}

