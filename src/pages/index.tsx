import handleAPI from '@/apis/handleApi';
import { CategoyModel } from '@/models/Products';
import { PromotionModel } from '@/models/PromotionModel';
import React, { useState } from 'react'

const Home = () => {
  const [promotions, setPromotions] = useState<PromotionModel[]>([]);
  const [categories, setCategories] = useState<CategoyModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDatas = async () => {
		setIsLoading(true);
		try {
			await getPromotions();
			await getCategories();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

  const getPromotions = async () => {
    const res = await handleAPI({ url: `/promotions?limit=5` });

		res && res.data && res.data && setPromotions(res.data);
  }

  const getCategories = async () => {
    const res = await handleAPI({ url: `/products/get-categories` });
		res && res.data && res.data && setCategories(res.data);
  }

  return (
    <div className="row">
      <div className="col">
        <h1 className='title-danger'>Hello World</h1>
      </div>
    </div>
  )
}

export default Home