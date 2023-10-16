import Todo from './../models/todoModel';
import { Request, Response } from 'express';

export const getTaskView = async (req: Request, res: Response): Promise<void> => {
	try {
		//
		const todos = await Todo.find();
		res.render('./index', { todos });
	} catch (err) {
		console.log(err);
	}
};

export const createTodo = async (req: Request, res: Response) => {
	try {
		const todo = new Todo({
			todo: req.body.todoValue
		});
		await todo.save();
		res.redirect('/tasks');
	} catch (err) {
		console.log(err);
	}
};

export const deleteTodo = async (req: Request, res: Response) => {
	try {
		const deletedTodo = await Todo.findByIdAndDelete(req.params._id);

		if (!deletedTodo) {
			return res.status(404).json({
				status: 'fail',
				message: 'Todo not found'
			});
		}

		res.status(204).json({
			status: 'success',
			todo: deletedTodo
		});
	} catch (err) {
		console.log(err);
	}
};

export const changeStatus = async (req: Request, res: Response) => {
	try {
		const taskId = req.params._id;

		if (!taskId) {
			return res.status(400).json({ error: 'Invalid task ID' });
		}

		const todo = await Todo.findById(taskId);
		if (!todo) {
			return res.status(404).json({ error: 'Todo not found' });
		}

		// Меняем статус задачи на противоположный
		todo.status = todo.status === 'Todo' ? 'Complete' : 'Todo';

		await todo.save();
		console.log(
			`Задача с ID [${taskId}] успешно обновлена на статус: ${todo.status}`
		); // Добавляем логирование

		res.status(200).json({
			status: 'success',
			todo: {
				todo: todo.status
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to update task status' });
	}
};

export const changeTaskName = async (req: Request, res: Response) => {
	try {
		const todoId = req.params._id;
		const updatedTodoName = req.body.todo;

		const todo = await Todo.findByIdAndUpdate(
			todoId,
			{ todo: updatedTodoName },
			{
				new: true
			}
		);

		if (!todo) {
			return res.status(400).json({ error: 'No todo found with that ID' });
		}

		res.status(200).json({
			status: 'success',
			data: {
				todo: updatedTodoName
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Failed to update task name' });
	}
};
