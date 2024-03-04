import {memo, ReactElement, useContext, useState} from 'react';
import {Button, Flex} from 'antd';
import {FilterType} from '../../types.ts';
import SearchForm from './SearchForm.tsx';
import {ReducerContext} from '../../App/App.tsx';
import {Action} from '../../App/reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../../functions/requests.ts';

const Filters = memo(function (): ReactElement {
    const context = useContext(ReducerContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = () => {
        setIsLoading(true);
        fetchData(1, null).then((items) => {
            context.setValue({
                type: Action.setItems,
                items: items,
                nextButtonIsActive: items.length === PRODUCTS_PER_PAGE,
                currentPage: 1
            });
        })
            .then(() => setIsLoading(false));
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
            <Button disabled={isLoading} onClick={handleReset}
                    style={{
                        marginTop: '10%',
                        width: '100%'
                    }}>Сбросить текущий фильтр
            </Button>
        </Flex>);
});
export default Filters;
