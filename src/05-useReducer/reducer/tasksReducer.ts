interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number };

export const getTaskInitialState = (): TaskState => {
  const previousState = localStorage.getItem('tasks-state');

  if (!previousState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }
  return JSON.parse(previousState);
};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TODO': {
      if (action.payload.trim().length < 2) return state;
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };
      const updatedTodos = [...state.todos, newTodo];
      return {
        ...state,
        todos: updatedTodos,
        length: updatedTodos.length,
        completed: updatedTodos.filter((t) => t.completed).length,
        pending: updatedTodos.filter((t) => t.completed).length,
      };
    }

    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((t) => t.completed).length,
        pending: updatedTodos.filter((t) => !t.completed).length,
      };
    }

    case 'REMOVE_TODO': {
      const updatedTodos = state.todos.filter((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
      });
      return {
        ...state,
        todos: updatedTodos,
        length: state.length - 1,
        completed: updatedTodos.filter((t) => t.completed).length,
        pending: updatedTodos.filter((t) => !t.completed).length,
      };
    }

    default:
      return state;
  }
};
