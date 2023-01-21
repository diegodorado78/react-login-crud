import { useState } from 'react'
import enerbitLogo from '../../assets/enerbit.svg'
import loginServices from '../../services/loginServices';
import { useFormik } from "formik";
import * as Yup from 'yup'

let schema = Yup.object().shape({
 email: Yup.string().email('Wrong email ').required(),
 password: Yup.string().min(5).required(),
})

export default function Login({ setToken }) {
 const [userInfo, setUserInfo] = useState(true)

 const handleLogin = (credentials) => {
  credentials.email === 'admin@enerbit.com' && credentials.password === 'admin123' ?
   loginServices.login(credentials).then(onLoginSuccess).catch(onLoginError) :
   setUserInfo(false)
 }
 const onLoginSuccess = (res) => {
  setToken(res)
 }
 const onLoginError = (err) => {
  console.error(err);
 }

 const { handleSubmit, handleChange, errors } = useFormik({
  initialValues: {
   email: '',
   password: ''
  },
  onSubmit: handleLogin,
  validationSchema: schema
 })

 return (
  <>
   <div className="flex flex-col  shadow-none items-center justify-start px-6  sm:w-9/12 mx-auto sm:h-screen sm:py-0">
    <a href="https://enerbit.co/" className="md:my-10">
     <img className="w-48 h-32 mr-2" src={enerbitLogo} alt="" />
    </a>
    <div className="w-full bg-white rounded shadow-lg md:mt-0 sm:max-w-md xl:p-0  border">
     <div className="p-6 space-y-4 md:space-y-6 sm:p-8 border">
      <h1 className="text-xl text-purple-800 font-bold leading-tight tracking-tight md:text-2xl ">
       Inicio de Sesión
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
       <div className='email-container'>
        <input
         type="email"
         name="email"
         className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-2.5"
         placeholder="Email"
         onChange={handleChange} />
        {errors.email && <p className=' text-xs text-red-700 float-left m-2'> A valid email format is required</p>}
       </div>
       <div className="password-container">
        <input
         type="password"
         name="password"
         placeholder="Password"
         className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded w-full p-2.5 "
         onChange={handleChange}
        />
        {errors.password && <p className=' text-xs text-red-700 float-left m-2'>A valid password length is required</p>}
       </div>
       <button
        type="submit"
        className=" text-white shadow bg-orange-500 hover:bg-orange-600 rounded text-sm px-5 py-2.5 my-auto  text-center"
       >
        Login
       </button>
      </form>
      {!userInfo && <h5 className='text-red-700'> “Sorry, You Are Not Allowed to Access This Page”</h5>}
     </div>
    </div>
   </div>
  </>
 );
}
