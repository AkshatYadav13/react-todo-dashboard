import { useState } from "react";

const TodosTable = ({ todos, editFn }) => {
  const [editContent, setEditContent] = useState({});

  const [showEditField, setShowEditField] = useState(null);

  function showEditFieldHandler(todoId) {
    setShowEditField((prev) => (prev === todoId ? null : todoId));
    setEditContent({});
  }

  function submitEditHandler(todoId) {
    if (!Object.keys(editContent).length) return;
    editFn(todoId, editContent);
    setShowEditField(null);
    setEditContent({});
  }

  return (
    <div className="table">
      <div className="header row">
        <strong>User Id</strong>
        <strong>Todo Id</strong>
        <strong>Title</strong>
        <strong>Completed</strong>
        <strong>Action</strong>
      </div>

      {todos.map((todo, idx) => {
        const showEdit = showEditField === todo.id;
        return (
          <div className="row" key={`${todo.id}_${idx}`}>
            <span>{todo.userId}</span>
            <span>{todo.id}</span>

            <div>
              {showEdit ? (
                <input
                  type="text"
                  className="input edit-inp "
                  value={editContent.title}
                  onChange={(e) =>
                    setEditContent((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              ) : (
                <span>{todo.title}</span>
              )}
            </div>

            <div>
              {showEdit ? (
                <input
                  type="text"
                  className="input edit-inp "
                  value={editContent.completed}
                  onChange={(e) =>
                    setEditContent((prev) => ({
                      ...prev,
                      completed: e.target.value,
                    }))
                  }
                />
              ) : (
                <span>{todo.completed ? "Yes" : "No"}</span>
              )}
            </div>
            <div className="action-field-wrap">
              <button onClick={() => showEditFieldHandler(todo.id)}>
                {showEdit ? "cancel" : "Edit"}
              </button>

              {showEdit && (
                <button onClick={() => submitEditHandler(todo.id)}>
                  submit
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodosTable;
