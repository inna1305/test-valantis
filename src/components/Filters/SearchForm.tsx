import {Typography} from 'antd';
import React, {ReactNode, useContext, useState} from 'react';
import Search from 'antd/lib/input/Search';
import {FilterType} from '../../types.ts';
import {getDataForRequest, validateData} from './helpers.ts';
import {ReducerContext} from '../../App/App.tsx';
import {fetchData} from '../../functions/requests.ts';
import {Action} from '../../App/reducer.ts';

interface SearchFormProps {
    children: ReactNode
}

interface InputProps {
    title: string;
    type: FilterType;
}

const Input: React.FC<InputProps> = ({title, type}) => {
        const [error, setError] = useState('');
        const context = useContext(ReducerContext);

        const handleSubmit = (value: string) => {
            const errorValue = validateData(type, value);
            setError(errorValue);

            const filterValue = getDataForRequest(type, value);

            fetchData(1, filterValue).then((items) => {
                context.setValue({
                    filter: filterValue,
                    type: Action.setItemsByFilter,
                    items: items,
                    nextButtonIsActive: false,
                    currentPage: 1
                });
            })
        }

        return (
            <div>
                <Typography.Title level={5} style={{margin: '30px 0 12px'}}>{title}</Typography.Title>
                <Search
                    onSearch={(value) => {
                        handleSubmit(value);
                    }
                    }
                    style={{
                        borderColor: 'black',
                        width: 250,
                    }}
                />
                {error && <p style={{color: 'red'}}>{error}</p>}
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

SearchForm.Price = Input;
SearchForm.Brand = Input;
SearchForm.Name = Input;

export default SearchForm;
