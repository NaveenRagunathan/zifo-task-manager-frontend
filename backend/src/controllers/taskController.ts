import { Request, Response } from 'express';
import { Task } from '../models/Task';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Filter tasks by status or priority if provided
    const filter: any = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    
    // Get tasks
    const tasks = await Task.find(filter).sort({ created_at: -1 });
    
    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: tasks
    });
  } catch (error: any) {
    console.error('Error in getTasks:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error fetching tasks'
    });
  }
};

// @desc    Delete all tasks
// @route   DELETE /api/tasks/clear
// @access  Public
export const deleteAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    await Task.deleteMany({});
    
    res.status(200).json({
      status: 'success',
      message: 'All tasks deleted successfully'
    });
  } catch (error: any) {
    console.error('Error in deleteAllTasks:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error deleting all tasks'
    });
  }
};

// @desc    Get task statistics by status
// @route   GET /api/tasks/stats
// @access  Public
export const getTaskStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const notStartedCount = await Task.countDocuments({ status: 'not-started' });
    const inProgressCount = await Task.countDocuments({ status: 'in-progress' });
    const completedCount = await Task.countDocuments({ status: 'completed' });
    
    const totalCount = notStartedCount + inProgressCount + completedCount;
    
    const stats = {
      'not-started': notStartedCount,
      'in-progress': inProgressCount,
      'completed': completedCount,
      total: totalCount
    };
    
    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (error: any) {
    console.error('Error in getTaskStats:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error getting task statistics'
    });
  }
};

// @desc    Get task statistics by priority
// @route   GET /api/tasks/priority-stats
// @access  Public
export const getTaskPriorityStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const urgentCount = await Task.countDocuments({ priority: 'urgent' });
    const highCount = await Task.countDocuments({ priority: 'high' });
    const normalCount = await Task.countDocuments({ priority: 'normal' });
    const lowCount = await Task.countDocuments({ priority: 'low' });
    
    const totalCount = urgentCount + highCount + normalCount + lowCount;
    
    const stats = {
      urgent: urgentCount,
      high: highCount,
      normal: normalCount,
      low: lowCount,
      total: totalCount
    };
    
    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (error: any) {
    console.error('Error in getTaskPriorityStats:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error getting task priority statistics'
    });
  }
};

// @desc    Get a single task
// @route   GET /api/tasks/:id
// @access  Public
export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: task
    });
  } catch (error: any) {
    console.error('Error in getTask:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error fetching single task'
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    // Log the incoming request for debugging
    console.log('Create task request body:', req.body);
    
    // Set default values for required fields if not provided
    const taskData = {
      ...req.body,
      user_id: req.body.user_id || '00000000-0000-0000-0000-000000000000',
      estimated_minutes: req.body.estimated_minutes || 30,
      status: req.body.status || 'not-started',
      priority: req.body.priority || 'normal'
    };
    
    // Create task
    const task = await Task.create(taskData);
    
    if (!task.id) {
      console.error("Task ID is undefined", task);
      // Handle the error appropriately, such as logging or throwing an error
    }
    
    // Return the created task
    res.status(201).json({
      status: 'success',
      data: task
    });
  } catch (error: any) {
    console.error('Error in createTask:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Error creating task'
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!task) {
      res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: task
    });
  } catch (error: any) {
    console.error('Error in updateTask:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Error updating task'
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error: any) {
    console.error('Error in deleteTask:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error deleting task'
    });
  }
};

// @desc    Get progress chart data
// @route   GET /api/tasks/progress-chart
// @access  Public
export const getProgressChartData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get week data for the last 8 weeks
    const weeks = 8;
    const weekData = [];
    
    // Generate sample data for hours worked
    // In a real implementation, you would query the database for actual hours worked each week
    for (let i = 0; i < weeks; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      const weekNumber = weeks - i;
      
      // Random hours between 30-45 hours per week
      const hours = Math.floor(Math.random() * 15) + 30;
      
      weekData.push({
        name: `Week ${weekNumber}`,
        hours
      });
    }
    
    // Sort by week number
    weekData.reverse();
    
    res.status(200).json({
      status: 'success',
      data: weekData
    });
  } catch (error: any) {
    console.error('Error in getProgressChartData:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error getting progress chart data'
    });
  }
}; 