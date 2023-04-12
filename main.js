let clicked = false;
let undoBtn;
window.addEventListener('load', () => {
    const form = document.querySelector('#form');
    const formInput = document.querySelector('#form-input');    
    const appendTo = document.querySelector('#todos');
    let count = 0;
    
    

    //create container for history

    form.addEventListener('submit', (event) => {
        event.preventDefault();                     //prevents whole page from reloading when form submited!
        //document.querySelector(".history").style.overflowY = "scroll";

        const todo = formInput.value;

        if (!todo) {
            alert("Cannot create a task without text");
            return;
        } 
        //DECLARING+CREATING ALL ELEMENTS!
        const todo_element = document.createElement("div");
        const todo_content_element = document.createElement("div");
        const todo_input_element = document.createElement("input");
        const todo_action_element = document.createElement("div");
        const todo_organize_element = document.createElement("div");
        const todo_up_element = document.createElement("button");
        const todo_down_element = document.createElement("button");
        const todo_edit_element = document.createElement("button");
        const todo_delete_element = document.createElement("button");
        createTask();
        todo_input_element.value = todo;
        appendTo.appendChild(todo_element);                  

        formInput.value = "";




            // ############ EDIT BUTTON ############ //
        todo_edit_element.addEventListener('click', () => {
            if(todo_edit_element.innerText.toLowerCase() == "edit"){
                todo_input_element.removeAttribute("readonly");
                todo_input_element.focus();
                todo_edit_element.innerText = "Save";
            } else {
                todo_input_element.setAttribute("readonly", "readonly");
                todo_edit_element.innerText = "Edit";
            }
        });

            // ############ DELETE BUTTON ############ //
        todo_delete_element.addEventListener('click', () => {
            
            createHistoryElement();
            let histInput = document.querySelectorAll(".hisText");
            histInput[count].value = todo_input_element.value;
            appendTo.removeChild(todo_element);
            count++;
            clicked = true;
            histScrollToggle(count);
            // ############ UNDO BUTTON ############ //
            history_undo.addEventListener('click', () => {
                //Kalla createTask() här så att objektet återskapas, MEN
                //console.log("hehee");
                createTask();
                todo_input_element.value = history_input.value;
                appendTo.appendChild(todo_element);
                // value för texten ska vara det som är i history_input.value
                histSection.removeChild(history_element);
                count--;
                histScrollToggle(count);
            });
            history_delete.addEventListener('click', () => {
                const wantToRemove = confirm("Are you sure you want to remove this task?");
                if(wantToRemove){
                    histSection.removeChild(history_element);
                    count--;
                    histScrollToggle(count);
                }
            });
        });
        let histScrollToggle = (c) => {
            if (c > 11){
                document.querySelector(".history").style.overflowY = "scroll";
            } else {
                document.querySelector(".history").style.overflowY = "hidden";
            }
        }


            // ############ CREATING HISTORY ELEMENTS ############ //
        let history_element;
        let history_input;
        let history_delete;
        let history_undo;
        let histSection;
        let createHistoryElement = () => {
            history_element = document.createElement("div");
            history_element.classList.add("todo-history");

            history_input = document.createElement("input");
            history_input.classList.add("hisText");
            history_input.setAttribute("readonly", "readonly");

            history_element.appendChild(history_input);
    
            history_delete = document.createElement("button");
            history_delete.innerText = "PermaDel";
            history_delete.classList.add("permDel");
            history_element.appendChild(history_delete);
    
            history_undo = document.createElement("button");
            history_undo.innerText = "UNDO";
            history_undo.classList.add("undo");
            //history_undo.setAttribute('onClick', "document.getElementById('new-task-form').click()");
            history_element.appendChild(history_undo);

            histSection = document.querySelector(".history");
            histSection.appendChild(history_element);
    
        };
    

        



            // ############ ARROWS UP AND DOWN ############ //
        todo_down_element.addEventListener('click', () => {
            if(todo_element.nextElementSibling) {        //put nextSibling before the current
                todo_element.parentElement.insertBefore(todo_element.nextElementSibling, todo_element);
            }
        });
        todo_up_element.addEventListener('click', () => {
            if(todo_element.previousElementSibling) {    //put current before previousSibling
                todo_element.parentElement.insertBefore(todo_element, todo_element.previousElementSibling);
            }
        });


        function createTask() {
            //const task_element = document.createElement("div");
            todo_element.classList.add("todo");
    
            //const task_content_element = document.createElement("div");
            todo_content_element.classList.add("content");
            //task_content_element.innerText = task; 
    
            todo_element.appendChild(todo_content_element);   
    
            //const task_input_element = document.createElement("input");
            todo_input_element.classList.add("text");
            todo_input_element.type = "text";
            todo_input_element.value = "";
            todo_input_element.setAttribute("readonly", "readonly");
    
            todo_content_element.appendChild(todo_input_element);
    
    
            //const task_action_element = document.createElement("div");
            todo_action_element.classList.add("buttons");
            
            //const task_organize_element = document.createElement("div");
            todo_organize_element.classList.add("organize");
    
            //const task_up_element = document.createElement("button");
            todo_up_element.classList.add("up");
            todo_up_element.innerHTML = '\u2191';
    
            //const task_down_element = document.createElement("button");
            todo_down_element.classList.add("down");
            todo_down_element.innerHTML = '\u2193';
            //////////////////////////////////////// 
            //const task_edit_element = document.createElement("button");
            todo_edit_element.classList.add("edit");
            todo_edit_element.innerHTML = "Edit"; 
    
            //const task_delete_element = document.createElement("button");
            todo_delete_element.classList.add("delete");
            todo_delete_element.innerHTML = "Delete";
    
            //UP AND DOWN HERE!
    
            todo_organize_element.appendChild(todo_up_element);
            todo_organize_element.appendChild(todo_down_element);
            todo_element.appendChild(todo_organize_element);
    
    
            todo_action_element.appendChild(todo_edit_element);
            todo_action_element.appendChild(todo_delete_element);
            todo_element.appendChild(todo_action_element);
    
        return todo_element;
        };

        

    });
    











    // ############ collapsible history menu ############ //
    let coll = document.querySelector(".collapsible");
    let taskHistory = document.querySelector(".history");
    
    coll.addEventListener("click", () => {
       // let content = this.nextElementSibling;
        if (taskHistory.style.display === "none") {
            taskHistory.style.display = "block";
        } else {
            taskHistory.style.display = "none";
        }
    }); 
    
    
});