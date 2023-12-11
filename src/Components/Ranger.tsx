import { Col, Input, Row } from "reactstrap";

interface Props {
    range: number;
    setRange: (param:number) => void;
    id: string
}

export default function Ranger({range, setRange, id}:Props) {

    const rangePercentageStyle:React.CSSProperties = {fontSize: "20px", fontWeight: 800}

    return <>
        <Row>
            <Col lg={12}>
                <Input 
                    type="range"
                    id={id}
                    value={range}
                    onChange={(e) => {setRange(parseInt(e.target.value))}}

                />
            </Col>
        </Row>

        <Row>
            <Col className="text-center" lg={12}>
                <span style={rangePercentageStyle}>{range}%</span>
            </Col>
        </Row>
        

    </>
}