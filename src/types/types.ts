export interface TTask {
    id: number;
    name: string;
    status: string;
}

export type TSelectedTasks = {
    [key in TTab]: TTask[] | [];
};

export type TTab = 'All' | 'Active' | 'Completed'