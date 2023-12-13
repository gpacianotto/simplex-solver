import React, { useState } from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Tooltip } from "reactstrap";
import Ranger, { MAX_RANGE } from "./Ranger";
import { SimplexReady } from "@/app/page";

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (state:boolean) => void;
    setSimplexReady: (s:SimplexReady) => void;
}

export interface ReadyData {
    codeImpact: number
}

const MIN_WEEK_HOURS=4;
const MAX_WEEK_HOURS = 168;
const INITIAL_REST_PERCENTAGE = 20;
const INITIAL_MWGP = INITIAL_REST_PERCENTAGE + 1;

export default function FormModal({isModalOpen, setIsModalOpen, setSimplexReady}:Props) {

    const [codeImpact, setCodeImpact] = useState<number>(50);
    const [meetImpact, setMeetImpact] = useState<number>(40);
    const [restImpact, setRestImpact] = useState<number>(10);
    const [weekHours, setWeekHours] = useState<number>(MIN_WEEK_HOURS);
    const [restPercentage, setRestPercentage] = useState<number>(INITIAL_REST_PERCENTAGE);
    const [maxWorkGoalPercentage, setMaxWorkGoalPercentage] = useState<number>(INITIAL_MWGP);
    const [maxMeetingPercentage, setMaxMeetingPercentage] = useState<number>(1);

    const weekHoursInvalid : boolean = (weekHours < MIN_WEEK_HOURS || weekHours > MAX_WEEK_HOURS);
    // const percentageInvalid : boolean = (codeImpact + restImpact + meetImpact) > 100;
    const percentageInvalid : boolean = false;
    const bold : React.CSSProperties = {fontWeight: 800}

    const toggle = () => {
        setIsModalOpen(!isModalOpen)
    }

    return <>

        <Modal size="lg" isOpen={isModalOpen} toggle={toggle}>
            <ModalHeader>
                Perguntas iniciais
            </ModalHeader>

            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="codeImpact">
                            <span style={bold}>1. </span>
                            De 0 a 100, o quanto você acha que as horas de codificação tem impacto na sua produtividade?
                        </Label>
                        <Ranger 
                            id="codeImpact" 
                            range={codeImpact} 
                            setRange={setCodeImpact}
                            // min={50}
                            // max={80}
                        />
                        {percentageInvalid && 
                            <span style={{color: "#dc3545"}}>
                                Essas porcentagens devem somar 100
                            </span>
                        }
                        <hr/>

                        <Label for="meetImpact">
                            <span style={bold}>2. </span>
                            De 0 a 100, o quanto você acha que as horas de reunião com clientes tem impacto na sua produtividade?
                        </Label>
                        <Ranger 
                            range={meetImpact} 
                            setRange={setMeetImpact} 
                            id="meetImpact"
                            // max={100 - codeImpact}
                        />
                        {percentageInvalid && 
                            <span style={{color: "#dc3545"}}>
                                Essas porcentagens devem somar 100
                            </span>
                        }
                        <hr/>

                        <Label for="restImpact">
                            <span style={bold}>3. </span>
                            o quanto você acha que as horas de descanso tem impacto na sua produtividade
                        </Label>
                        <Ranger 
                            range={restImpact} 
                            setRange={setRestImpact} 
                            id="restImpact"
                            min={0}
                            // max={100 - (codeImpact + meetImpact)}
                        />
                        {percentageInvalid && 
                            <span style={{color: "#dc3545"}}>
                                Essas porcentagens devem somar 100
                            </span>
                        }
                        <hr/>

                        <Label for="weekHoursInput">
                            <span style={bold}>4. </span> 
                            Quantas horas semanais você tem disponível?
                        </Label>
                        <Input 
                            id="weekHoursInput"
                            type="number"
                            value={weekHours}
                            onChange={(e) => {setWeekHours(parseInt(e.target.value))}}
                            min={MIN_WEEK_HOURS}
                            max={MAX_WEEK_HOURS}
                            invalid={weekHoursInvalid}
                        />
                        {weekHoursInvalid && 
                            <span style={{color: "#dc3545"}}>
                                Suas horas semanais devem variar entre {MIN_WEEK_HOURS} e {MAX_WEEK_HOURS}
                            </span>
                        }
                        <hr/>

                        <Label for="restPercentage">
                            <span style={bold}>5. </span>
                            Qual a porcentagem máxima das horas livres que você tem, que você está disposto a gastar descansando?
                        </Label>
                        <Ranger 
                            range={restPercentage} 
                            setRange={(n:number) => {
                                setRestPercentage(n);
                                // setMaxWorkGoalPercentage(n + 1);
                            }} 
                            id="restPercentage"
                            max={MAX_RANGE - 2}
                        />
                        <hr/>

                        <Label for="maxMeetingPercentage">
                            <span style={bold}>6. </span>
                            Qual a porcentagem máxima das horas livres você está disposto a usar para reuniões com clientes?
                        </Label>
                        <Ranger 
                            range={maxMeetingPercentage} 
                            setRange={setMaxMeetingPercentage} 
                            id="maxMeetingPercentage"
                        />
                        <hr/>

                        <Label for="maxWorkGoalPercentage">
                            <span style={bold}>7. </span>
                            Qual o máximo de porcentagem das horas livres que você tem, você está disposto a comprometer para programar??
                        </Label>
                        <Ranger 
                            range={maxWorkGoalPercentage} 
                            setRange={setMaxWorkGoalPercentage} 
                            id="maxWorkGoalPercentage"
                        />
                        <hr/>
                    </FormGroup>
                </Form>
                <Row>
                    <Col xl="8"/>
                    <Col className="mt-3 mb-3" xl="2">
                        <Button onClick={() => {
                            setSimplexReady({
                                codeImpact: codeImpact,
                                maxWorkGoalPercentage: maxWorkGoalPercentage,
                                meetImpact: meetImpact,
                                restImpact: restImpact,
                                restPercentage: restPercentage,
                                weekHours: weekHours,
                                maxMeetingPercentage: maxMeetingPercentage
                            });
                            toggle();
                        }} block disabled={weekHoursInvalid || percentageInvalid} color="success">
                            Pronto!
                        </Button>
                    </Col>
                    <Col className="mt-3 mb-3" xl="2">
                        <Button onClick={toggle} block color="danger">
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    
    </>

}