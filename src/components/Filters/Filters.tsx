import {memo, ReactElement} from 'react';
import {Flex} from 'antd';
import {FilterType} from '../../types.ts';
import SearchForm from './SearchForm.tsx';

const Filters = memo(function (): ReactElement {
    return (
        <Flex vertical
              align="center"
              gap="middle"
              style={{margin: '50px'}}>
            <SearchForm>
                <SearchForm.Name
                    title='Наименование'
                    type={FilterType.product}
                />
                <SearchForm.Price
                    title='Цена'
                    type={FilterType.price}
                />
                <SearchForm.Brand
                    title='Бренд'
                    type={FilterType.brand}
                />
            </SearchForm>
        </Flex>);
});
export default Filters;
