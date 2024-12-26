import handleAPI from '@/apis/handleApi';
import { CartItemModel, removeProduct } from '@/redux/reducers/cartReducer'
import { Button, Modal } from 'antd';
import { title } from 'process';
import React from 'react'
import { IoMdTrash } from 'react-icons/io';
import { useDispatch } from 'react-redux';

interface Props {
    item : CartItemModel
}

const ButtonRemoveCartItem = (props : Props) => {
    const {item} = props;
    const dispatch = useDispatch();

    const handleRemoveCartItem = async (item : any) => {
        const api = `/carts/remove?id=${item._id}`;
        try {
			await handleAPI({ url: api, data: undefined, method: 'delete' });

			dispatch(removeProduct(item));
		} catch (error) {
			console.log(error);
		}
    }
  return (
    <Button
        onClick={() =>
            Modal.confirm({
                title : 'Confirm',
                content : 'Are you sure to remove this item?',
                onOk : async () => {
                    await handleRemoveCartItem(item);
                },
            })
            
        }
        icon={<IoMdTrash size={20}/> }
        danger
        type= 'text'
    >

    </Button>
  )
}

export default ButtonRemoveCartItem
