import {useRef} from "react"
import { Link } from "react-router-dom";
import api from '/src/services/api.js'
import backgroundImage from '/imgs/truck.jpg';

function Register() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

 async function handleSubmit(event){
    event.preventDefault()

    try {
      await api.post('/cadastro',{
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      alert("Account has been successfully created")
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error")
    }


    console.log(nameRef.current.value)
    console.log(emailRef.current.value)
    console.log(passwordRef.current.value)
  }
  return (
   
    <div className="min-h-screen w-screen bg-gray-600 flex"> {/* Cor de fundo geral */} 
      <div className="relative w-1/2 flex items-center justify-center p-8"> 
       
        <img 
          src={backgroundImage} 
          alt="truck in a road" 
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        />
  
        <div 
          className="absolute inset-11 p-8 flex items-center justify-center 
                     rounded-2xl bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-xs 
                     border border-gray-100/20"
        >        
        </div>
      </div>

     
      <div className="w-1/2 flex items-center justify-center p-8"> {/* Ocupa a outra metade da largura */}
        <div className="max-w-md w-full bg-stone-100 p-12 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input ref={nameRef} placeholder="Name" type="text" className="w-full px-2 py-3 border border-b-gray-300 rounded-md focus:outline-none bg-white" />
            <input ref={emailRef} placeholder="Email" type="email" className="w-full px-3 py-3 border border-b-gray-300 rounded-md focus:outline-none bg-white" />
            <input ref ={passwordRef} placeholder="Password" type="password" className="w-full px-3 py-3 border border-b-gray-300 rounded-md focus:outline-none bg-white" />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400"> Sign Up </button>
          </form>
          <Link to="/login" className="text-blue-700 hover:underline mt-4 block text-center">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;