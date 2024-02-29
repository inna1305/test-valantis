import {memo, ReactElement, useContext} from 'react';
import {Button, Flex} from 'antd';
import {FilterType} from '../../types.ts';
import SearchForm from './SearchForm.tsx';
import {FilterContext} from '../../App/App.tsx';

const Filters = memo(function (): ReactElement {
    const filtersContext = useContext(FilterContext);

    const handleReset = () => {
        if (filtersContext && filtersContext.value) {
            filtersContext.setValue(null);
        }
    }

    return (
        <Flex vertical
              align="center"
              gap="middle"
              style={{margin: '50px'}}>
            <SearchForm>
                <SearchForm.Name
                    title="Наименование"
                    type={FilterType.product}
                />
                <SearchForm.Price
                    title="Цена"
                    type={FilterType.price}
                />
                <SearchForm.Brand
                    title="Бренд"
                    type={FilterType.brand}
                />
            </SearchForm>
            <Button onClick={handleReset}
                    style={{
                        marginTop: '10%',
                        width: '100%'
                    }}>Сбросить фильтр
            </Button>
        </Flex>);
});
export default Filters;
