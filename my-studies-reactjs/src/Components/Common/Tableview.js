import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

const tableview = (pros) => {
const array = []
// const tabledata = pros.tableBody.map(ele =>(
//     array.push(
        
//             <td>{ele.bookingChannel}</td>
        
//     ),
//    <tr>
       
        
//         <td>{ele.searchSatisfied}</td>
//         <td>{ele.inventory}</td>
//         <td>{ele.cutoff}</td>
//    </tr> 
// ))

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {"aas"}
                </tbody>
            </Table>
        </div>
    );
}

export default tableview;