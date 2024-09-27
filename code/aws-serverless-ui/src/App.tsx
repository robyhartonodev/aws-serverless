import './App.css';
import { Button } from './components/ui/button';

function App() {
  const onLoginClick = () => {
    window.location.href = "https://rh-serverless.auth.eu-central-1.amazoncognito.com/login?client_id=g44f8eom32u27d3g6ulcirudv&response_type=token&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=http%3A%2F%2Flocalhost%3A5173";
  };

  const onLogoutClick = () => {
    window.location.href = "https://rh-serverless.auth.eu-central-1.amazoncognito.com/logout?client_id=g44f8eom32u27d3g6ulcirudv&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A5173";
  };

  return (
    <>
      <div className='flex min-h-screen w-screen justify-between'>
        <div className='w-1/2 hidden md:flex bg-blue-500 p-4'></div>
        <div className='w-full md:w-1/2 bg-gray-200 p-4 md:p-32 flex justify-center items-center flex-col space-y-4'>
          <Button variant='outline' className='w-full bg-orange-400 text-white hover:text-black' onClick={onLoginClick}>Login</Button>
          <Button variant='outline' className='w-full bg-red-400 text-white hover:text-black' onClick={onLogoutClick}>Logout</Button>
          <div className='text-4xl font-bold'>AWS Serverless UI</div>
        </div>
      </div>
    </>
  );
}

export default App;
