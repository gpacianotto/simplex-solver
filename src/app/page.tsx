'use client'
import FormModal from '@/Components/FormModal';
import NerdData from '@/Components/NerdData';
import SimplexSolver from '@/Components/SimplexSolver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Collapse, List, Modal, ModalBody, ModalHeader } from 'reactstrap';

export interface SimplexReady {
  codeImpact : number;
  meetImpact: number;
  restImpact: number;
  weekHours: number;
  restPercentage: number;
  maxWorkGoalPercentage: number;
  maxMeetingPercentage: number;
}

export interface SimplexSolution {
  z: number;
  x1: number;
  x2: number;
  x3: number;
  f1: number;
  f2: number;
  f3: number;
  f4: number;
}

export default function Home() {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [simplexReady, setSimplexReady] = useState<SimplexReady>({} as SimplexReady);
  const [simplexResult, setSimplexResult] = useState<number[][][]>([]);
  const [simplexSolution, setSimplexSolution] = useState<SimplexSolution>({} as SimplexSolution);
  const [nerdData, setNerdData] = useState<boolean>(false);

  console.log(simplexReady);

  const executeSimplex = () => {
    const solver : SimplexSolver = new SimplexSolver(simplexReady);

    const result : number[][][] = solver.execute();


    setSimplexSolution(solver.simplexToResults(result));
    setSimplexResult(result);
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
      {simplexResult.length > 0 && (simplexReady.codeImpact) && <>
      
        <p className='mt-5'>Problema Resolvido!</p>

        {(simplexSolution !== {} as SimplexSolution) && (simplexReady.codeImpact) && <>

          <p>Você consegue alcançar o indice de produtividade de {simplexSolution.z} realizando:</p>
          <p>Horas de codificação: {(simplexSolution.x1).toFixed(2)}h</p>
          <p>Horas de reuniões com os clientes: {(simplexSolution.x2).toFixed(2)}h</p>
          <p>Horas de descanso: {(simplexSolution.x3).toFixed(2)}h</p>
          <p>Aproveitamento: {((((simplexSolution.x1 * simplexReady.codeImpact) + (simplexSolution.x2 * simplexReady.meetImpact)) / simplexSolution.z) * 100).toFixed(2)}%
            </p>
          {/* <p>Folga 1: {simplexSolution.f1}h</p>
          <p>Folga 2: {simplexSolution.f2}h</p>
          <p>Folga 3: {simplexSolution.f3}h</p>
          <p>Folga 4: {simplexSolution.f4}h</p> */}

          <Button onClick={() => setNerdData(!nerdData)}>
            Dados para nerds
          </Button>

          <Collapse isOpen={nerdData}>
            <NerdData simplexProblem={simplexReady} simplexResult={simplexResult} simplexSolution={simplexSolution}/>
          </Collapse>

        </>}

      </>}
    </main>
  )
}
