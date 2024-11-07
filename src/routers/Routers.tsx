
import HeaderComponent from '@/components/HeaderComponent';
import { localDataNames } from '@/constants/appInfors';
import { addAuth, authSelector } from '@/redux/reducers/authReducer';
import { Layout, Spin } from 'antd'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const {Content, Footer, Header} = Layout

const Routers = ({ Component, pageProps }: any) => {

  const [isLoading , setIsLoading] = useState(false);

  const path = usePathname()

  const dispatch = useDispatch()

  const auth = useSelector(authSelector);

  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)))
  };



  const renderContent = (
    <Content>
      <Component pageProps={pageProps} />
    </Content>
)
  return isLoading ? (<Spin/> ): !auth || !auth.accesstoken
  ?   
    (
      <Layout className='bg-white'>
        {renderContent}
      </Layout> 
    ) : (
    <Layout className='bg-white'>
      <HeaderComponent/>
        <div>{renderContent}</div>
    </Layout>
  )
}

export default Routers