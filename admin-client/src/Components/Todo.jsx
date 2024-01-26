import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { TodoProvider } from "../Contexts";
import { useState , useEffect} from "react";
import { authState} from "../store/authState";
import { useRecoilValue } from "recoil";
import { useTodo } from "../Contexts";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Todo(){ 
    const [todos , setTodos] = useState([]);
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();
    

    const addTodo = (todo)=>{
        setTodos((prev)=>[{id:Date.now() , ...todo} ,...prev]);
    }

    const updateTodo = async(id,todo)=>{      
            const response = await fetch('http://localhost:3000/todo/updateTodo',{
                method:'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
                body:JSON.stringify({
                    todoId:id ,
                    newTodo:{
                        id:id,
                        todo:todo,
                        completed:false 
                    }
                })
            })
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
    }

    const toggleComplete = (id) => {
        
        setTodos((prev) => 
        prev.map((prevTodo) => 
        prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
    }

    const deleteTodo = async (id)=>{
        const response = await fetch('http://localhost:3000/todo/deleteTodo',{
                method:'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
                body:JSON.stringify({
                    todoId:id ,
                })
        })
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }
      
    
    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            // Todo: Create a type for the response that you get back from the server
            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authStateValue.token]);
    
     

    return (

        <TodoProvider value={{todos , addTodo , updateTodo , deleteTodo , toggleComplete}}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <button className="bg-blue-500 text-white px-2 sm:px-6 py-3 rounded mt-10" onClick={
                            ()=>{
                                localStorage.removeItem("token");
                                navigate('/signin')
                            }
                        }>Log Out</button>
                    </div>
                    
                </div>
            </div>

        </TodoProvider>
   
    )
}

export default Todo ;