import { ReviewModel } from '@/models/ReviewModel';
import { UploadFile } from 'antd';
import React, { useState } from 'react'

interface Props {
    productId : string;
}

const Reviews = (props : Props) => {
    const {productId} = props;
    const [startScore, setStartScore] = useState(0);
    const [coment, setComent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isGettting, setIsGetting] = useState(false);
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
  return (
    <div>
      
    </div>
  )
}

export default Reviews
