import React, { useState, useEffect } from 'react';
import './Registretion.css';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import ema from '../icon_images/email.png';
import pas from '../icon_images/password.png';
import { userLogin } from '../action/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Img from 'react-bootstrap/Image';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    var emId
    let { id } = useParams();
    { id ? (emId = id) : (emId = "") }

    const loginFieds = {
        email: emId,
        password: "",
    }
    const [loginData, setLoginData] = useState(loginFieds)

    const user_login = useSelector(state => state.userLogin);
    const { loading, loginDone, error } = user_login

    useEffect(() => {
        if (loginDone) {
            swal({ title: "Login Done", text: `${loginDone.message}`, icon: 'success', timer: 2000, button: false })
            setTimeout(() => {
                navigate('/profile')
            }, 2000);
        }
        else if (error) {
            swal("Login Error", `${error}`, 'error')
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }
    }, [navigate, loginDone, error])

    const handleChange = (e) => {
        const { name, type, value } = e.target;
        if (type === 'email' || type == 'password') {
            setLoginData({ ...loginData, [name]: value })
        } else {
            console.log("setLoginData not complet")
        }
    }

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            dispatch(userLogin(loginData));
        }
        setValidated(true);
    };

    return (<>
        <Form noValidate validated={validated} onSubmit={handleSubmit}
            style={{ backgroundColor: '#dceaf7', padding: '3%', borderRadius: '5%' }}>
            <Row className="justify-content-md-center">
                <Col sm='9' style={{ textAlign: 'center', color: "#fd258a", backgroundColor: '#73d4fa', borderRadius: '50px', marginBottom: '1%' }}>
                    <h2>User Login</h2>
                </Col>
            </Row>
            {id ? (<Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom02">
                <Col sm="3">
                    <Img src={ema} style={{ width: '15%', }} />
                    <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Email Id   -</Form.Label>
                </Col >
                <Col sm="6">
                    <Form.Control
                        name='email'
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="Enter Your Email Id"
                        defaultValue=""
                    />
                </Col>
                {/* <Col sm="2">
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col > */}
            </Form.Group>) : (<Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom02">
                <Col sm="3">
                    <Img src={ema} style={{ width: '15%', }} />
                    <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Email Id   -</Form.Label>
                </Col >
                <Col sm="6">
                    <Form.Control
                        name='email'
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="Enter Your Email Id"
                        defaultValue=""
                    />
                </Col>
                {/* <Col sm="2">
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col > */}
            </Form.Group>)}
            <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom03">
                <Col sm="3">
                    <Img src={pas} style={{ width: '15%', }} />
                    <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Password</Form.Label>
                </Col >
                <Col sm="6">
                    <Form.Control
                        required
                        type="password"
                        name='password'
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                        defaultValue=""
                    />
                </Col>
            </Form.Group>
            <Row className="justify-content-md-center">
                <Col sm='9' style={{ textAlign: 'center' }}>
                    <Button type="submit" >Sign IN</Button>
                </Col>
            </Row>
        </Form>
    </>);
}

export default Login;

{/* // <div className='Login'>
        //     <div className='userForm'>
        //         <h2>User Login</h2>
        //         <img src={ema} />
        //         <span>EMAIL ID</span>
        //         <label ><input type="email" name='email' value={loginData.email} onChange={handleChange} placeholder='Enter Your Email Id' /></label>
        //         <img src={pas} />
        //         <span>PASSWORD</span>
        //         <label ><input type="password" name='password' value={loginData.password} onChange={handleChange} placeholder='Enter Password' /></label>
        //         <button className='submitBtn' onClick={handleLogin}>Sign IN</button>
        //     </div>
        // </div> */}

{/*      // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const config = { headers: { 'contnet-type': 'application/json' } }
    //         await axios.post("/users/login", loginData, config)
    //             .then((Response) => {
    //                 console.log(Response.data.data)
    //                 toast.success(Response.data.message, { position: "top-center" })
    //             })
    //             .catch((error) => {
    //                 toast.error(error.response.data.message, { position: "top-center" })
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // } */}

{/*  // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     dispatch(userLogin(loginData));
    //     //  userLogin(loginData)
    // } */}
