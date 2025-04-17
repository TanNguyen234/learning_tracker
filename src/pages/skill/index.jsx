    import { Col, Row } from "antd";
    import CardComponent from "../../components/Card";

    function Skill() {
    
        return (<>
            <Row gutter={[16, 16]} style={{ display: 'flex' , flexWrap: 'wrap'}}>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <CardComponent state={"Done"} title={"React"}/>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <CardComponent state={"Learning"} title={"FastAPI"}/>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <CardComponent state={"Planned"} title={"ReduxToolkit"}/>
                </Col>
            </Row>
        </>)
    }

    export default Skill;