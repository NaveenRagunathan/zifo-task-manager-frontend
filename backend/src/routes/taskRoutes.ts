import express from 'express';
import {
    createTask,
    deleteTask,
    getProgressChartData,
    getTask,
    getTaskPriorityStats,
    getTasks,
    getTaskStats,
    updateTask
} from '../controllers/taskController';

const router = express.Router();

// Task statistics routes
router.get('/stats', getTaskStats);
router.get('/priority-stats', getTaskPriorityStats);
router.get('/progress-chart', getProgressChartData);

// Task routes
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

export default router; 