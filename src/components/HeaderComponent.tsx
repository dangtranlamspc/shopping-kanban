import { authSelector, removeAuth } from '@/redux/reducers/authReducer'
import { Avatar, Button, Layout } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'



const HeaderComponent = () => {
  const auth = useSelector(authSelector)
  const router = useRouter();
  const dispatch = useDispatch()
  return (
    <div className='p-3'>
      <div className="row">
        <div className="col"></div>
        <div className="col text-right">
          {
            auth.accesstoken && auth._id 
              ? 
                <Button 
                  onClick={() => {
                    dispatch(removeAuth({}))
                    localStorage.clear()
                  }} 
                danger 
                type='text' 
                icon={<BiPowerOff size={20} />}/> 
              : 
              <Button
                type='primary'
                onClick={() => router.push('/auth/login')}
                href={`/auth/login`}>
                Login
              </Button>
          }
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent