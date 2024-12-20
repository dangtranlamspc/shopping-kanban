import handleAPI from '@/apis/handleApi'
import { addAuth } from '@/redux/reducers/authReducer'
import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const {Text, Title, Paragraph } = Typography;

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isRemember, setIsRemember] = useState(false)
    const [form] = Form.useForm()
    const handleLogin = async (values : {email : string, password : string}) => {
        const api = `/customers/login`;

        setIsLoading(true)

        try {
            const res = await handleAPI({
                url : api,
                data : values,
                method : 'post',
            })

            dispatch(addAuth(res.data))
            localStorage.setItem('authData', JSON.stringify(res.data))
            router.push('/')
        } catch (error) {
            console.log(error)
            message.error('Đăng nhập thấy bại, vui lòng kiểm tra lại email/password và thử lại')
        }finally{
            setIsLoading(false)
        }
    }
    
  return (
    <div>
      <div className='container-fluid' style={{height : '100vh'}}>
        <div className="row" style={{height : '100vh'}}>
            <div 
                className='d-none d-md-block col-6 p-0'
                style={{
                    backgroundImage : `url(/images/login.jpg)`,
                    backgroundSize : 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="mt-5 ml-5" style={{backgroundColor : 'transparent'}}>
                    <img 
                        src='/images/logo.png'
                        alt=''
                        style={{backgroundColor : 'transparent'}}
                    />
                </div>
            </div>
            <div className='col-sm-12 col-md-6'>
                <div className="container d-flex" style={{height : '100%', alignItems:'center'}}>
                    <div className='col-sm-12 col-md-12 col-lg-8 offset-lg-2'>
                        <div className="mt-4">
                            <Typography.Title className='mt-0'>Velcome</Typography.Title>
                            <Typography.Paragraph type='secondary'>Please login here</Typography.Paragraph>
                        </div>
                        <Form
                            disabled={isLoading}
                            form={form} 
                            layout='vertical' 
                            onFinish={handleLogin} 
                            size='large'
                        >
                            <Form.Item 
                                name={'email'} 
                                label='Email Address' 
                                rules={[{
                                    required : true,
                                    message : 'Please enter your Email'
                                }]}
                            >
                                <Input placeholder='' type='email-address' allowClear />
                            </Form.Item>
                            <Form.Item 
                                name={'password'}
                                label='Password'
                                rules={[{
                                    required : true,
                                    message : 'Please enter your password'
                                }]}
                            >
                                <Input placeholder='' type='password' allowClear />
                            </Form.Item>
                        </Form>
                        <div className="row mt-4">
                            <div className="col">
                              <Checkbox
                                onChange={(val) => setIsRemember(val.target.checked)}
                                checked={isRemember}
                              >
                                  Remember Me
                              </Checkbox>
                            </div>
                            <div className="col text-right">
                              <Link href={''}>Forgot Password ?</Link>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button loading={isLoading} type='primary' size='large' style={{width:'100%'}} onClick={()=>form.submit()}>Login</Button>
                        </div>
                        <div className='mt-4 text-center'>
                          <Space>
                            <Text type='secondary'>Bạn không có tài khoản ?</Text>
                            <Link href={'/auth/signup'}>Tạo tài khoản</Link>
                          </Space>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Login
