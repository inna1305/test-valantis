import {Flex, Space} from 'antd';
import Product from '../Product.tsx';
import Pagination from '../Pagination.tsx';
import {ReactElement, useContext} from 'react';
import {getUniqueItems} from './helpers.tsx';
import {IItem} from '../../types.ts';
import {LoadingContext, ReducerContext} from '../../App/App.tsx';
import {Spinner} from '../Spinner.tsx';

const Products = (): ReactElement => {
    const {reducerValue} = useContext(ReducerContext);
    const {isLoading} = useContext(LoadingContext);
    let items: IItem[] = [];
    if (reducerValue.items.length > 0) {
        items = getUniqueItems(reducerValue.items);
    }

    if (items.length === 0 && !isLoading) {
        return (
            <>
                {reducerValue.filter?.value ? <h3>Поиск: {reducerValue.filter?.value}</h3> : null}
                <Space direction="vertical">
                    <p>Продукты не найдены</p>
                </Space>
            </>);
    }

    return (<>
        {reducerValue.filter?.value ? <h3>Поиск: {reducerValue.filter?.value}</h3> : null}
        {isLoading ? <Spinner/> :
            <>
                <Flex wrap="wrap" gap="20px" style={{marginBottom: '30px'}}>
                    {items.map(item => {
                        return (<Product
                            id={item.id}
                            brand={item.brand}
                            price={item.price}
                            name={item.product}
                            key={item.id}/>)
                    })}
                </Flex>
                <Pagination/>
            </>
        }
    </>)
}
export default Products;
