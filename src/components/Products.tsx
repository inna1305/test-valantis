import {Flex} from 'antd';
import Product from './Product.tsx';
import Pagination from './Pagination.tsx';
import {ReactElement, useContext} from 'react';
import {ReducerContext} from '../App/App.tsx';

const Products = (): ReactElement => {
    const reducerContext = useContext(ReducerContext);

    return (<>
        <Flex wrap="wrap" gap="20px" style={{marginBottom: '30px'}}>
            {reducerContext?.value.items.map(item => {
                return (<Product
                    id={item.id}
                    brand={item.brand}
                    price={item.price}
                    name={item.product}
                    key={item.id}/>)
            })}
        </Flex>
        <Pagination/>
    </>)
}
export default Products;
