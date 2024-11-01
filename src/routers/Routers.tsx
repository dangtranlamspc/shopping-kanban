
import HeaderComponent from '@/components/HeaderComponent';
import { localDataNames } from '@/constants/appInfors';
import { addAuth } from '@/redux/reducers/authReducer';
import { Layout, Spin } from 'antd'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const {Content, Footer, Header} = Layout

const Routers = ({ Component, pageProps }: any) => {

  const [isLoading , setIsLoading] = useState(false);

  const path = usePathname()

  const dispatch = useDispatch()

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
  return isLoading ? <Spin/> : path && path.includes('auth')
  ? 
    (
      <Layout className='bg-white'>
        {renderContent}
      </Layout> 
    ) : (
    <Layout className='bg-white'>
      <HeaderComponent/>
        {renderContent}
      <Footer/>
    </Layout>
  )
}

export default Routers