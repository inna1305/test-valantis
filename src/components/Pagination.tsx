import {memo, ReactElement, useContext} from 'react';
import {Button, Flex} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {ReducerContext} from '../App/App.tsx';
import {Action} from '../App/reducer.ts';
import {PRODUCTS_PER_PAGE} from '../functions/requests.ts';

const Pagination = memo ((): ReactElement =>  {
    const reducerContext = useContext(ReducerContext);
    const currentPage = reducerContext?.value.currentPage;
    const handleButtonPrev = () => {
        if (currentPage && currentPage > 1) {
            reducerContext?.setValue({type: Action.stepBack, items: []})
        }
    }
    const handleButtonNext = () => {
        reducerContext?.setValue({type: Action.stepBack, items: []});
    }

    return (<Flex justify="center" gap="20px">
        <Button disabled={reducerContext.value.currentPage === 1} icon={<LeftOutlined/>} onClick={handleButtonPrev}></Button>
        <Button disabled={reducerContext.value.items.length <= PRODUCTS_PER_PAGE} icon={<RightOutlined/>} onClick={handleButtonNext}></Button>
    </Flex>);
});
export default Pagination;
