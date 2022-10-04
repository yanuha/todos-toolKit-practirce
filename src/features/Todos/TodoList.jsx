import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  selectVisibleTodos,
  selectActiveFilters,
} from '../Filters/filter-slice';
import { toggleTodo, removeTodo, loadTodos } from './todo-slices';

export const TodoList = () => {
  const activeFilter = useSelector(selectActiveFilters);
  const todos = useSelector((state) => selectVisibleTodos(state, activeFilter));
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(loadTodos())
      .unwrap()
      .then(() => {
        toast('All todos were loaded');
      })
      .catch(() => {
        toast('Error!');
      });
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <ul>
        {error && <h3>Error!</h3>}
        {loading === 'loading' && <h4>Loading...</h4>}
        {!error &&
          loading === 'idle' &&
          todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />{' '}
              {todo.title}{' '}
              <button onClick={() => dispatch(removeTodo(todo.id))}>
                delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};
