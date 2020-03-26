import React, { Component } from 'react';

export class TodoRow extends Component {
    /*
        Below we will define the value for the onChange event as a callback()
        This is how child components are able to communicate with parents, as they cannot update the value of props passed to them from
        a parent. This is because React only supports one-way data flow (from parent to child). However, the parent can provide the function
        property that children can call when something important happens.

        Two different types of props:
        data props allows parent components to pass data to children
        function props allows a child to communicate with parent
    */

    render = () =>
        <tr>
            <td>{this.props.item.action}</td>
            <td>
                <input type="checkbox" checked={this.props.item.done} onChange={() => this.props.callback(this.props.item)} />
            </td>
        </tr>
}