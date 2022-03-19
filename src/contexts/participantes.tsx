import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface Partida {
  id: number
  pontos: number
}

export interface Participante {
  id: number
  nome: string
  partidas: Partida[]
}

interface ParticipantesContextData {
  maisPontos1: number
  maisPontos2: number
  maisPontos3: number
  menosPontos: number
  participantes: Participante[]
  setParticipantes: (p: Participante[]) => void
}

const ParticipantesContext = createContext<ParticipantesContextData>({} as ParticipantesContextData);

export function ParticipantesProvider({ children }: { children: ReactNode }) {
  const [ participantes, setParticipantes ] = useState<Participante[]>([])
  const [ maisPontos1, setMaisPontos1 ] = useState(0)
  const [ maisPontos2, setMaisPontos2 ] = useState(0)
  const [ maisPontos3, setMaisPontos3 ] = useState(0)
  const [ menosPontos, setMenosPontos ] = useState(0)

  useEffect(() => {
    const storagedParticipantes = localStorage.getItem('conta66:participantes');

    if (!storagedParticipantes) {
      return;
    }

    const ps = JSON.parse(storagedParticipantes);
    const pf = ps.filter((p: Participante) => !!p.nome.length);

    setParticipantes(pf);
  }, []);

  useEffect(() => {
    localStorage.setItem('conta66:participantes', JSON.stringify(participantes))

    const totais = participantes
      .map(p => p.partidas.reduce((acc, pa) => acc + pa.pontos, 0))

    const mp1 = totais
    .reduce((acc, ps) => ps > acc ? ps : acc, 0);

    const mp2 = totais
      .reduce((acc, ps) => ps > acc && mp1 > ps ? ps : acc, 0);

    const mp3 = totais
      .reduce((acc, ps) => ps > acc && mp2 > ps ? ps : acc, 0);

    const mp0 = totais
      .reduce((acc, ps) => acc > ps ? ps : acc, Number.POSITIVE_INFINITY);

    setMaisPontos1(mp1)
    setMaisPontos2(mp2)
    setMaisPontos3(mp3)
    setMenosPontos(mp0)
  }, [participantes]);

  return (
    <ParticipantesContext.Provider value={{
      maisPontos1,
      maisPontos2,
      maisPontos3,
      menosPontos,
      setParticipantes,
      participantes
      }}>
      {children}
    </ParticipantesContext.Provider>
  );
};

export function useParticipantes() {
  const context = useContext(ParticipantesContext);

  return context;
}
