import { useEffect, useState, useCallback } from "react";
import "./styles.css";
import TodosTable from "./components/TodosTable";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

const todo_per_page = 10;

export default function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const total_pages = Math.floor(todos.length / todo_per_page);
  const startIdx = todo_per_page * (currPage - 1);
  const endIdx = todo_per_page * currPage;

  useEffect(() => {
    function fetchTodos() {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => {
          setAllTodos(data);
          setTodos(data);
        })
        .catch((e) => {
          alert("something went wrong");
          console.log(e);
        })
        .finally(() => setLoading(false));
    }

    fetchTodos();
  }, []);

  const searchTodoHandler = useCallback(
    (text) => {
      const query = text.trim().toLowerCase();
      setCurrPage(1);
      if (!query) {
        setTodos(allTodos);
        return;
      }
      const filteredTodo = allTodos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodo);
    },
    [allTodos]
  );

  function editTodoHandler(todoId, content) {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, ...content };
        }
        return todo;
      });
    });
  }

  return (
    <div className="App">
      {loading ? (
        "loading..."
      ) : (
        <>
          <div className="navbar">
            <SearchBar searchFn={searchTodoHandler} />
          </div>

          {todos.length === 0 ? (
            <div>No result found...</div>
          ) : (
            <>
              <div className="table-wrap">
                <TodosTable
                  todos={todos.slice(startIdx, endIdx)}
                  editFn={editTodoHandler}
                />
              </div>

              <Pagination
                currPage={currPage}
                total_pages={total_pages}
                onChange={(pageNum) => setCurrPage(pageNum)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
