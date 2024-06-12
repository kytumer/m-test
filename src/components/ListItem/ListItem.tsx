import { Button, List } from 'antd'
import { FlagTwoTone, DeleteTwoTone } from '@ant-design/icons';
import React from 'react'
import { TTask } from '../../types/types';

interface TListItem {
    item: TTask
    finishTask: (id: number) => void
    deleteTask: (id: number) => void
}

const ListItem: React.FC<TListItem> = ({ item, finishTask, deleteTask }) => {

    const actionType = () => {
        if (item.status) {
            if (item.status === 'All' || item.status === 'Active') {
                return <Button
                    title='Complete'
                    aria-label={`complete ${item.name}`}
                    onClick={() => finishTask(item.id)}
                    shape='circle'
                    icon={<FlagTwoTone twoToneColor="#52c41a"
                    />} />
            } else {
                return <Button
                    title='Delete'
                    aria-label={`delete ${item.name}`}
                    onClick={() => deleteTask(item.id)}
                    shape='circle'
                    icon={<DeleteTwoTone twoToneColor="#eb2f96"
                    />} />
            }
        }
    }

    return (
        <>
            <List.Item actions={[actionType()]}>
                {item?.name ? item?.name : null}
            </List.Item>
        </>
    )
}

export default ListItem