import { SimplexReady, SimplexSolution } from "@/app/page";
import { Col, Row, Table } from "reactstrap";

interface Props {
    simplexProblem: SimplexReady
    simplexResult: number[][][];
    simplexSolution: SimplexSolution
}

export default function NerdData({simplexProblem, simplexResult, simplexSolution} : Props) {
    
    
    return <>

    <Row style={{marginTop: "20px", padding: "5px",border: "1px solid black", borderRadius: "10px"}}>
        <Col lg={5}>
            <p>Problema simplex: </p>
            <p>x1 = horas de codificação</p>
            <p>x2 = horas de reuniões</p>
            <p>x3 = horas de descanso</p>
            <p>z = indice de produtividade</p>
            
        </Col>
        <Col className="my-auto" lg={2}>
            {"--->"}
        </Col>
        <Col lg={5}>
            <p>MAX Z = {simplexProblem.codeImpact}*x1 + {simplexProblem.meetImpact}*x2 + {simplexProblem.restImpact}x3</p>
            <p>R1: x1 + x2 + x3 {"<="} {simplexProblem.weekHours}</p>
            <p>R2: x3 {"<="} {((simplexProblem.restPercentage / 100) * simplexProblem.weekHours).toFixed(2)}</p>
            <p>R3: x1 {"<="} {((simplexProblem.maxWorkGoalPercentage / 100) * simplexProblem.weekHours).toFixed(2)}</p>
            <p>R4: x2 {"<="} {((simplexProblem.maxMeetingPercentage / 100) * simplexProblem.weekHours).toFixed(2)}</p>
        </Col>
    </Row>

    <Row className="mt-5" style={{marginTop: "20px", padding: "5px",border: "1px solid black", borderRadius: "10px"}}>
        <Col lg={2}><p>Solução simplex:</p></Col>
        <Col lg={8}>
            {
                simplexResult.map((matrix:number[][]) => <>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    x1
                                </th>
                                <th>
                                    x2
                                </th>
                                <th>
                                    x3
                                </th>
                                <th>
                                    f1
                                </th>
                                <th>
                                    f2
                                </th>
                                <th>
                                    f3
                                </th>
                                <th>
                                    f4
                                </th>
                                <th>
                                    R
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                matrix.map((array:number[]) => <>
                                    <tr>
                                        {array.map((n:number) => <>
                                            <td>{n.toFixed(2)}</td>
                                        </> 
                                        )}
                                    </tr>
                                </>
                                )
                            }
                        </tbody>
                    </Table>   
                </>
                )
            }
            <p>Z = {simplexSolution.z}</p>
            <p>x1 = {simplexSolution.x1}</p>
            <p>x2 = {simplexSolution.x2}</p>
            <p>x3 = {simplexSolution.x3}</p>
            <p>f1 = {simplexSolution.f1}</p>
            <p>f2 = {simplexSolution.f2}</p>
            <p>f3 = {simplexSolution.f3}</p>
            <p>f4 = {simplexSolution.f4}</p>
        </Col>
    </Row>
        
    </>
}