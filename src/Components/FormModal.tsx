import { useState } from "react";
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Ranger from "./Ranger";

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (state:boolean) => void;
}

export default function FormModal({isModalOpen, setIsModalOpen}:Props) {

    const [rangeValue, setRangeValue] = useState<number>(50);

    const toggle = () => {setIsModalOpen(!isModalOpen)}

    return <>

        <Modal isOpen={isModalOpen} toggle={toggle}>
            <ModalHeader>
                Perguntas iniciais
            </ModalHeader>

            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="range">Insira um valor</Label>
                        <Ranger id="range" range={rangeValue} setRange={setRangeValue}/>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    
    </>

}