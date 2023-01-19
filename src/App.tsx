import './App.css';
import BirthdayInput from './components/BirthdayInput';
import PasswordInput from './components/PasswordInput';

function App() {
  return (
    <div className="h-screen overflow-scroll bg-[#181818] flex flex-col p-[50px]">
      <PasswordInput />
      <BirthdayInput />
    </div>
  );
}

export default App;
