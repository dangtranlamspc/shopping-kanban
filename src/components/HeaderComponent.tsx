import { authSelector, removeAuth } from '@/redux/reducers/authReducer'
import { Affix, Avatar, Button, Card, Divider, Dropdown, Layout, List, Menu, Space, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoHeartOutline, IoSearch } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesListCard from './CategoriesListCard'



const HeaderComponent = () => {
  const auth = useSelector(authSelector)
  const dispatch = useDispatch()
  const router = useRouter();
  const [isVisibleMenuDrawe,setIsVisibleMenuDrawe] = useState(false)
  return (
    <Affix offsetTop={0}>
      <div className='container-fluid bg-white'>
        <div className='p-3'>
          <div className='row'>
          <div className='d-none d-sm-block d-md-none'>
							<Button
								type='text'
								icon={<GiHamburgerMenu size={22} />}
							/>
						</div>
            <div className="col d-none d-md-block">
              <img src='/images/logo.png' style={{width : 100}} alt='' />
            </div>
            <div className='col d-none d-md-block text-center'>
              <Menu
                style={{border : 'none'}}
                mode='horizontal'
                items={[
                  {
                    label : 'Home',
                    key : 'home'
                  },
                  {
                    label: (
                      <Dropdown
                        placement='bottom'
                        dropdownRender={() => (
                          <CategoriesListCard type='card' />
                        )}>
                        <Typography.Text
                          onClick={() => setIsVisibleMenuDrawe(true)}>
                          Shop
                        </Typography.Text>
                      </Dropdown>
                    ),
                    key: 'shop',
                  },
                  {
                    label : <Link href={'/story'}>Out story</Link>,
                    key : 'story'
                  },
                  {
										label: <Link href={'/blog'}>Blog</Link>,
										key: 'blog',
									},
									{
										label: <Link href={'/contact'}>Contact Us</Link>,
										key: 'contact',
									},
                ]}
              />
            </div>
            <div className="col text-right">
              <Space>
                <Button icon={<IoSearch size={24} type='text' />}></Button>
                <Button icon={<IoHeartOutline size={24} type='text' />}></Button>
              <Divider type='vertical' />
              {auth.accesstoken && auth._id ? (
                <Button 
                  onClick={() => {
                    dispatch(removeAuth({}))
                    localStorage.clear()
                  }}
                  danger
                  type='text'
                  icon={<BiPowerOff size={23} />}
                />
              ) : (
                <Button
                  type='primary'
                  onClick={() => router.push('/auth/login')}
                  href={`/auth/login`}
                >
                  Login
                </Button>
              )}
            </Space>
            </div>
            
          </div>
        </div>
      </div>
    </Affix>
  )
}

export default HeaderComponent