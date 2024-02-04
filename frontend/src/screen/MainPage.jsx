import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import swal from 'sweetalert'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from "react-router-bootstrap";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { usreLogout } from '../action/userAction';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlerNavigate = () => {
        navigate('/register')
    }

    const user_login = useSelector(state => state.userLogin)
    const { loading, loginDone, error } = user_login

    useEffect(() => {

    }, [loginDone])

    const logOuts = () => {
        const parmisionLogout = { onBefore: window.confirm('Do you want to LOGOUT ?') }
        if (parmisionLogout.onBefore) {
            dispatch(usreLogout())
            swal({ title: "LOGOUT", text: 'You have done logout to you account.', icon: 'success', timer: 2000, button: false })
            navigate('/')
        }
    }

    const [nameId, setNameId] = useState();
    const handleChange = (e) => {
        setNameId(e.target.value)
    }
    const handleSearch = () => {
        navigate(`/${nameId}`)
    }

    return (<>
        <Navbar expand="lg" bg="info" data-bs-theme="light"
            //className="bg-body-tertiary"
            style={{ position: "sticky", top: "0", zIndex: "1", borderRadius: "50px" }}>
            <Container >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarScroll" style={{ fontWeight: "bold" }} >
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '' }} navbarScroll>
                        <LinkContainer to={'/'} >
                            <Navbar.Brand style={{ border: "1px solid black" }} >Home </Navbar.Brand>
                        </LinkContainer>
                        {loginDone ?
                            (<>
                                <LinkContainer to={'/profile'}  >
                                    <Navbar.Brand  >Profile</Navbar.Brand>
                                </LinkContainer>
                                <Nav.Link onClick={logOuts} style={{ color: 'red' }}>Logout</Nav.Link>
                            </>)
                            : (<>
                                <LinkContainer to={'/register'} >
                                    <Navbar.Brand  >Registretion</Navbar.Brand>
                                </LinkContainer>

                                <LinkContainer to={'/login'} >
                                    <Navbar.Brand  >Login</Navbar.Brand>
                                </LinkContainer>
                            </>)
                        }
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            {loginDone ?
                                (<NavDropdown.Item >
                                    <Nav.Link onClick={logOuts} style={{ backgroundColor: "red", borderRadius: '10px', color: 'white' }}>LOGOUT</Nav.Link>
                                </NavDropdown.Item>)
                                : (<>
                                    <LinkContainer to={'/register'} style={{ backgroundColor: 'green', borderRadius: '10px', color: 'white', margin: "2%", width: "96%", textAlign: "center", fontWeight: "bold" }}>
                                        <NavDropdown.Item  >REGISTRESION</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to={'/login'} style={{ backgroundColor: 'blue', borderRadius: '10px', color: 'white', margin: "2%", width: "96%", textAlign: "center", fontWeight: "bold" }}>
                                        <NavDropdown.Item  >LOGIN</NavDropdown.Item>
                                    </LinkContainer>
                                </>)}
                        </NavDropdown>
                    </Nav >
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search By Full Name" className="me-2" aria-label="Search" onChange={handleChange} />
                        <Button variant="outline-danger" style={{ fontWeight: "bold" }} onClick={handleSearch}>Search</Button>
                    </Form>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    </>);
}

export default MainPage;