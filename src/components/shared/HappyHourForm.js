import { Form, Container, Button, Row, Col } from 'react-bootstrap'

const HappyHourForm = (props) => {
    const {happyHour, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <br></br>
            <h1>{heading}</h1>
            <br></br>
            <Form onSubmit={handleSubmit} className="m-2 p-5 w-100 shadow bg-body rounded">
            <Row>
                <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="Name your happy hour"
                    value={happyHour.name}
                    name='name'
                    type='text'
                    onChange={handleChange}
                    required
                />
                </Col>
                <Col>
                <Form.Label>Deals</Form.Label>
                <Form.Control
                    placeholder='Happy hour deals'
                    value={happyHour.deals}
                    name='deals'
                    type='text'
                    onChange={handleChange}
                    required
                    />
                </Col>
            </Row>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    placeholder="Street address"
                    value={happyHour.address}
                    type='text'
                    name='address'
                    onChange={handleChange}
                    required
                />
                <br></br>
            <Row>
                <Col>
                    <Form.Label>City</Form.Label>
                        <Form.Control
                        placeholder="City"
                        value={happyHour.city}
                        type="text"
                        name='city'
                        onChange={handleChange}
                        required
                />
                </Col>
                <Col>
                    <Form.Label>State</Form.Label>
                        <Form.Control
                        placeholder="State"
                        value={happyHour.state}
                        type="text"
                        name='state'
                        onChange={handleChange}
                        required
                />
                </Col>
                <br></br>
                <Col>
                    <Form.Label>Days offered</Form.Label>
                        <Form.Control 
                            placeholder="Days available"
                            value={happyHour.days}
                            name='days'
                            type="text"
                            onChange={handleChange}
                            required
                />
                </Col>
            </Row>
            <Row>
                <Col style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                    value={happyHour.startTime}
                    name='startTime'
                    type='time'
                    onChange={handleChange}
                    required

                />
                <br></br>
                </Col>
                <Col style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                    value={happyHour.endTime}
                    name='endTime'
                    type='time'
                    onChange={handleChange}
                    required

                />
                <br></br>
                </Col>
            </Row>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default HappyHourForm