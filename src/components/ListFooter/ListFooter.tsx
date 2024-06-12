import React, { Dispatch, SetStateAction } from 'react'
import { Flex, Segmented } from 'antd'
import { TTab } from '../../types/types'

interface TListFooter {
    tab: string
    setTab: Dispatch<SetStateAction<TTab>>
}

const ListFooter: React.FC<TListFooter> = ({ tab, setTab }) => {

    return (
        <Flex justify='center'>
            <Segmented
                style={{width: '100%'}}
                size='large'
                block
                options={['All', 'Active', 'Completed']}
                value={tab}
                onChange={(value) => {
                    setTab(value as TTab);
                }}
            />
        </Flex>
    )
}

export default ListFooter