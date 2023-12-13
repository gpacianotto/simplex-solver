'use client'
import FormModal from '@/Components/FormModal';
import SimplexSolver from '@/Components/SimplexSolver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, List, Modal, ModalBody, ModalHeader } from 'reactstrap';

export interface SimplexReady {
  codeImpact : number;
  meetImpact: number;
  restImpact: number;
  weekHours: number;
  restPercentage: number;
  maxWorkGoalPercentage: number;
  maxMeetingPercentage: number;
}

export default function Home() {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [simplexReady, setSimplexReady] = useState<SimplexReady>({} as SimplexReady);
  const [simplexResult, setSimplexResult] = useState<number[][][]>([]);

  console.log(simplexReady);

  const executeSimplex = () => {
    const solver = new SimplexSolver(simplexReady);

    setSimplexResult(solver.execute())
    // console.log(solver.initMatrix(10, 10));
  }

  return (
    <main className='m-4' >
      <h1>Olá, bem vindo ao Freelance Helper</h1>

      <p>Este software foi criado para aumentar a sua produtividade no trabalho de freelancer, nós colheremos alguns dados seus e depois iremos calcular qual é o melhor plano de trabalho para você!</p>

      <p>para começar, clique no botão abaixo: </p>

      <Button onClick={() => {setSimplexReady({} as SimplexReady); setOpenModal(true)}}>Começar</Button>

      <FormModal isModalOpen={openModal} setIsModalOpen={setOpenModal} setSimplexReady={setSimplexReady}></FormModal>

      {simplexReady.codeImpact && 
        <>
        <p className='mt-5'>Problema definido com sucesso! confira os dados:</p>
        
        <List>
          <li>Horas disponíveis: {simplexReady.weekHours}h semanais</li>
          <li>Impacto das horas de codificação: {simplexReady.codeImpact}%</li>
          <li>Impacto das horas de reuniões com o cliente: {simplexReady.meetImpact}%</li>
          <li>Impacto das horas de descanso: {simplexReady.restImpact}%</li>
          <li>Porcentagem máxima de horas em descanso: {simplexReady.restPercentage}% ({(simplexReady.restPercentage/100) * simplexReady.weekHours}h)</li>
          <li>Porcentagem máxima de horas em reuniões: {simplexReady.maxMeetingPercentage}% ({(simplexReady.maxMeetingPercentage/100) * simplexReady.weekHours}h)</li>
          <li>Porcentagem máxima de horas de trabalho: {simplexReady.maxWorkGoalPercentage}% ({(simplexReady.maxWorkGoalPercentage / 100) * simplexReady.weekHours}h)</li>
        </List>

        <Button onClick={executeSimplex}>
          Executar
        </Button>
        </>
      }
      {simplexResult.length > 0 && <>
      
        <p className='mt-5'>Problema Resolvido!</p>

      </>}
    </main>
  )
}
