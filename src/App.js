import React, { Component } from 'react';
//Above we have brought in the react library. We also need to bring in the component class.
//To add that import, we will comma separate the classes we want to bring in that live in the React Library

import { TodoBanner } from "./TodoBanner";
import { TodoRow } from './TodoRow';
import { TodoCreator } from './TodoCreator';
import { VisibilityControl } from './VisibilityControl';




export default class App extends Component {
  //Above we have created a class called App, that extends the functionality of the Component class in the React package.
  //The export keyword makes the class available for use outside of the JS file where it is defined (similar to an access modifier in C#).

  //We are going to create state data for our component. To do that we need to create a constructor method. This method will get called when an 
  //object is created using this class. Said another way, this will be called when the component is initialized.



  //To insure, we have all of the necessary features from React to create a stateful component, we need to call the super() first. This calls
  //the constructor for the Component class in React.
  constructor(props) {
    super(props);
    //React components have a special propoerty called state which is what we will use to define state data
    this.state = {
      userName: "Sean",
      todoItems: [
        {
          action: "Buy Flowers",
          done: false
        },
        {
          action: "Get Shoes",
          done: false
        },
        {
          action: "HE NEED SOME MILK",
          done: true
        },
        {
          action: "Work towards world peace",
          done: true
        }
      ],
      showCompleted: true
    }
  }

  //We now need a way to change the state data for our component.
  //We will create a method that can be called on a button click to change the value of userName (prop stored in state data)
  //We will use the fat arrow syntax - this allows functions to be expressed concisely.
  //What we are really doing is creating an anon function.
  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Sean" ? "Bob" : "Sean"
    })
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }


  createNewTodo = (task) => {
    if (!this.state.todoItems.find(x => x.action === task)) {
      this.setState({
        //We use the setState() here because state data should NOT be updated directly.
        //When setState is called the components state data is  updated with new values and then the render() is called (invoked) so that the UI
        //Will be updated
        todoItems: [
          ...this.state.todoItems,
          //The above use of the spread operator means that we are adding what was previously in the array back and then we are extending-
          //(adding) a new todo list item.
          {
            action: task,
            done: false
          }
        ]
      },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      )
    }
  }


  //We have been focusing on embedding JS expressions in fragments of HTML. However, since JSX allows us to freely mix HTML like syntax and JS
  //we can create methods that return HTML content.

  //The map() that were using below, allows us to generate a sequence of HTML for each item in the todoItems prop of state data.
  //The key prop allows React to keep track of which items are updated. This is so we can avoid unnecessary re-render performance hits.

  todoTableRows = (doneValue) => this.state.todoItems.filter(item => item.done === doneValue).map(item =>
    //#region |Old row code|
    // <tr key={item.action}>
    //   <td>{item.action}</td>
    //   <td>
    //     <input type="checkbox" checked={item.done} onChange={() => this.toggleTodo(item)} />
    //   </td>
    // </tr>
    //#endregion
    <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
  );

  //.map: basically a foreach, in this case its going thru each index of the array
  toggleTodo = (todo) => this.setState(
    {
      todoItems: this.state.todoItems.map(item => item.action === todo.action ? { ...item, done: !item.done } : item)
    },
    () => localStorage.setItem("todos", JSON.stringify(this.state))
  );


  //Saves info in local storage.
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null ? JSON.parse(data) :
        {
          userName: "Sean",
          todoItems: [
            {
              action: "Buy Flowers",
              done: false
            },
            {
              action: "Get Shoes",
              done: false
            },
            {
              action: "HE NEED SOME MILK",
              done: true
            },
            {
              action: "Work towards world peace",
              done: true
            }
          ],
          showCompleted: true
        }
    );
  }


  render() {
    return (
      <div>
        <TodoBanner name={this.state.userName} task={this.state.todoItems} />
        {/* //#region 
        <h4 className="bg-primary text-white text-center p-2">
        {this.state.userName}'s ToDo List
        ({this.state.todoItems.filter(t => !t.done).length} items left to do.)
        </h4>
        <button className="btn btn-primary m-2" onClick={this.changeStateData}>Change</button>
        //#endregion */}
        <div className="container-fluid">
          {/* <div className="my-1">
            <input className="form-control" value={this.state.newItemText} onChange={this.updateNewTextValue} />
            <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>Add Item</button>
          </div> */}
          <TodoCreator callback={this.createNewTodo} />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.todoTableRows(false)}
            </tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks" isChecked={this.state.showCompleted}
              callback={(checked) => this.setState({ showCompleted: checked })} />
          </div>
          {this.state.showCompleted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                {this.todoTableRows(true)}
              </tbody>
            </table>
          }
        </div>
      </div >
    );
  }
};
