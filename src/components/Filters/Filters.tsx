import {memo, ReactElement, useContext} from 'react';
import {Button, Flex} from 'antd';
import {FilterType} from '../../types.ts';
import SearchForm from './SearchForm.tsx';
import {Action} from '../../App/contexts/itemsContext/reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../../functions/requests.ts';
import {IsLoadingContext, ReducerContext} from '../../App/App.tsx';

const Filters = memo(function (): ReactElement {
    const context = useContext(ReducerContext);
const loadingContext = useContext(IsLoadingContext);
    const handleReset = () => {
        loadingContext.setValue(true);
        fetchData(1, null).then((items) => {
            context.setValue({
                type: Action.setItems,
                items: items,
                nextButtonIsActive: items.length === PRODUCTS_PER_PAGE,
                currentPage: 1
            });
        })
            .then(() => loadingContext.setValue(false));
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
            <Button disabled={loadingContext.value} onClick={handleReset}
                    style={{
                        marginTop: '10%',
                        width: '100%'
                    }}>Сбросить текущий фильтр
            </Button>
        </Flex>);
});
export default Filters;
