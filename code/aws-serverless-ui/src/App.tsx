import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import useAuthStore from './store/auth';

function App() {
  const onLoginClick = () => {
    window.location.href = "https://rh-serverless.auth.eu-central-1.amazoncognito.com/login?client_id=g44f8eom32u27d3g6ulcirudv&response_type=token&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=http%3A%2F%2Fserverless.roby-hartono.de";
  };

  const onLogoutClick = () => {
    window.location.href = "https://rh-serverless.auth.eu-central-1.amazoncognito.com/logout?client_id=g44f8eom32u27d3g6ulcirudv&response_type=token&redirect_uri=https%3A%2F%2Fserverless.roby-hartono.de";
  };

  const login = useAuthStore((state) => state.login);
  const idToken = useAuthStore((state) => state.token);

  const [apiResponse, setApiResponse] = useState<any>(null);
  const callApiGatewayLambda = async () => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + idToken || ''
    });

    try {
      const response = await fetch("https://0ksc0b2zw6.execute-api.eu-central-1.amazonaws.com/prod/test", {
        method: 'GET',
        headers: headers,
      });

      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
        // Get the error message from the response
        const errorData = await response.json(); // or response.text() if the response is not JSON
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      // If response is okay, parse the JSON data
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setApiResponse("Failed GET Response");
    }
  };

  useEffect(() => {
    // Get the hash part of the URL
    const hash = window.location.hash;

    // Create a URLSearchParams object by removing the leading `#` and splitting the parameters
    const params = new URLSearchParams(hash.substring(1));

    // Extract the id_token from the parameters
    const token = params.get('id_token');

    // Optional: Log it to console
    if (token) {
      login(token);
    }
  }, []);

  return (
    <>
      <div className='flex min-h-screen w-screen justify-between'>
        <div className='w-1/2 hidden md:flex bg-blue-500 p-4'></div>
        <div className='w-full md:w-1/2 bg-gray-200 p-4 md:p-32 flex justify-center items-center flex-col space-y-4'>
          <Button variant='outline' className='w-full bg-orange-400 text-white hover:text-black' onClick={onLoginClick}>Login</Button>
          <Button variant='outline' className='w-full bg-red-400 text-white hover:text-black' onClick={onLogoutClick}>Logout</Button>
          <div className='text-4xl font-bold'>AWS Serverless UI Cognito login & Lambda REST API authorization</div>

          <Button variant='outline' className='w-full bg-green-500 text-white hover:text-black' onClick={callApiGatewayLambda}>Call REST API from AWS API Gateway</Button>
          <div className='text-xl'>
            {apiResponse && `Response: ${JSON.stringify(apiResponse)}`}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
