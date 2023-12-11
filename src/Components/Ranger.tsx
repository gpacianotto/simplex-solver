import { Col, Input, Row } from "reactstrap";

interface Props {
    range: number;
    setRange: (param:number) => void;
    id: string;
    min?: number;
    max?: number;
}

export const MIN_RANGE : number = 0;
export const MAX_RANGE : number = 100;

export default function Ranger({range, setRange, id, min, max}:Props) {

    const rangePercentageStyle:React.CSSProperties = {fontSize: "20px", fontWeight: 800}

    return <>
        <Row>
            <Col lg={12}>
                <Input 
                    type="range"
                    id={id}
                    value={range}
                    onChange={(e) => {setRange(parseInt(e.target.value))}}
                    min={min ? min : MIN_RANGE}
                    max={max ? max : MAX_RANGE}
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