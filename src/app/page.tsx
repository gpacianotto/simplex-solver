'use client'
import FormModal from '@/Components/FormModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function Home() {

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <main className='m-4' >
      <h1>Olá, bem vindo ao Freelance Helper</h1>

      <p>Este software foi criado para aumentar a sua produtividade no trabalho de freelancer, nós colheremos alguns dados seus e depois iremos calcular qual é o melhor plano de trabalho para você!</p>

      <p>para começar, clique no botão abaixo: </p>

      <Button onClick={() => {setOpenModal(true)}}>Começar</Button>

      <FormModal isModalOpen={openModal} setIsModalOpen={setOpenModal}></FormModal>
    </main>
  )
}
