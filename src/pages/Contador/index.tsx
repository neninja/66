import React, { useState, useEffect } from 'react'

import { Button, Container, Table, Hero, Heading } from 'react-bulma-components';

import { FaUserPlus, FaTrashAlt, FaRedo } from 'react-icons/fa';
import { GiBullHorns } from 'react-icons/gi';

import { useParticipantes } from 'contexts/participantes'
import Linha from 'components/Linha'

export default function Componente() {
  const { participantes, setParticipantes } = useParticipantes();
  const [ partidas, setPartidas ] = useState(0);

  useEffect(() => {
    if(!participantes.length) {
      setPartidas(0)
    } else {
      setPartidas(participantes[0].partidas.length)
    }
  }, [participantes])

  function handleAddParticipante(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const nextId = !participantes.length ? 1 : participantes[participantes.length - 1].id + 1;
    const ps = Array.from(Array(partidas).keys()).map((p) => ({
      id: p+1,
      pontos: 0
    }));

    setParticipantes([
      ...participantes,
      {
        id: nextId,
        partidas: ps
      }
    ]);
  }

  function handleAddPartida(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const numeroPartida = partidas+1
    setPartidas(numeroPartida);

    const p = participantes.map((p) => ({
      id: p.id,
      partidas: [
        ...p.partidas,
        {
          id: numeroPartida,
          pontos: 0
        }
      ]
    }));

    setParticipantes(p);
  }

  function handleResetPartidas(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const p = participantes.map((p) => ({
      id: p.id,
      partidas: []
    }))
    setParticipantes(p);
    setPartidas(3);
  }

  function handleResetPartidasParticipantes(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setParticipantes([]);
    setPartidas(3);
  }

  return (
    <Hero size="fullheight">
      <Hero.Header>
        <Heading>
          Conta 66
        </Heading>
      </Hero.Header>
      <Hero.Body>
        <Container>
          <Table size="fullwidth">
            <thead>
              <tr>
                <th aria-label="participantes"></th>
                {Array.from(Array(partidas).keys()).map((p) => (
                  <th key={p} aria-label={`${p+1}`} style={{textAlign: 'center'}}></th>
                ))}
                <th aria-label="pontos"></th>
              </tr>
            </thead>
            <tbody>
              {participantes.map((p) => (
                <Linha
                  key={p.id}
                  participante={p}
                />
              ))}
            </tbody>
          </Table>
        </Container>
      </Hero.Body>
      <Hero.Footer>
        <Button.Group align="center" style={{marginBottom: '1rem'}}>
          <Button color="success" onClick={handleAddParticipante}>
            <FaUserPlus />
          </Button>
          <Button color="success" onClick={handleAddPartida}>
            <GiBullHorns />
          </Button>
          <Button color="warning" onClick={handleResetPartidas}>
            <FaRedo />
          </Button>
          <Button color="danger" onClick={handleResetPartidasParticipantes}>
            <FaTrashAlt />
          </Button>
        </Button.Group>
      </Hero.Footer>
    </Hero>
  );
}
