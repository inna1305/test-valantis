import {memo, ReactElement, useContext} from 'react';
import {Button, Flex} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Action} from '../App/contexts/itemsContext/reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';
import {IsLoadingContext, ReducerContext} from '../App/App.tsx';

const Pagination = memo((): ReactElement => {
    const {reducerValue, setReducerValue} = useContext(ReducerContext);
    const loaderContext = useContext(IsLoadingContext);
    const handleButton = (newPageNumber: number) => {
        loaderContext.setValue(true);
        const filter = reducerValue.filter;
        fetchData(newPageNumber, filter).then((items) => {
            setReducerValue({
                type: Action.setItems,
                items: items,
                nextButtonIsActive: items.length === PRODUCTS_PER_PAGE,
                currentPage: newPageNumber,
            });
        })
            .then(() => loaderContext.setValue(false));
    }

    const isNextDisabled = (): boolean => {
        //context.value.filter !== null - stub (there is no pagination on the server for filtered products)
        return !(reducerValue.nextButtonIsActive) || reducerValue.filter !== null || loaderContext.value;
    }

    const isPrevDisabled = (): boolean => {
        return reducerValue.currentPage === 1 || loaderContext.value;
    }

    const currentPage = reducerValue.currentPage;
    return (
        <Flex justify="center" gap="20px">
            <Button disabled={isPrevDisabled()} icon={<LeftOutlined/>}
                    onClick={() => handleButton(currentPage - 1)}></Button>
            <Button disabled={isNextDisabled()} icon={<RightOutlined/>}
                    onClick={() => handleButton(currentPage + 1)}></Button>
        </Flex>);
});
export default Pagination;
