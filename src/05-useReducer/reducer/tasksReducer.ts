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
  return {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  };
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
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.length + 1,
        pending: state.pending + 1,
      };
    }

    case 'TOGGLE_TODO': {
      let isCompleted = false;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            isCompleted = !todo.completed;
            return { ...todo, completed: isCompleted };
          }
          return todo;
        }),
        completed: isCompleted ? state.completed + 1 : state.completed - 1,
        pending: isCompleted ? state.pending - 1 : state.pending + 1,
      };
    }

    case 'REMOVE_TODO': {
      let isCompleted = false;
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          if (todo.id !== action.payload) {
            isCompleted = todo.completed;
            return todo;
          }
        }),
        length: state.length - 1,
        completed: isCompleted ? state.completed - 1 : state.completed,
        pending: !isCompleted ? state.pending - 1 : state.pending,
      };
    }

    default:
      return state;
  }
};
