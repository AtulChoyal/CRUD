import React, { useState, useEffect } from 'react';
import './Profile.css'
import { count } from '../constant/addressHolder'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin, usreLogout } from '../action/userAction';
import axios from 'axios'
import swal from 'sweetalert'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Img from 'react-bootstrap/Image';

import ema from '../icon_images/email.png'
import pas from '../icon_images/password.png'
import add from '../icon_images/address.png'
import fem from '../icon_images/female.png'
import mal from '../icon_images/male.png'
import nam from '../icon_images/name.png'
import img from '../icon_images/male1.png'

const Update = () => {
    const inpitFieds = {
        name: "",
        email: "",
        image: "",
        password: "",
        gender: "",
        address: ""
    }
    const [formData, setFormData] = useState(inpitFieds)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginFieds = {
        email: "",
        password: "",
    }
    const [loginData, setLoginData] = useState(loginFieds)

    const user_login = useSelector(state => state.userLogin)
    const { loading, loginDone, error } = user_login

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setFormData({ ...formData, [name]: file })
            setLoginData({ ...loginData, [name]: value })
        }
        else if (name === 'address') {
            // setAddressData([...addAr, addressData[0] = value])
            // setArea(e.target.value)
            setArea(addArr[0] = value)

        }
        else if (name === 'addressState') {
            //  setStates(e.target.value);
            // setStates([...addArr, addArr[2] = value])
            setStates(addArr[2] = value)

            setCities(count.find(sta => sta.state === e.target.value).city)
            setChanageState(true)
        }
        else if (name === 'addressCity') {
            // setCityName(e.target.value)
            // setCityName([...addArr, addArr[1] = value])
            setCityName(addArr[1] = value)

        }
        else {
            setFormData({ ...formData, [name]: value })
            setLoginData({ ...loginData, [name]: value })
        }
    }

    // useEffect(() => {
    //     setFormData(loginDone.data)
    //     setLoginData(loginDone.data)
    // }, [loginDone])

    // useEffect(() => {
    // }, [formData, loading])

    const [firstNo, setFirstNo] = useState(true)
    if (firstNo) {
        setFormData(loginDone.data)
        setLoginData(loginDone.data)
        setFirstNo(false)
    }

    const btnUpdate = async (e) => {
        //   e.preventDefault();
        const config = {
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }
        const parmision = { onBefore: window.confirm('Do you want to UPDATE Your account data ?') }
        if (parmision.onBefore) {
            await axios.put(`/users/update/${loginDone.data._id}`, formData, config)
                .then((response) => {
                    swal({ title: "Profile Updated", text: `${response.data.message}`, icon: 'success', timer: 3000, button: false })
                    // dispatch(userLogin(loginData));
                    // navigate('/profile')
                    // navigate('/')
                    setTimeout(() => {
                        dispatch(userLogin(loginData));
                    }, 100);
                    setTimeout(() => {
                        navigate('/profile')
                    }, 500)
                })
                .catch((error) => {
                    swal('Error', `${error.response.data.message}`, 'error')
                    setTimeout(() => {
                        navigate('/profile')
                    }, 3000)
                })
        }
    }

    // const [area, setArea] = useState()
    // const [states, setStates] = useState();
    // const [cities, setCities] = useState([]);
    // const [cityName, setCityName] = useState();
    var [chanageState, setChanageState] = useState(false)
    //  var [addArr, setAddArr] = useState([addArray])

    var addArr = []
    // var addStr
    var addStrring = formData.address
    var addArray = addStrring.split(",")

    //var addFirstArr = addArray.slice(0, addArray.length - 3)
    // addArr[0] = addArray.slice(0, addArray.length - 3)
    // addArr[1] = addArray[addArray.length - 3]
    // addArr[2] = addArray[addArray.length - 2]

    const [area, setArea] = useState(addArray.slice(0, addArray.length - 3))
    const [states, setStates] = useState(addArray[addArray.length - 2]);
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState(addArray[addArray.length - 3]);

    // const handleCity = (e) => { setCityName(e.target.value) }
    // const handleArea = (e) => {setArea(e.target.value)}
    // const handleState = (e) => {
    //     setStates(e.target.value);
    //     setCities(count.find(sta => sta.state === e.target.value).city)
    //     setChanageState(true)
    // }


    useEffect(() => {
        addArr[0] = area
        addArr[1] = cityName
        addArr[2] = states
        addArr[3] = 'india'
        var addStr = addArr.toString();
        setFormData({ ...formData, address: addStr })
    }, [states, cityName, area])

    const [validated, setValidated] = useState(false);
    const handleSubmit1 = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            btnUpdate()
        }
        setValidated(true);
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit1}
                style={{
                    backgroundColor: '#cbe6fd', padding: '3%', width: '70%', border: '2px solid black', borderRadius: '10px'
                }}>
                <Row className="justify-content-md-center">
                    <Col sm='9' style={{ textAlign: 'center', color: "#fd258a", backgroundColor: '#73d4fa', borderRadius: '50px', marginBottom: '1%' }}>
                        <h2>Update</h2>
                    </Col>
                </Row>
                <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom01">
                    <Col sm="3">
                        <Img sm='1' src={nam} style={{ width: '15%', }} />
                        <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Your Name -</Form.Label>

                    </Col >
                    <Col sm="6">
                        <Form.Control
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="Enter Your Full Name"
                            defaultValue=""
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom02">
                    <Col sm="3">
                        <Img src={ema} style={{ width: '15%', }} />
                        <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Email Id   -</Form.Label>
                    </Col >
                    <Col sm="6">
                        <Form.Control
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                            placeholder="Enter Your Email Id"
                            defaultValue=""
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom03">
                    <Col sm="3">
                        <Img src={pas} style={{ width: '15%', }} />
                        <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Password</Form.Label>
                    </Col >
                    <Col sm="6">
                        <Form.Control
                            required
                            type="text"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Your Password"
                            defaultValue=""
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom04">
                    <Col sm="3">
                        <Img src={img} style={{ width: '15%', }} />
                        <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Image</Form.Label>
                    </Col >
                    <Col sm="6">
                        <Form.Control
                            // required
                            type="file"
                            name='image'
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Row className="justify-content-md-center">
                    <Col sm="3">
                        <Img src={mal} style={{ width: '15%', }} />
                        <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Gender -</Form.Label>
                    </Col >
                    <Col sm='1'>
                        <Form.Check required defaultValue={''} name='gender' type="radio" aria-label="radio 1" value={'male'} checked={formData.gender === 'male'} onChange={handleChange} />
                    </Col>
                    <Form.Label column sm="2" style={{ fontWeight: 'bold' }}>Male</Form.Label>
                    <Col sm='1'>
                        <Form.Check name='gender' type="radio" aria-label="radio 1" value={'female'} checked={formData.gender === 'female'} onChange={handleChange} />
                    </Col>
                    <Form.Label column sm="2" style={{ fontWeight: 'bold' }}>Female</Form.Label>

                </Row>
                <Row className="justify-content-md-center">
                    <Col sm="3">
                        <Img src={add} style={{ width: '15%', }} />
                        <Form.Label column style={{ fontWeight: 'bold', fontSize: '130%' }}>Address</Form.Label>
                    </Col >
                    <Col sm='6'>
                        <Form.Control
                            required
                            type="text"
                            defaultValue=""
                            name='address'
                            //  value={formData.address}
                            value={addArr[0]}
                            // onChange={handleArea} 
                            onChange={handleChange}
                            placeholder='House No & villege Name' /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm='3'></Col>
                    <Col sm='3' style={{ textAlign: 'center' }}>
                        <Form.Label style={{ fontWeight: 'bold', }}>State</Form.Label>
                        <Form.Select
                            name='addressState'
                            required
                            defaultValue=""
                            // onChange={handleState}
                            onChange={handleChange}  >
                            <option value={addArr[2]}>{addArr[2]}</option>
                            {count.map(city => (
                                <option key={city.state} value={city.state} >{city.state}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col sm='3' style={{ textAlign: 'center' }}>
                        <Form.Label style={{ fontWeight: 'bold' }} >City</Form.Label>
                        <Form.Select
                            name='addressCity'
                            required
                            defaultValue=""
                            // onChange={handleCity}
                            onChange={handleChange}>
                            {chanageState ?
                                (<option value={""}>-- Select City--</option>) :
                                (<option value={addArr[1]}>{addArr[1]}</option>)}
                            {cities.map((ctr) => (
                                <option key={ctr.nameCity} value={ctr.nameCity} >{ctr.nameCity}</option>
                            ))}
                        </Form.Select>
                    </Col >
                </Row>
                <Row className="justify-content-md-center" >
                    <Col
                        sm='9'
                        style={{ alignItems: 'center' }}
                    >
                        <Form.Group >
                            <Form.Check
                                required
                                label="Declaration - All Update Information Is True"
                                feedback="You must agree before updating."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm='9' style={{ textAlign: 'center' }}>
                        <Button type="submit" style={{ fontWeight: 'bold', width: '50%' }} >Update Data</Button>
                    </Col>
                </Row>
            </Form>
            {/* <div className='Registretion'>
                <div className='userForm'>
                    {loginDone ? (<img className='mainImg' src={loginDone.data.image} />) : (<img className='mainImg' src={mal} />)}
                    <span style={{ fontSize: "200%", color: "green", marginLeft: "20%" }}>Updete</span>
                    <label> <img src={nam} />
                        <span>YOUR NAME</span>
                        <input type="text" name='name' value={formData.name} onChange={handleChange} />
                    </label>
                    <label > <img src={ema} />
                        <span>EMAIL ID</span>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} />
                    </label>
                    <label > <img src={mal} />
                        <span>UPLOAD IMAGE</span>
                       <input type="file" name='image' onChange={handleChange} />
                    </label>
                    <label > <img src={pas} />
                        <span>PASSWORD</span>
                        <input type="passwod" name='password' value={formData.password} onChange={handleChange} />
                    </label>
                    <label ><span>GENDER</span>

                        <span className='spangender'>
                            <input className='inputRadio' id='radio1' type="radio" name='gender' value={'male'}
                                checked={formData.gender === 'male'} onChange={handleChange} />
                            <img src={img} /><big className='gm'>Male</big>
                        </span>
                        <span className='spangender'>
                            <input type="radio" name='gender' value={'female'} checked={formData.gender === 'female'} onChange={handleChange} />
                            <img src={fem} style={{ width: "30px", height: "30px" }} /> <big className='gf'>Female</big>
                        </span>
                    </label>
                    <label >  <img src={add} />
                        <span>SELECT COUNTRY</span>
                        <select name='address' onChange={handleChange} >
                            <option value={formData.address}>{formData.address}</option>
                            {count.map(city => (
                                <option key={city.state} value={city.state} >{city.state}</option>
                            ))}
                        </select>
                    </label>
                    <button className='submitBtn' onClick={btnUpdate} style={{ marginBottom: '2px' }}>Update</button>
                </div>
            </div> */}
        </>);
}

export default Update;


{/* // <div className='Registretion'>
        //     <div className='userForm'>
        //         {loginDone ? (<img className='mainImg' src={loginDone.data.image} />) : (<img className='mainImg' src={mal} />)}
        //         <span style={{ fontSize: "200%", color: "green", marginLeft: "20%" }}>Updete</span>
        //         <label> <img src={nam} />
        //             <span>YOUR NAME</span>
        //             <input type="text" name='name' value={formData.name} onChange={handleChange} />
        //         </label>
        //         <label > <img src={ema} />
        //             <span>EMAIL ID</span>
        //             <input type="email" name='email' value={formData.email} onChange={handleChange} />
        //         </label>
        //         <label > <img src={mal} />
        //             <span>UPLOAD IMAGE</span>
        //              <input type="file" name='image' value={formData.image} onChange={handleChange} /> 
        //             <input type="file" name='image' onChange={handleChange} />
        //         </label>
        //         <label > <img src={pas} />
        //             <span>PASSWORD</span>
        //             <input type="passwod" name='password' value={formData.password} onChange={handleChange} />
        //         </label>
        //         <label ><span>GENDER</span>

        //             <span className='spangender'>
        //                 <input className='inputRadio' id='radio1' type="radio" name='gender' value={'male'}
        //                     checked={formData.gender === 'male'} onChange={handleChange} />
        //                 <img src={img} /><big className='gm'>Male</big>
        //             </span>
        //             <span className='spangender'>
        //                 <input type="radio" name='gender' value={'female'} checked={formData.gender === 'female'} onChange={handleChange} />
        //                 <img src={fem} style={{ width: "30px", height: "30px" }} /> <big className='gf'>Female</big>
        //             </span>
        //         </label>
        //         <label >  <img src={add} />
        //             <span>SELECT COUNTRY</span>
        //             <select name='address' onChange={handleChange} >
        //                 <option value={formData.address}>{formData.address}</option>
        //                 {count.map(city => (
        //                     <option key={city.state} value={city.state} >{city.state}</option>
        //                 ))}
        //             </select>
        //         </label>
        //         <button className='submitBtn' onClick={btnUpdate} style={{ marginBottom: '2px' }}>Update</button>
        //     </div>
        // </div> */}

{/* // const { name, value } = e.target;
            // setFormData({ ...formData, [name]: value })
             setFormData({ ...formData, [e.target.name]: e.target.value })
setLoginData({ ...loginData, [name]: value }) */}

{/*const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value })
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setLoginData({ ...loginData, [name]: value })} */}