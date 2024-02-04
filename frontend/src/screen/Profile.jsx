import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Update from './Update';
import { usreLogout } from '../action/userAction'
import axios from 'axios'
import swal from 'sweetalert'
import img from '../icon_images/male1.png'

const Profile = () => {
    var [no, setNo] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user_login = useSelector(state => state.userLogin)
    const { loading, loginDone, error } = user_login

    const btnLogOut = () => {
        swal({
            title: "Do you want to LOGOUT?",
            text: "You click (OK) button so your account will logout.\nYou click (CANCAL) button so redirect on profile page.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(usreLogout())
                    swal({ title: "LOGOUT", text: 'You have done logout to you account.', icon: 'success', timer: 2000, button: false })
                    navigate('/')
                }
            });
    }

    const btnDelete = async () => {
        swal({
            title: "Do you want to PARMANENT DELETE Your account?",
            text: "You click (OK) button so your account will PARMANENT DELETE.\nYou click (CANCAL) button so redirect on profile page.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`/users/delete/${loginDone.data._id}`)
                        .then((response) => {
                            swal({ title: "Deleted!", text: `${response.data.message}`, icon: 'success', timer: 3000, button: false })
                            dispatch(usreLogout())
                            setTimeout(() => {
                                navigate('/')
                            }, 3000);
                        })
                        .catch((error) => {
                            swal({ title: "Delete Error!", text: `${error}`, icon: 'error' })
                            setTimeout(() => {
                                navigate('/profile')
                            }, 3000)
                        })
                }
            });
    }

    // if (!loginDone) { navigate('/') }

    useEffect(() => {
        // if (!loginDone) { navigate('/') }
    }, [no, loginDone])

    return (
        <div className='main'>
            <Card className='first' >
                {loginDone ? (<Card.Img variant="top" src={loginDone.data.image} />)
                    : (<Card.Img variant="top" src={img} />)}
                <Card.Body>
                    {loginDone ? (<Card.Title>Name - {loginDone.data.name}</Card.Title>) : (<Card.Title>Name - ____</Card.Title>)}
                    <Button variant="primary" onClick={() => { setNo(1) }}>Update Profile</Button>
                    <Button variant="primary" onClick={() => { setNo(2) }}>Delete Account</Button>
                    <Button variant="primary" onClick={() => { setNo(3) }}>LogOut</Button>
                </Card.Body>
            </Card>
            {no === 1 ?
                (loginDone ? (<Update />) :
                    (<div className='Registretion'><h1>data emty so pleace firstly logout then again login</h1></div>))
                : no === 2 ?
                    (loginDone ?
                        (<div className='Registretion'><div className='small'><p>If you are want to <big style={{ color: 'red' }}>Delete Account Paramanent</big> so click on Button in below</p><button className='submitBtn' onClick={btnDelete} style={{ backgroundColor: "black", color: 'white', marginLeft: '0', height: '20%', fontSize: '150%' }}
                        >Delete My Account</button></div> </div>) :
                        (<div className='Registretion'><h1>data emty so pleace firstly logout then again login</h1></div>))
                    : no === 3 ?
                        (<div className='Registretion'><div className='small'><p>If you want LogOut so click on Button in below </p> <button className='submitBtn' onClick={btnLogOut} style={{ backgroundColor: "yellow", color: 'red', marginLeft: '0', height: '20%', fontSize: '150%' }}
                        >Log Out</button></div></div>) :

                        (loginDone ?
                            (<div className='Registretion'><h1>Welcome {loginDone.data.name} In Profile Page</h1></div>) : (<div className='Registretion'><h1>Welcome In Profile Page</h1></div>))
            }
        </div>);
}

export default Profile;

{/* const parmisionLogout = { onBefore: window.confirm('Do you want to LOGOUT ?') }
if (parmisionLogout.onBefore) {
    dispatch(usreLogout())
    swal({ title: "LOGOUT", text: 'You have done logout to you account.', icon: 'success', timer: 2000, button: false })
    navigate('/')
} */}

{/*
const parmision = { onBefore: window.confirm('Do you want to PARMANENT DELETE Your account ?') }
if (parmision.onBefore) {
    await axios.delete(`/users/delete/${loginDone.data._id}`)
        .then((response) => {
            swal({ title: "Deleted!", text: `${response.data.message}`, icon: 'success', timer: 3000, button: false })
            dispatch(usreLogout())
            setTimeout(() => {
                navigate('/')
            }, 3000);
        })
        .catch((error) => {
            swal({ title: "Delete Error!", text: `${error}`, icon: 'error' })
            setTimeout(() => {
                navigate('/profile')
            }, 3000)
        })
}
*/}
