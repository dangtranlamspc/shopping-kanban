import { CartItemModel } from '@/redux/reducers/cartReducer';
import React from 'react'

interface Props {
    visible : boolean;
    onClose : () => void;
    productSelected : CartItemModel;
}

const TransationSubProductModal = (props : Props) => {
    const {visible , onClose , productSelected} = props;
  return (
    <div>
      
    </div>
  )
}

export default TransationSubProductModal
