import { useState } from "react"
import { useTodo } from "../Contexts";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authState";
function TodoForm(){
    const [todo , setTodo] = useState("");
    const {addTodo , todos} = useTodo();
    const authStateValue = useRecoilValue(authState);

    const add= async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({
                id:Date.now(),
                todo:todo,
                completed:false ,
            })
        });
        addTodo({todo, completed:false});
        setTodo("");
    };

    return(
        <>
        <h1>Welcome {authStateValue.username}</h1>
        <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
        </form>
        </>
    )
}

export default TodoForm