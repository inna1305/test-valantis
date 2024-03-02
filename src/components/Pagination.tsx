import {memo, ReactElement, useContext, useState} from 'react';
import {Button, Flex} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {ReducerContext} from '../App/App.tsx';
import {Action} from '../App/reducer.ts';
import {fetchData, PRODUCTS_PER_PAGE} from '../functions/requests.ts';

const Pagination = memo((): ReactElement => {
    const context = useContext(ReducerContext);
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonPrev = () => {
        // if (currentPage && currentPage > 1) {
        //     reducerContext?.setValue({type: Action.stepBack, items: []})
        // }
    }

    const isNextDisabled = (): boolean => {
        return context!.value.items.length <= PRODUCTS_PER_PAGE || isLoading;
    }

    const handleButtonNext = () => {
        setIsLoading(true);
        const newPageValue = context!.value.currentPage + 1;
        fetchData(newPageValue).then((items) => {
            context!.setValue({
                type: Action.setItems,
                items: items,
                nextButtonIsActive: items.length === 51,
                currentPage: newPageValue,
            });
        })
            .then(() => setIsLoading(false));

        // const data = getFakeData(currentPageValue, 51);
        // context?.setValue({
        //     type: Action.setItems,
        //     items: data,
        //     nextButtonIsActive: data.length === 51,
        //     currentPage: currentPageValue
        // });
    }

    return (
        <Flex justify="center" gap="20px">
            <Button disabled={context?.value.currentPage === 1} icon={<LeftOutlined/>}
                    onClick={handleButtonPrev}></Button>
            <Button disabled={isNextDisabled()} icon={<RightOutlined/>} onClick={handleButtonNext}></Button>
        </Flex>);
});
export default Pagination;
