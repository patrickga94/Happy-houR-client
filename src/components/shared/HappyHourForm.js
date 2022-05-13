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
                        <select
                        value={happyHour.state}
                        className="form-select form-select-md mb-3"
                        name='state'
                        onChange={handleChange}
                        required>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
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