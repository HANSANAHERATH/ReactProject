import React, { Component } from 'react'
import { Button, Col, Row, Table, Form } from 'react-bootstrap';
import Tableview from './Tableview';
import { array } from 'prop-types';

class TableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookingChannel: ["web", "mobile", "cc", "call"],
      table: {
        "Allotment-abc-1": [
          { "bookingChannel-abc-1": "Mobile-mobile", "searchSatisfied-def": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "Allotment-Mobile-searchSatisfied-CON" }, "inventory-efg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" }, "cutoff-frg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" } },
          { "bookingChannel-abc-2": "CC-cc", "searchSatisfied-def": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" }, "inventory-efg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" }, "cutoff-frg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" } },
          { "bookingChannel-abc-3": "Call-call", "searchSatisfied-def": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" }, "inventory-efg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" }, "cutoff-frg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" } }
        ],
        "Free sell-abc-2": [
          { "bookingChannel-abc-1": "Mobile-mobile", "searchSatisfied-def": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "Free sell-Mobile-searchSatisfied-CON" }, "inventory-efg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" } },
          { "bookingChannel-abc-2": "CC-cc", "searchSatisfied-def": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" }, "inventory-efg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" } },
          { "bookingChannel-abc-3": "Call-call", "searchSatisfied-def": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" }, "inventory-efg": { "radiobutton": ["CON-confirm", "CTB-call to book", "N-none"], "value": "" } }
        ]
      }

    }

  }
  save = () => {
    const table = { ...this.state.table }
    let tableArray = []
    let data = {}
    for (let key in table) {
      table[key].forEach(ele => {
        data = {}
        data["inventoryType"] = key.split("-")[2]
        for (let k in ele) {
          if (k.split("-")[0] === "searchSatisfied") {
            data["searchSatisfied"] = ele[k].value
          }
          else if (k.split("-")[0] === "inventory") {
            data["inventory"] = ele[k].value
          }
          else if (k.split("-")[0] === "cutoff") {
            data["cutoff"] = ele[k].value
          }
          else if (k.split("-")[0] === "bookingChannel") {
            data["bookingchannel"] = k.split("-")[2]
          }
        }
        tableArray.push(data)
      })
    }
  }
  onChange = (data) => {
    let table = { ...this.state.table }
    let fullName = data.target.value.split("-")
    let tableName = fullName[0]
    let bookingChannel = fullName[1]
    let columnName = fullName[2]
    let radioval = fullName[3]
    for (let key in table) {
      if (key.split("-")[0] === tableName) {
        let array = table[key]
        array.forEach(ele => {

          for (let keys in ele) {
            if (keys.split("-")[0] === "bookingChannel" && ele[keys].split("-")[0] === bookingChannel) {
              for (let column in ele) {
                if (column.split("-")[0] === columnName) {
                  ele[column].value = data.target.value
                }
              }
            }
          }
        })
      }
    }
    this.setState({ table: table }, () => {
    })
  }



  renderTableData = (data, tname) => {
    let Row = []
    let bookingChannelname = ''
    data.forEach(element => {
      let col = []
      for (let key in element) {
        let datas = element[key]
        let check = []
        if (key.split("-")[0] === "bookingChannel") {
          // let bookingChanne = element.key
          bookingChannelname = datas.split("-")[0]
          check.push(
            datas.split("-")[1]
          )
        }
        if (key.split("-")[0] !== "bookingChannel") {
          for (let k in datas) {
            if (k === "radiobutton") {
              datas.radiobutton.forEach(el => {
                check.push(
                  <label style={{ display: "inline-flex" }} >
                    <Form.Check
                      inline
                      type={"radio"}
                      id={tname + "-" + bookingChannelname + "-" + key.split("-")[0] + "-" + el.split("-")[0]}
                      name={tname + "-" + bookingChannelname + "-" + key.split("-")[0]}
                      value={tname + "-" + bookingChannelname + "-" + key.split("-")[0] + "-" + el.split("-")[0]}
                      defaultChecked={tname + "-" + bookingChannelname + "-" + key.split("-")[0] + "-" + el.split("-")[0] === datas.value ? true : false}
                      onChange={(e) => { this.onChange(e) }}
                    />
                    {el.split("-")[1]}
                  </label>
                  // <input type="radio" name={tname + "-" + bookingChannelname + "-" + key} value="s" defaultChecked={false}/>
                )
              })
            }

          }

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
      if (key.split("-")[0] !== "bookingChannel") {
        return <th key={index}>{key.split("-")[1]}</th>
      } else {
        return <th key={index}>{""}</th>
      }
    })
  }
  render() {
    const table = { ...this.state.table }
    const array = []
    for (let key in table) {
      array.push({
        id: key,
        data: table[key]
      })
    }

    let tablent = array[0]
    let tablen = array[1]

    return (
      <div>
        <table>
          <tbody>
            <tr>
              {this.renderTableHeader(tablen.data, tablen.id.split("-")[0])}
            </tr>
            {this.renderTableData(tablen.data, tablen.id.split("-")[0])}
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              {this.renderTableHeader(tablent.data, tablent.id.split("-")[0])}
            </tr>
            {this.renderTableData(tablent.data, tablent.id.split("-")[0])}
          </tbody>
        </table>
        <button onClick={this.save}>Save</button>
      </div>
    )
  }
}

export default TableComponent;