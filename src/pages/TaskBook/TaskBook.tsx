import React, { useEffect, useState } from 'react'
import { CenteredContainer, ListContainer } from './TaskBook.styles'
import { List } from "antd";
import ListHeader from '../../components/ListHeader/ListHeader';
import ListFooter from '../../components/ListFooter/ListFooter';
import { TSelectedTasks, TTab, TTask } from '../../types/types';
import ListItem from '../../components/ListItem/ListItem';

const TaskBook: React.FC = () => {

    const [tasks, setTasks] = useState<TTask[] | []>([])
    const [tab, setTab] = useState<TTab>('All')
    const [taskName, setTaskName] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const selectedTasks: TSelectedTasks = {
        'All': tasks,
        'Active': tasks.filter(el => el.status !== 'Completed'),
        'Completed': tasks.filter(el => el.status === 'Completed')
    }

    const actionTasks = (tasks: TTask[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        setTasks(tasks)
    }

    const addTask = () => {
        let localTasks = [...tasks, { id: (tasks.length + 1), name: taskName, status: 'Active' }]
        actionTasks(localTasks)
        setTaskName('')
    }

    const finishTask = (id: number) => {
        let localTasks = tasks.map((element: TTask) => {
            if (element.id === id) {
                return { ...element, status: 'Completed' }
            }
            return element
        })
        actionTasks(localTasks)
    }

    const deleteTask = (id: number) => {
        let localTasks = tasks.filter((el: TTask) => el.id !== id)
        actionTasks(localTasks)
    }

    useEffect(() => {
        if (tasks.length === 0) {
            let localTasks = localStorage.getItem('tasks')
            if (localTasks) {
                setTasks(JSON.parse(localTasks))
            }
        }
        setPage(1)
    }, [tab])

    return (
        <CenteredContainer>
            <ListContainer>
                <List
                    size="small"
                    header={<ListHeader
                        taskName={taskName}
                        setTaskName={setTaskName}
                        addTask={addTask}
                        tab={tab} />}
                    footer={<ListFooter
                        tab={tab}
                        setTab={setTab} />}
                    bordered
                    dataSource={selectedTasks[tab]}
                    renderItem={(item: TTask) => (<ListItem
                        finishTask={finishTask}
                        deleteTask={deleteTask}
                        item={item} />)}
                    pagination={{
                        position: 'bottom',
                        align: 'center',
                        pageSize: 5,
                        current: page,
                        onChange: (page) => {
                            setPage(page)
                        }
                    }}
                />
            </ListContainer>
        </CenteredContainer>
    )
}

export default TaskBook