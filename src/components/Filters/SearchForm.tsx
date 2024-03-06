import {Button, Flex, Form, Input, Typography} from 'antd';
import React, {ReactNode, useContext, useState} from 'react';
import {FilterType} from '../../types.ts';
import {getDataForRequest, validateData} from './helpers.ts';
import {fetchData} from '../../functions/requests.ts';
import {Action} from '../../App/contexts/itemsContext/reducer.ts';
import {SearchOutlined} from '@ant-design/icons';
import {IsLoadingContext, ReducerContext} from '../../App/App.tsx';

interface SearchFormProps {
    children: ReactNode
}

interface InputProps {
    title: string;
    type: FilterType;
}

const SearchInput: React.FC<InputProps> = ({title, type}) => {
        const [error, setError] = useState('');
        const context = useContext(ReducerContext);
        const loadingContext = useContext(IsLoadingContext);
        const [form] = Form.useForm();


        const handleSubmit = () => {
            const value = form.getFieldValue(type);

            const errorValue = validateData(type, value);
            if (errorValue.length > 0) {
                setError(errorValue);
                return;
            }
            loadingContext.setValue(true);

            const filterValue = getDataForRequest(type, value);
            fetchData(1, filterValue).then((items) => {
                context.setValue({
                    filter: filterValue,
                    type: Action.setItemsByFilter,
                    items: items,
                    nextButtonIsActive: false,
                    currentPage: 1
                });
            }).then(() => {
                form.resetFields();
                setError('');
                loadingContext.setValue(false);
            });
        }

        return (
            <div>
                <Typography.Title level={5}>{title}</Typography.Title>
                <Form form={form} onFinish={handleSubmit} style={{position: 'relative'}}>
                    <Flex>
                        <Form.Item name={type} style={{margin: 0, width: 250}}>
                            <Input allowClear style={{margin: 0}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button icon={<SearchOutlined/>} htmlType="submit" disabled={loadingContext.value}/>
                        </Form.Item>
                    </Flex>
                    {error && <p style={{color: 'red', position: 'absolute', top: '33px'}}>{error}</p>}
                </Form>
            </div>
        );
    }
;

const SearchForm: React.FC<SearchFormProps> & { Price: React.FC<InputProps> }
    & { Brand: React.FC<InputProps> }
    & { Name: React.FC<InputProps> } = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

SearchForm.Price = SearchInput;
SearchForm.Brand = SearchInput;
SearchForm.Name = SearchInput;

export default SearchForm;
