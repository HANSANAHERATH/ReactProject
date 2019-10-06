import React, { Component } from 'react'
import { Button, Col, Row, Table, Form } from 'react-bootstrap';
import Tableview from './Tableview';

class TableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookingChannel: ["web", "mobile", "cc", "call"],
      table: {
        "allotment": [
          { "bookingChannel": "mobile", "searchSatisfied": { "check": ["conform", "call to book", "none"], "value": "" }, "inventory": { "check": ["conform", "call to book", "none"], "value": "" }, "cutoff": { "check": ["conform", "call to book", "none"], "value": "" } },
          { "bookingChannel": "cc", "searchSatisfied": { "check": ["conform", "call to book", "none"], "value": "" }, "inventory": { "check": ["conform", "call to book", "none"], "value": "" }, "cutoff": { "check": ["conform", "call to book", "none"], "value": "" } },
          { "bookingChannel": "call", "searchSatisfied": { "check": ["conform", "call to book", "none"], "value": "" }, "inventory": { "check": ["conform", "call to book", "none"], "value": "" }, "cutoff": { "check": ["conform", "call to book", "none"], "value": "allotment-call-cutoff-none" } }
        ]
      }

    }

  }

  onChange = (data) => {
    let table = { ...this.state.table }
    let fullName = data.target.value.split("-")
    let tableName = fullName[0]
    let bookingChannel = fullName[1]
    let column = fullName[2]
    let radioval = fullName[3]

    table[tableName].forEach(ele => {
      for (let key in ele) {
        if (ele[key] === bookingChannel) {
          let obj = ele[column]
          obj["value"] = data.target.value
        }
      }
    })

    this.setState({ table: table })
    console.log("split", table)
  }

  renderTableData = (data, tname) => {
    let Row = []
    let bookingChannelname = ''
    data.forEach(element => {
      let col = []
      for (let key in element) {
        let datas = element[key]
        let check = []
        if (key === "bookingChannel") {
          bookingChannelname = element.bookingChannel
        }
        if (key !== "bookingChannel") {
          for (let k in datas) {
            if (k === "check") {
              datas.check.forEach(el => {
                check.push(
                  <Form.Check
                    inline
                    type={"radio"}
                    id={tname + "-" + bookingChannelname + "-" + key}
                    label={el}
                    name={tname + "-" + bookingChannelname + "-" + key}
                    value={tname + "-" + bookingChannelname + "-" + key + "-" + el}
                    defaultChecked={tname + "-" + bookingChannelname + "-" + key + "-" + el === datas.value ? true : false}
                    onChange={(e) => { this.onChange(e) }}
                  />
                  // <input type="radio" name={tname + "-" + bookingChannelname + "-" + key} value="s" defaultChecked={false}/>
                )
              })
            }

          }

        } else {
          check.push(
            element[key]
          )
        }
        col.push(<td><div style={{ display: "inline-flex" }}>{check}</div></td>)
      }

      Row.push(<tr>{col}</tr>)

    })
    return Row
  }

  renderTableHeader = (data, name) => {
    let header = Object.keys(data[0])
    return header.map((key, index) => {
      if (key !== "bookingChannel") {
        return <th key={index}>{key}</th>
      } else {
        return <th key={index}>{""}</th>
      }
    })
  }
  render() {
    const allotment = [...this.state.table.allotment]
    // let form = (

    // )

    return (
      <div>
        <table>
          <tbody>
            <tr>
              {this.renderTableHeader(allotment, "allotment")}
            </tr>
            {this.renderTableData(allotment, "allotment")}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableComponent;