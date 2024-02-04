import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const Home = () => {
    let [allData, setAllData] = useState([]);
    const navigate = useNavigate();

    const getAllData = async () => {
        const allData = await axios.get('/users/getall')
        const { userdata, message } = allData.data
        setAllData(userdata)
    }

    useEffect(() => {
        getAllData()
    }, [])

    const userLo = (emailId) => {
        navigate(`/login/${emailId}`)
    }

    const { name } = useParams();
    // var [checkSearch, setCheckSearch] = useState(false)
    var checkSearch = false

    if (name) {
        {
            allData.map((users) => {
                if (users.name === name) {
                    if (!checkSearch) {
                        checkSearch = true
                    }
                }
            }
            )
        }
        if (!checkSearch) {
            swal({ title: "This Name Is Not Exist", text: 'This name is not exist in data list', icon: 'error', button: true })
            navigate('/')
        }
    }

    return (
        <>
            {/* <div> */}
            <Row style={{ marginTop: '5px' }}>
                {!name ? (
                    allData.map((users) => (
                        <Col key={`${users._id}`}>
                            <Card style={{ width: '18rem', marginBottom: "1%", backgroundColor: "pink", alignItems: 'center', textAlign: 'center' }}>
                                <Card.Img variant="top" src={users.image} style={{ width: '50%', height: '30%' }} />
                                <Card.Body>
                                    <Card.Title>Name :- {users.name}</Card.Title>
                                    <Button variant="primary" onClick={() => userLo(users.email)}>login</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) :
                    (allData.map((users) => (
                        users.name === name ? (
                            <Col key={`${users._id}`} >
                                <Card style={{ width: '18rem', marginBottom: "1%", backgroundColor: "pink", alignItems: 'center', textAlign: 'center' }}>
                                    <Card.Img variant="top" src={users.image} style={{ width: '50%', height: '30%' }} />
                                    <Card.Body>
                                        <Card.Title>Name :- {users.name}</Card.Title>
                                        <Button variant="primary" onClick={() => userLo(users.email)}>login</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ) : (<></>))
                    ))
                }
            </Row>
            {/* </div> */}
        </>
    );
}

export default Home;

{/*  <Card style={{ width: '18rem', marginBottom: "1%", backgroundColor: "pink", alignItems: 'center', textAlign: 'center' }}>
                                 <Card.Img variant="top" src={users.image} style={{ width: '50%', height: '30%' }} />
                                <Card.Body>
                                <Card.Title>Name :- {users.name}</Card.Title>
                                    <Button variant="primary" onClick={() => userLo(users.email)}>login</Button>
                                 </Card.Body>
                             </Card> */}