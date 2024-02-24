import {ReactElement} from 'react';
import {Card, Flex, Form, Input, Slider, Typography} from 'antd';

const {Search} = Input;

interface IFilterFormProps {

}

const FilterForm = (props: IFilterFormProps): ReactElement => {
    return (
        <Flex vertical
              align="center"
              gap="middle"
              style={{margin: '50px'}}>
            <h2 style={{alignSelf: 'start', marginBottom: '5px'}}>Фильтрация</h2>
            <Form>
                <Card>
                    <Search
                        placeholder="Поиск..."
                        //onSearch={onSearch}
                        style={{
                            borderColor: 'black',
                            width: 250,
                        }}
                    />
                    <Typography.Title level={5}>Цена</Typography.Title>
                    <Slider
                        defaultValue={30}
                        tooltip={{
                            placement: 'bottom',
                            open: true,
                        }}
                    />
                </Card>
            </Form>
        </Flex>);
}
export default FilterForm;
