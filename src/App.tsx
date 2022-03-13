import { ParticipantesProvider } from 'contexts/participantes'
import Contador from 'pages/Contador'
import './App.css';

export default function App() {
  return (
    <ParticipantesProvider>
      <Contador />
    </ParticipantesProvider>
  );
}
