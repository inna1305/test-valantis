import {memo, ReactElement, useContext} from 'react';
import {Button, Flex} from 'antd';
import {FilterType} from '../../types.ts';
import SearchForm from './SearchForm.tsx';
import {ReducerContext} from '../../App/App.tsx';
import {Action} from '../../App/reducer.ts';

const Filters = memo(function (): ReactElement {
    const reducerContext = useContext(ReducerContext);

    const handleReset = () => {
            reducerContext!.setValue({type: Action.resetFilters});
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
