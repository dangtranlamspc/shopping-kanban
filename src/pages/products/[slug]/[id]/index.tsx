import HeadComponent from '@/components/HeadComponent';
import { appInfo } from '@/constants/appInfors';
import { ProductModel, SubProductModel } from '@/models/Products';
import React, {useEffect, useState} from 'react'
import {Breadcrumb, Button, Rate, Space, Tag, Typography} from "antd";
import Link from 'next/link';
import {VND} from "@/utils/handleCurrency";
import { PiCableCar } from 'react-icons/pi';
import CarouselImages from "@/components/CarouselImages";

const {Text, Title, Paragraph} = Typography

const ProductDetail = ({pageProps} : any) => {
  const {
		product,
		subProducts,
	} : {
		product: ProductModel;
		subProducts: SubProductModel[];
	} = pageProps.data.result.data;
  const [detail, setDetail] = useState<ProductModel>(product);
  const [subProductSelected, setSubProductSelected] = useState<SubProductModel>();

    useEffect(() => {
        if (subProducts.length > 0) {
            setSubProductSelected({
                ...subProducts[0],
                imgURL:
                    subProducts[0].images.length > 0 ? subProducts[0].images[0] : '',
            });
        }
    }, [subProducts]);
  return subProductSelected ?(
    <div>
      <HeadComponent title={detail.title} description={detail.description} url={`${appInfo.baseUrl}/products/${detail.slug}/${detail._id}`}/>
        <div className="container-fluid mt-3 mb-3">
            <div className="container">
                <Breadcrumb
                    items = {[
                        {
                            key : 'home',
                            title : <Link href={'/'}>Home</Link>,
                        },
                        {
                            key : 'shop',
                            title : <Link href={'/shop'}>Shop</Link>
                        },
                        {
                            key : 'title',
                            title :product.title,
                        }
                    ]}
                />

                <div className="row mt-3">
                    <div className="col-sm-12 col-md-6">
                        <div className="bg-light text-center p-4">
                            {!subProductSelected.imgURL &&
                            subProductSelected.images.length == 0 ? (
                                <PiCableCar size={48} className='text-muted' />
                            ) : (
                                <img
                                    style={{ width: '80%' }}
                                    src={
                                        subProductSelected.imgURL
                                            ? subProductSelected.imgURL
                                            : subProductSelected.images.length > 0
                                                ? subProductSelected.images[0]
                                                : ''
                                    }
                                />
                            )}
                        </div>
                        <CarouselImages
                            items={subProducts}
                            onClick={(val) => setSubProductSelected(val)}
                        />
                    </div>
                    <div className="col">
                        <div className='row'>
                            <div className='col'>
                                <Typography.Title level={2} className='m-0'>{detail.supplier}</Typography.Title>
                                <Typography.Title className='mt-0' style={{fontWeight : 300}} level={4}>{detail.title}</Typography.Title>
                            </div>
                            <div>
                                <Tag color={subProductSelected.qty > 0 ? 'success' : 'error'}>{subProductSelected.qty > 0 ? 'In Stock' : 'Out Stock'}</Tag>
                            </div>
                        </div>
                        <Space>
                            <Rate count={5}/>
                            <Text type='secondary'>(5.0)</Text>
                            <Text type='secondary'>(1232)</Text>
                        </Space>
                        {/*<Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)}></Checkbox>*/}
                        <div className='mt-3'>
                            <Space>
                                <Title
                                    className='mt-0 '
                                    style={{fontWeight: 400, textDecoration: ''}}
                                    level={3}>
                                    {VND.format(
                                        subProductSelected.discount ?? subProductSelected.price
                                    )}
                                </Title>
                                {subProductSelected.discount && (
                                    <Title
                                        type={'secondary'}
                                        className='mt-0'
                                        style={{
                                            fontWeight: 300,
                                            textDecoration: 'line-through',
                                        }}
                                        level={3}
                                    >
                                        {VND.format(subProductSelected.price)}
                                    </Title>
                                )}
                            </Space>
                            <div className='mt-3'>
                                <Paragraph style={{fontSize: '1rem'}}>
                                    {detail.description}
                                </Paragraph>
                            </div>
                            <div className='mt-3'>
                                <Paragraph style={{fontSize: '1.1rem', fontWeight: 'bold', marginBottom: 8}}>
                                    Color
                                </Paragraph>
                                <Space>
                                    {subProducts.length > 0 &&
                                        subProducts.map((item, index) => (
                                            <a
                                                key={`${item.color}-${index}`}
                                                onClick={() => setSubProductSelected(item)}>
                                                <div className='color-item' style={{background: item.color}}/>
                                            </a>
                                        ))}
                                </Space>
                            </div>
                            <div className='mt-3'>
                                <Paragraph style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 8}}>
                                    Sizes
                                </Paragraph>
                                <Space>
                                    {subProducts.length > 0 &&
                                        subProducts.map((item) => (
                                            <Button
                                                key={item.size}
                                                type={
                                                    subProductSelected.size === item.size
                                                        ? 'primary'
                                                        : 'default'
                                                }
                                                onClick={() => setSubProductSelected(item)}
                                            >
                                                {item.size}
                                            </Button>
                                        ))}
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  ) : (
      <></>
  );
}

export const getStaticProps = async (context: any) => {
  const res = await fetch(
		`${appInfo.baseUrl}/products/detail?id=${context.params.id}`
	);
  const result = await res.json();
  try {
    return {
      props : {
        data : {result},
      }
    }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export default ProductDetail
