import React, { useState, useEffect } from 'react'
import { Form, Tag } from 'react-bulma-components';

import { Participante } from 'contexts/participantes'
import { totalDoParticipante } from 'helpers'

import { useParticipantes } from 'contexts/participantes'

interface Props {
  participante: Participante
}

// <tr style={{backgroundColor: 'whitesmoke'}}>

export default function C({ participante }: Props) {
  const {
    maisPontos1,
    maisPontos2,
    maisPontos3,
    menosPontos,
    participantes,
    setParticipantes
  } = useParticipantes();
  const [ pontos, setPontos ] = useState(0);
  const [ color, setColor ] = useState('text')

  useEffect(() => {
    setPontos(totalDoParticipante(participante))
  }, [participante])

  useEffect(() => {
    if(menosPontos === pontos) {
      setColor('success')
    } else if(maisPontos3 === pontos) {
      setColor('info')
    } else if(maisPontos2 === pontos) {
      setColor('warning')
    } else if(maisPontos1 === pontos) {
      setColor('danger')
    } else {
      setColor('text')
    }
  }, [maisPontos1, maisPontos2, maisPontos3, menosPontos, pontos])

  function handleCorrigePontos(
    e: React.ChangeEvent<HTMLInputElement>, partidaId: number
  ) {
    e.preventDefault();

    const p = participantes.find((p) => p.id === participante.id);

    if(!p) {
      return;
    }

    const partidasAnteriores = p.partidas.filter((pa) => pa.id < partidaId);
    const partidasPosteriores = p.partidas.filter((pa) => pa.id > partidaId);
    const partidasAtualizadas = [
      ...partidasAnteriores,
      {
        id: partidaId,
        pontos: parseInt(e.target.value)
      },
      ...partidasPosteriores
    ];

    const participantesAnteriores = participantes.filter((p) => p.id < participante.id);
    const participantesPosteriores = participantes.filter((p) => p.id > participante.id);
    setParticipantes([
      ...participantesAnteriores,
      {
        id: p.id,
        nome: p.nome,
        partidas: partidasAtualizadas
      },
      ...participantesPosteriores
    ]);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault();
    e.target.select();
  }

  return (
    <tr>
      <th>
        {participante.nome}{" "}<Tag color={color}>{pontos}</Tag>
      </th>
      {participante.partidas.map((p) => (
        <td key={p.id}>
          <Form.Input
            type="number"
            size="small"
            value={p.pontos}
            onFocus={handleFocus}
            onChange={(e) => handleCorrigePontos(e, p.id)}
          />
        </td>
      ))}
    </tr>
  );
}
