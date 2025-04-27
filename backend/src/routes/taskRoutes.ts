import express from 'express';
import {
    createTask,
    deleteAllTasks,
    deleteTask,
    getProgressChartData,
    getTask,
    getTaskPriorityStats,
    getTasks,
    getTaskStats,
    updateTask
} from '../controllers/taskController';

const router = express.Router();

router.route('/clear').delete(deleteAllTasks);
router.route('/stats').get(getTaskStats);
router.route('/priority-stats').get(getTaskPriorityStats);
router.route('/progress-chart').get(getProgressChartData);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router; 