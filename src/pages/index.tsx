import handleAPI from '@/apis/handleApi';
import { appInfo } from '@/constants/appInfors';
import { CategoyModel, ProductModel } from '@/models/Products';
import { PromotionModel } from '@/models/PromotionModel';
import { Skeleton } from 'antd';
import React, { useEffect,useState } from 'react'
import HomePage from './HomePage';

const Home = (data : any) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageProps = data.pageProps;
  const [bestSellers, setBestSellers] = useState<ProductModel[]>([]);
  const [promotions, setPromotions] = useState<PromotionModel[]>([]);
  const [categories, setCategories] = useState<CategoyModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getDatas();
  },[])

  const getDatas = async () => {
		setIsLoading(true);
		try {
			await getPromotions();
			await getCategories();
			await getBestSeller();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getBestSeller = async () => {
		const res = await handleAPI({url : `/products/get-best-seller`})

		res && res.data && setBestSellers(res.data);
	}

  	const getPromotions = async () => {
		const res = await handleAPI({ url: `/promotion?limit=5` });

		res && res.data && setPromotions(res.data);
	};

	const getCategories = async () => {
		const res = await handleAPI({ url: `/products/get-categories` });
		res && res.data && setCategories(res.data);
	};

  	return isLoading ? (
		<Skeleton />
	) : (
		<HomePage
			bestSellers={bestSellers}
			promotions={promotions}
			categories={categories}
		/>
	);
}

export default Home

export const getStaticProps = async () => {
	try {
		const res = await fetch(`${appInfo.baseUrl}/promotion?limit=5`);
		const result = await res.json();

		const resCats = await fetch(`${appInfo.baseUrl}/products/get-categories`);
		const resultCats = await resCats.json();

		const resBestSeller = await fetch(
			`${appInfo.baseUrl}/products/get-best-seller`
		);
		const resultsSeller = await resBestSeller.json();

		return {
			props: {
				promotions: result.data,
				categories: resultCats.data,
				bestSellers: resultsSeller.data,
			},
		};
	} catch (error) {
		return {
			props: {
				data: [],
			},
		};
	}
};
