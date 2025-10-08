import { useEffect, useState } from 'react'
import api from '/src/services/api'

function ListUsers() {
const [allUsers, setAllUsers] = useState()

useEffect(() => {
    async function loadUsers () {
    const token = localStorage.getItem('token')
        const {data: { users },} = await api.get('/list-users',{headers: { Authorization: `Bearer ${token}`  },
        })
        
        setAllUsers(users)
      }

    loadUsers()
    
}, [])

    return (
        <div className='max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'> Users List</h2>
            <ul className='space-y-2'>
             {allUsers && allUsers.length > 0 && allUsers.map(user => (
                <li key={user.id} className='bg-gray-100 p-4 rounded-md'>
                    <p className='font-semibold'>ID: {user.id}</p>
                    <p>{user.name}Name: </p>
                    <p>{user.email}Email: </p>


                </li>
             ))}



            </ul>
                
            
        </div>
    )
}

export default ListUsers