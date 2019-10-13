import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import Input from './Input'
import Table from 'react-bootstrap/Table'

class InventoryInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryInfo: {
                obtainedBy: {
                    obtainedByCheckBox: [{ "id": "Session-1", "name": "Sessionas", "value": true, "disabled": true }, { "id": "subSession-5", "name": "Seat Plan", "value": false, "disabled": false }, { "id": "RatePlan-2", "name": "Rate Plandasdas", "value": false, "disabled": false }],
                    validation: {
                        validationMsg: []
                    }
                },
                inventoryType: {
                    inventoryTypeCheckBox: [{ "id": "Allotment-abc-1", "value": true, "disabled": true }, { "id": "Free Sell-def-2", "value": false, "disabled": false }, { "id": "On Request-efg-3", "value": false, "disabled": false }],
                    validation: {
                        validationMsg: []
                    }
                }
            },
            bookingChannel: [{ "name": "web", "displayName": "Web" }, { "name": "cc", "displayName": "CC" }, { "name": "mobile", "displayName": "Mobile" }, { "name": "webService", "displayName": "Web Service" }],
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
            },
            activityId: null
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (Object.keys(nextProps.selectedActivity).length <= 0) {

        } else {
            let stateObject = { ...nextState.gridData }
            let activityId = null//this.state.activityId
            if (nextProps.selectedActivity && Object.keys(nextProps.selectedActivity).length > 0 && nextProps.selectedActivity.activityId !== nextState.activityId) {
                stateObject = nextProps.existingInventory && nextProps.existingInventory.existingInventory && nextProps.existingInventory.existingInventory.tableData
                activityId = nextProps.selectedActivity.activityId

                this.setState({ activityId: activityId, gridData: stateObject }, () => {
                    console.log("SATTE=====>>>>>>", this.state)
                })
            }

        }
    }


    inputChangedHandler = (e, type, category) => {
        let inventoryInfo = { ...this.state.inventoryInfo }
        if (category === "obtainedBy") {
            let obtainedByCheckBox = inventoryInfo.obtainedBy.obtainedByCheckBox
            let selectSubSession = false
            obtainedByCheckBox.forEach(ele => {
                for (let key in ele) {
                    ele.id === type && ele.id.split("-")[0] !== "Session" ? ele.value = e.target.checked : null
                    type.split("-")[0] === "RatePlan" && e.target.checked === true ? selectSubSession = true : selectSubSession = false
                    selectSubSession === true && (ele.id.split("-")[0] !== "Session" && ele.id.split("-")[0] !== "RatePlan") ? ele.value = true : null
                }
            })
            inventoryInfo.obtainedBy.obtainedByCheckBox = obtainedByCheckBox
        } else if (category === "inventoryType") {
            let inventoryType = inventoryInfo.inventoryType.inventoryTypeCheckBox
            if (e.target.checked === true) {
                inventoryType.forEach(ele => {
                    ele.value === true && ele.disabled === true ? ele.disabled = false : null
                    ele.id === type ? ele.value = e.target.checked : null
                })
            } else {
                let checkedCount = 0
                inventoryType.forEach(ele => {
                    ele.id === type ? ele.value = e.target.checked : null
                    ele.value === true ? checkedCount = checkedCount + 1 : null
                })
                if (checkedCount === 1) {
                    inventoryType.forEach(ele => {
                        ele.value === true ? ele.disabled = true : null
                    })
                }
            }
            inventoryInfo.inventoryType.inventoryTypeCheckBox = inventoryType
        }
        this.setState({ inventoryInfo: inventoryInfo }, () => {
        })
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
                                    <div style={{padding: "0rem 0.5rem 0rem 0rem"}}>
                                    {/* </div> <label style={{ display: "inline-flex" }} > */}
                                        <input 
                                            inline
                                            type={"radio"}
                                            id={tname + "-" + bookingChannelname + "-" + key.split("-")[0] + "-" + el.split("-")[0]}
                                            name={tname + "-" + bookingChannelname + "-" + key.split("-")[0]}
                                            value={tname + "-" + bookingChannelname + "-" + key.split("-")[0] + "-" + el.split("-")[0]}
                                            defaultChecked={tname + "-" + bookingChannelname + "-" + key.split("-")[0] + "-" + el.split("-")[0] === datas.value ? true : false}
                                            onChange={(e) => { this.onChange(e) }}
                                        />
                                        {el.split("-")[1]}
                                        </div>
                                    // </label>
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

    saveForm = (e) => {

    }

    render() {
        const obtainedByCheckBoxArray = [...this.state.inventoryInfo.obtainedBy.obtainedByCheckBox];
        const inventoryTypes = [...this.state.inventoryInfo.inventoryType.inventoryTypeCheckBox]
        const bookingChannel = [...this.state.bookingChannel]
        const gridData = { ...this.state.table }

        let tableArray = []//[...this.state.gridData.Allotment]
        for (let key in gridData) {
            tableArray.push({
                id: key,
                data: gridData[key]
            })
        }

        const array = []
        let freeSell = false
        let onRequest = false
        let allotmentTable = true

        {
            inventoryTypes.forEach(ele => {
                ele.id.split("-")[0] === "Free Sell" ? freeSell = ele.value : null
                ele.id.split("-")[0] === "On Request" ? onRequest = ele.value : null
                ele.id.split("-")[0] === "Allotment" ? allotmentTable = ele.value : null
            })
        }

        let form = (
            <form>
                <Row>
                    <Col><label>Inventory Obtained By<i class="fas fa-star-of-life required-star"></i>:</label></Col>
                    {obtainedByCheckBoxArray.map(checkBox => (
                        <Col>
                            <Input
                                type={"checkbox"}
                                controlId={checkBox.id}
                                label={checkBox.name}
                                value={checkBox.value}
                                changed={(event) => this.inputChangedHandler(event, checkBox.id, "obtainedBy")}
                                disabled={checkBox.disabled}
                            />
                        </Col>
                    ))}
                </Row>

                <Row>
                    <Col><label>Inventory Type(s)<i class="fas fa-star-of-life required-star"></i>:</label></Col>
                    {inventoryTypes.map(checkBox => (
                        <Col>
                            <Input
                                type={"checkbox"}
                                controlId={checkBox.id}
                                label={checkBox.id.split("-")[1]}
                                value={checkBox.value}
                                changed={(event) => this.inputChangedHandler(event, checkBox.id, "inventoryType")}
                                disabled={checkBox.disabled}
                            />
                        </Col>
                    ))}
                </Row>

                {allotmentTable === true && tableArray[0].data.length > 0 ?
                    <Row>
                        <Table responsive striped bordered hover>
                            <tbody>
                                <tr>
                                    {this.renderTableHeader(tableArray[0].data, tableArray[0].id.split("-")[0])}
                                </tr>
                                {this.renderTableData(tableArray[0].data, tableArray[0].id.split("-")[0])}
                            </tbody>
                        </Table>
                    </Row>
                    : null}
                {freeSell === true ?
                    <Row>
                        <Table responsive striped bordered hover>
                            <tbody>
                                <tr>
                                    {this.renderTableHeader(tableArray[1].data, tableArray[1].id.split("-")[0])}
                                </tr>
                                {this.renderTableData(tableArray[1].data, tableArray[1].id.split("-")[0])}
                            </tbody>
                        </Table>
                    </Row>
                    : null}

                {onRequest === true ?
                    <Row>
                        <Table responsive striped bordered hover>
                            <tbody>
                                <tr>
                                    {this.renderTableHeader(tableArray[0].data, tableArray[0].id.split("-")[0])}
                                </tr>
                                {this.renderTableData(tableArray[0].data, tableArray[0].id.split("-")[0])}
                            </tbody>
                        </Table>
                    </Row>
                    : null}
                <Button variant="primary" size="sm" onClick={(e) => this.saveForm(e)}>Save</Button>
            </form>
        );
        return (<div>
            {form}
        </div>);
    }
}

export default InventoryInfoComponent;