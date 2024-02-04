import React, { useState, useEffect } from 'react';
import './Registretion.css'
import ema from '../icon_images/email.png'
import pas from '../icon_images/password.png'
import add from '../icon_images/address.png'
import fem from '../icon_images/female.png'
import mal from '../icon_images/male.png'
import nam from '../icon_images/name.png'
import img from '../icon_images/male1.png'
import { userRegister } from '../action/userAction'
import axios from 'axios'
import toast from 'react-hot-toast';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import { count } from '../constant/addressHolder'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Img from 'react-bootstrap/Image';
import { icon } from 'react-bootstrap'

const Registretion = () => {
    const navigate = useNavigate();
    const inpitFieds = {
        name: "",
        email: "",
        image: "",
        password: "",
        gender: "",
        address: ""
        // address: []
    }
    const [formData, setFormData] = useState(inpitFieds)

    const handleChange = (e) => {
        const { name, type, value, checked, files } = e.target;
        if (type === "checkbox") {
            const subjectArr = [...formData.subject]
            if (checked) {
                subjectArr.push(value);
            } else {
                const index = subjectArr.indexOf(value);
                if (index !== -1) {
                    subjectArr.splice(index, 1);
                }
            }
            setFormData({ ...formData, subject: subjectArr })
        } else if (type === 'file') {
            const file = files[0];
            // setFormData({ ...formData, [name]: file.name })
            setFormData({ ...formData, [name]: file })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        const config = {
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }
        console.log(formData)
        await axios.post("/users/register", formData, config)
            .then((response) => {
                swal({ title: "Registretion Done", text: `${response.data.message}`, icon: 'success', timer: 3000, button: false })
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            })
            .catch((error) => {
                swal('Oops!', `${error.response.data.message}`, 'error')
                setTimeout(() => {
                    navigate('/register')
                }, 3000)
            })
    }

    const [area, setArea] = useState()
    const [states, setStates] = useState();
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState();
    var addArr = []
    var addStr
    const handleCity = (e) => {
        setCityName(e.target.value)
    }
    const handleArea = (e) => {
        setArea(e.target.value)
    }
    const handleState = (e) => {
        setStates(e.target.value);
        setCities(count.find(sta => sta.state === e.target.value).city)
    }
    useEffect(() => {
        addArr[0] = area
        addArr[1] = cityName
        addArr[2] = states
        addArr[3] = 'india'
        addStr = addArr.toString();
        setFormData({ ...formData, address: addStr })
        // console.log(formData.address)
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
            handleSubmit()
        }
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit1}
            style={{ backgroundColor: '#cfffb6', padding: '3%', borderRadius: '5%' }}>
            <Row className="justify-content-md-center">
                <Col sm='9' style={{ textAlign: 'center', color: "#fd258a", backgroundColor: '#94fc6a', borderRadius: '50px', marginBottom: '1%' }}>
                    <h2>Registretion Form</h2>
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
                {/* <Col sm="2">
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col > */}
            </Form.Group>
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
                    //  placeholder="Choose Profile Image"
                    //    multiple
                    //  defaultValue="Mark"
                    />

                </Col>
                {/* <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={handleChange}
              isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.file}
            </Form.Control.Feedback>
          </Form.Group> */}
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
                <Col sm='6'> <Form.Control required defaultValue="" name='address'
                    //  value={formData.address} 
                    value={addArr[0]}
                    // onChange={handleChange}
                    onChange={handleArea}
                    placeholder='House No & villege Name' /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm='3'></Col>
                <Col sm='3' style={{ textAlign: 'center' }}>
                    <Form.Label style={{ fontWeight: 'bold', }}>State</Form.Label>
                    <Form.Select name='address' required defaultValue="" onChange={handleState}  >
                        <option value={""}>-- Select State --</option>
                        {count.map(city => (
                            <option key={city.state} value={city.state} >{city.state}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col sm='3' style={{ textAlign: 'center' }}>
                    <Form.Label style={{ fontWeight: 'bold' }} >City</Form.Label>
                    <Form.Select required defaultValue="" onChange={handleCity}>
                        <option value={""}>-- Select City --</option>
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
                            label="Declaration - All Information Is True"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm='9' style={{ textAlign: 'center' }}>
                    <Button type="submit" >Submit</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default Registretion;
{/*
        // <div className='Registretio'>
        //     <div className='userForm'>
        //         <h2>REGISTRETION FORM</h2>
        //         <img src={nam} />
        //         <span>YOUR NAME</span>
        //         <label ><input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter Your Name' /></label>
        //         <img src={ema} />
        //         <span>EMAIL ID</span>
        //         <label ><input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Your Email Id' /></label>
        //         <img src={mal} />
        //         <span>UPLOAD IMAGE</span>
        //         <label ><input type="file" name='image' onChange={handleChange} /></label>
        //         <img src={pas} />
        //         <span>PASSWORD</span>
        //         <label ><input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter Password' /></label>
        //         <span>GENDER</span>
        //         <label >
        //             <span className='spangender'>
        //                 <input type="radio" name='gender' value={'male'} checked={formData.gender === 'male'} onChange={handleChange} />
        //                 <img src={img} /><big className='gm'>Male</big>
        //             </span>
        //             <span className='spangender'>
        //                 <input type="radio" name='gender' value={'female'} checked={formData.gender === 'female'} onChange={handleChange} />
        //                 <img src={fem} style={{ width: "30px", height: "30px" }} /> <big className='gf'>Female</big>
        //             </span>
        //         </label>
        //         <img src={add} />
        //         <span>SELECT STATE</span>
        //         <label >
        //             <select name='address' onChange={handleChange} >
        //                 <option value={""}>-- Select City --</option>
        //                 {count.map(city => (
        //                     <option key={city.state} value={city.state} >{city.state}</option>
        //                 ))}
        //             </select>
        //         </label>
        //         <button className='submitBtn'
        //             onClick={handleSubmit}
        //         >Submit</button>
        //     </div>
 // </div> */}
{/*
 <span>Subject</span>
                <label >
                    <input type="checkbox" name='subject' onChange={handleChange} checked={formData.subject.includes('html')} value={'html'} />HTML
                    <input type="checkbox" name='subject' onChange={handleChange} checked={formData.subject.includes('java')} value={'java'} />JAVA
                    <input type="checkbox" name='subject' onChange={handleChange} checked={formData.subject.includes('python')} value={'html'} />Python
                </label>
*/}

{/* <img src={add} />
                <span>ADDRESS</span>
                <label>
                    <input type="text" name='address' value={area} onChange={handleArea} placeholder='--   House No. & area --' />
                </label>
                <label >
                    <select name='address' onChange={handleState} >
                        <option value={""}>-- Select State --</option>
                        {count.map((sta) => (
                            <option key={sta.state} value={sta.state} >{sta.state}</option>
                        ))}
                    </select>
                    <select name='address' onChange={handleCity} >
                        <option value={""}>-- Select City --</option>
                        {cities.map((ctr) => (
                            <option key={ctr.nameCity} value={ctr.nameCity} >{ctr.nameCity}</option>
                        ))
                        }
                    </select>
                </label> */}
