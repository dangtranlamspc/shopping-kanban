import handleAPI from '@/apis/handleApi';
import { addAuth } from '@/redux/reducers/authReducer';
import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { BsArrowBarLeft, BsArrowLeft } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

interface SignUp {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
}

const {Text} = Typography

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const [isAgree, setIsAgree] = useState(false);

    const [signValue, setSignValue] = useState<any>()

    const [ numOfCode , setNumOfCode ] = useState<string[]>([])

    const [times, setTimes] = useState(160);

    const [form] = Form.useForm();

    const dispatch = useDispatch()

    const inpRef1 = useRef<any>(null)
    const inpRef2 = useRef<any>(null)
    const inpRef3 = useRef<any>(null)
    const inpRef4 = useRef<any>(null)
    const inpRef5 = useRef<any>(null)
    const inpRef6 = useRef<any>(null)

    useEffect(() => {
		const time = setInterval(() => {
			setTimes((t) => t - 1);
		}, 1000);
		return () => clearInterval(time);
	}, []);

    const handleSignUp = async (values : SignUp) => {
        const api = `/customers/add-new`
        setIsLoading(true)
        try {
            const res = await handleAPI({url : api, data : values , method : 'post'})
            if (res.data) {
                setSignValue(res.data)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    const hanldeChangeNumOfCode = (val : string, index : number) => {
        const items= [...numOfCode]
        items[index] = val

        setNumOfCode(items)
    }

    const handleVerify = async () => {
		if (numOfCode.length >= 6) {
			let code = numOfCode.join('');

			const api = `/customers/verify?id=${signValue._id}&code=${code}`;
			try {
				const res = await handleAPI({
					url: api,
					data: undefined,
					method: 'put',
				});

				dispatch(addAuth(res.data));
				localStorage.setItem('authData', JSON.stringify(res.data));

				router.push('/');
			} catch (error) {
				console.log(error);
			}
		} else {
			message.error('Invalid code');
		}
	};

    const handleResendCode = async () => {
		const api = `/customers/resend-verify?id=${signValue._id}&email=${signValue.email}`;
		setNumOfCode([]);
		try {
			await handleAPI({ url: api });
			setTimes(60);
		} catch (error) {
			console.log(error);
		}
	};
 
  return (
    <div className='container-fluid' style={{height : '100vh'}}>
        <div className="row" style={{height : '100vh'}}>
            <div 
                className='d-none d-md-block col-6 p-0'
                style={{
                    backgroundImage : `url(/images/bg-auth-${signValue ? `2` : `1`}.png)`,
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
                        {
                            signValue ? (
                                <>
                                    <Button onClick={() => setSignValue(undefined)} type='text' icon={<BsArrowLeft size={20} className='text-muted' />}>
                                        <Typography.Text>Back</Typography.Text>
                                    </Button>
                                    <div className="mt-4">
                                        <Typography.Title className='m-0'>Enter OTP</Typography.Title>
                                        <Typography.Paragraph type='secondary'>We have share a code of your registered email address robertfox@example.com</Typography.Paragraph>
                                    </div>
                                    <div className='d-flex' style={{justifyContent:'space-between'}}>
                                        <Input 
                                            placeholder='' 
                                            size='large' 
                                            style={{
                                                fontSize : 32,
                                                fontWeight : 'bold',
                                                width: 'calc((100% - 90px)/6)',
                                                textAlign : 'center'
                                            }}
                                            maxLength={1}
                                            ref={inpRef1}
                                            onChange={val => {
                                                if(val.target.value) {
                                                    inpRef2?.current.focus();
                                                    hanldeChangeNumOfCode(val.target.value, 0)
                                                }
                                            }}
                                        />
                                        <Input 
                                            placeholder='' 
                                            size='large' 
                                            style={{
                                                fontSize : 32,
                                                fontWeight : 'bold',
                                                width: 'calc((100% - 90px)/6)',
                                                textAlign : 'center'
                                            }}
                                            maxLength={1}
                                            ref={inpRef2}
                                            onChange={val => {
                                                if(val.target.value) {
                                                    inpRef3?.current.focus()
                                                    hanldeChangeNumOfCode(val.target.value, 1)
                                                }
                                            }}
                                        />
                                        <Input 
                                            placeholder='' 
                                            size='large' 
                                            style={{
                                                fontSize : 32,
                                                fontWeight : 'bold',
                                                width: 'calc((100% - 90px)/6)',
                                                textAlign : 'center'
                                            }}
                                            maxLength={1}
                                            ref={inpRef3}
                                            onChange={val => {
                                                if(val.target.value) {
                                                    inpRef4?.current.focus()
                                                    hanldeChangeNumOfCode(val.target.value, 2)
                                                }
                                            }}
                                        />
                                        <Input 
                                            placeholder='' 
                                            size='large' 
                                            style={{
                                                fontSize : 32,
                                                fontWeight : 'bold',
                                                width: 'calc((100% - 90px)/6)',
                                                textAlign : 'center'
                                            }}
                                            maxLength={1}
                                            ref={inpRef4}
                                            onChange={val => {
                                                if(val.target.value) {
                                                    inpRef5?.current.focus()
                                                    hanldeChangeNumOfCode(val.target.value, 3)
                                                }
                                            }}
                                        />
                                        <Input 
                                            placeholder='' 
                                            size='large' 
                                            style={{
                                                fontSize : 32,
                                                fontWeight : 'bold',
                                                width: 'calc((100% - 90px)/6)',
                                                textAlign : 'center'
                                            }}
                                            maxLength={1}
                                            ref={inpRef5}
                                            onChange={val => {
                                                if(val.target.value) {
                                                    inpRef6?.current.focus()
                                                    hanldeChangeNumOfCode(val.target.value, 4)
                                                }
                                            }}
                                        />
                                        <Input 
                                            placeholder='' 
                                            size='large' 
                                            style={{
                                                fontSize : 32,
                                                fontWeight : 'bold',
                                                width: 'calc((100% - 90px)/6)',
                                                textAlign : 'center'
                                            }}
                                            maxLength={1}
                                            ref={inpRef6}
                                            onChange={val => {
                                                hanldeChangeNumOfCode(val.target.value, 5)
                                            }}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Button 
                                            loading={isLoading} 
                                            type='primary' 
                                            size='large' 
                                            style={{width:'100%'}} 
                                            onClick={handleVerify}
                                        >
                                            Verify
                                        </Button>
                                        <div className='mt-2 text-center'>
											{times < 0 ? (
												<Button type='link' onClick={handleResendCode}>
													Resend
												</Button>
											) : (
												<Typography>Resend a new code: {times}s</Typography>
											)}
										</div>
                                    </div>
                                </>
                                    ) : (
                                        <>
                                            <div className="mt-4">
                                                <Typography.Title level={2} className='mt-0'>Create new account</Typography.Title>
                                                <Typography.Paragraph type='secondary'>Please enter details</Typography.Paragraph>
                                            </div>
                                            <Form
                                                disabled={isLoading}
                                                form={form} 
                                                layout='vertical' 
                                                onFinish={handleSignUp} 
                                                size='large'
                                            >
                                                <Form.Item name={'firstName'} label='First Name'>
                                                    <Input placeholder='' allowClear />
                                                </Form.Item>
                                                <Form.Item name={'lastName'} label='Last Name'>
                                                    <Input placeholder='' allowClear />
                                                </Form.Item>
                                                <Form.Item 
                                                    name={'email'} 
                                                    label='Email' 
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
                                            <div className="mt-4">
                                                <Checkbox  
                                                    onChange={(val) => setIsAgree(val.target.checked)}
                                                    checked={isAgree}
                                                >
                                                    I agree with Term & Conditions 
                                                </Checkbox>
                                            </div>
                                            <div className="mt-4">
                                                <Button loading={isLoading} type='primary' size='large' style={{width:'100%'}} onClick={()=>form.submit()}>Sign Up</Button>
                                            </div>
                                            <div className='mt-4 text-center'>
                                            <Space>
                                                <Text type='secondary'>Bạn không có tài khoản ?</Text>
                                                <Link href={'/auth/login'}>Đăng nhập ngay</Link>
                                            </Space>
                                            </div>
                                        </>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup