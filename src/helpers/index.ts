import { Participante } from 'contexts/participantes'

export function totalDoParticipante(p: Participante) {
  const pontos = p.partidas.reduce((acc, p) => {
    return acc + p.pontos
  }, 0);

  return pontos;
}

