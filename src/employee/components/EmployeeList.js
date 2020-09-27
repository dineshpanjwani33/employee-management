import React from 'react';

import EmployeeItem from './EmployeeItem';

/*
Renders the list of employee-item components in a table
*/
const EmployeeList = (props) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>EmpID</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Address</th>
                    <th>DOB</th>
                    <th>Mobile No.</th>
                    <th>City</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.employees.map(emp =>
                        <EmployeeItem
                            key={emp.id}
                            emp={emp}
                            reloadEmployees={props.reloadEmployees} />
                    )
                }
            </tbody>
        </table>
    )
};

export default EmployeeList;