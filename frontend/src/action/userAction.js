import axios from 'axios';
import toast from 'react-hot-toast'
//  import { useDispatch } from 'react-redux';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_WITH_EMAIL } from '../constant/userConstant'

// export const userRegister = async (formData) => {
//     try {
//         const aa = {
//             name: formData.name,
//             email: formData.email,
//             image: formData.image,
//             password: formData.password,
//             gender: formData.gender,
//             address: formData.address
//         }
//         console.log(aa)
//         const url = "http://localhost:8000/users/register"
//         const config = { headers: { 'contnet-type': 'application/json' } }
//         const { data } = await axios.post(url, { aa }, config)
//         if (data) {
//             console.log(data)
//             console.log('register done')
//         } else {
//             console.log('wrong')
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }

export const userLogin = (loginData) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = { headers: { 'contnet-type': 'application/json' } }
        const { data } = await axios.post("/users/login", loginData, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
};

export const usreLoginWithEmail = () => dispatch => {
    dispatch({ type: USER_LOGIN_WITH_EMAIL });
}

export const usreLogout = () => dispatch => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
}

// export const userLogin = async (loginData) => {
//     try {
//         const config = { headers: { 'contnet-type': 'application/json' } }
//         // const { data } = await axios.post("/users/login", loginData, config)
//         await axios.post("/users/login", loginData, config)
//             .then((Response) => {

//                 console.log(Response.data.data)
//                 toast.success(Response.data.message, { position: "top-center" })
//                 // Response.status(200).json({ dataAction: Response.data.data })
//                 return Response
//             })
//             .catch((error) => {
//                 toast.error(error.response.data.message, { position: "top-center" })
//             })
//     } catch (error) {
//         console.log(error)
//     }
// }

// try {
//     dispatch({ type: USER_LOGIN_REQUEST })
//     const config = { headers: { 'contnet-type': 'application/json' } }
//     const { data } = await axios.post('/api/users/login', { email, password }, config)
//     dispatch({
//         type: USER_LOGIN_SUCCESS,
//         payload: data
//     })
//     localStorage.setItem('userInfo', JSON.stringify(data))
// } catch (error) {
//     dispatch({
//         type: USER_LOGIN_FAIL,
//         payload:
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message
//     })
// }