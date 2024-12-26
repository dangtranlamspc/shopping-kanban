
import handleAPI from '@/apis/handleApi';
import HeaderComponent from '@/components/HeaderComponent';
import { localDataNames } from '@/constants/appInfors';
import { addAuth, authSelector } from '@/redux/reducers/authReducer';
import { syncProducts } from '@/redux/reducers/cartReducer';
import { Layout, Spin } from 'antd'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const {Content, Footer, Header} = Layout

const Routers = ({ Component, pageProps }: any) => {

  const [isLoading , setIsLoading] = useState(false);

  const path = usePathname()

  const dispatch = useDispatch()

  const auth = useSelector(authSelector)

  const router = useRouter()

  useEffect(()=>{
    getData()
  },[]);

  useEffect(() => {
		getDatabaseDatas();
	}, [auth]);

	useEffect(() => {
		if (auth.accesstoken && path.includes('/auth')) {
			router.push('/');
		}
	}, [auth, path]);

  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)))
  };

  const getDatabaseDatas = async () => {
    setIsLoading(true)
    try {
      if (auth._id){
        await getDatabaseDatas()
      }
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  }

  const getCardInDatabase = async () => {
    const api = `/carts`;
    try {
      const res = await handleAPI({url : api})
      if (res.data && res.data.length > 0) {
        dispatch(syncProducts(res.data))
      }
    } catch (error) {
      
    }
  }

  const renderContent = (
    <Content>
      <Component pageProps={pageProps} />
    </Content>
)
return isLoading ? (
  <Spin />
) : path.includes('/auth') ? (
  <Layout className='bg-white'>
    <Component pageProps={pageProps} />
  </Layout>
) : (
  <Layout className='bg-white'>
    <HeaderComponent />
    <Component pageProps={pageProps} />
  </Layout>
);
}

export default Routers