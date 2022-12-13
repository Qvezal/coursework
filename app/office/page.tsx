"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { read, utils, writeFileXLSX} from "xlsx"

import Image from 'next/image'
import edit from '@/assets/office/edit.svg'
import del from '@/assets/office/delete.svg'

import Container from '@/components/std/Container';
import Row from '@/components/std/Row';
import Spacer from '@/components/std/Spacer';

import Actions from './actions';
import NowAction from './now_action';

import styles from './office.module.css'

export default function OfficePage() {

    /**
     * Relocate if not logged in
     */
    const router = useRouter()
    if (localStorage.getItem('name') == null) {
        router.push('/login')
    }


    /**
     * Basic data
     */
    const user_name = localStorage.getItem('name')
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [table, setTable] = useState([])


    /**
     * Opened function
     */
    const [opened, setOpened] = useState('')
    function open (event) {
        setOpened(event.target.id)
    }

    /**
     * Search
     */
    const [searchtxt, setSearchtxt] = useState('')
    function writeSearch(event) {
        setSearchtxt(event.target.value)
    }
    function Search() {

        if (searchtxt == "") {
            router.push('/office')
        }

        setTable(
            prev => {
                return(
                    prev.filter(row => 
                        row.selled == searchtxt ||
                        row.buyer == searchtxt ||
                        row.manager == searchtxt ||
                        row.Car[0].car_name == searchtxt ||
                        row.Car[0].car_owner == searchtxt
                        ))
                })
    }

    /**
     * Add
     */
    const error_style = {
        border: "2px solid red",
        color: "red"
    }
    const [addData, setAddData] = useState({
        selled: '',
        car_name: '',
        car_owner: '',
        buyer: '',
        manager: ''
    })
    const[addDataErrors, setAddDataErrors] = useState([])
    function fillData(event) {
        const {name, value} = event.target

        setAddData(prev => {
            return ({
                ...prev,
                [name]:value
            })
        })
    }
    function addSell () {
        let errors = [];
        if (addData.selled == 'Select' || addData.selled == '') {
            errors.push('selled')
        }
        if (addData.car_name == '') {
            errors.push('car_name')
        }
        if (addData.car_owner == '') {
            errors.push('car_owner')
        }

        if (errors.length != 0) {
            setAddDataErrors(errors)
        } else {
            const data = {
                id: user.id,
                new_sell: {
                    ...addData
                }
            }

            fetch('/api/add',
            {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(()=> {
                router.push('/office')
            })
            
        }
    }

    /**
     * Sort
     */
    function changeSort(event) {
        const sortBy = event.target.value

        if (sortBy == 'buyer' || sortBy == 'manager' || sortBy == 'selled') {
            setTable(
                prev => {
                return(
                    prev.sort((a,b) => {

                    if (a[sortBy] < b[sortBy]) {
                        return -1
                    }
                    if (a[sortBy] > b[sortBy]) {
                        return 1
                    }
                    return 0
                }
                ))
            })
        } else {
            setTable(prev => {
                return(prev.sort((a,b) => {
                    const car1 = a.Car[0]
                    const car2 = b.Car[0]
                    if (car1[sortBy] < car2[sortBy]) {
                        return -1
                    }
                    if (car1[sortBy] > car2[sortBy]) {
                        return 1
                    }
                    return 0
                }))
            })
        }
        console.log(table)
    }

    /**
     * Filter
     */
    const [filter, setFilter] = useState({
        selled: true,
        car_name: true,
        car_owner: true,
        buyer: true,
        manager: true
    })
    function changeFilter(event) {
        console.log(event.target.value)
        const {name} = event.target
        setFilter(prev => {
            return({
                ...prev,
                [name]:!prev[name]
            })
        })
    }

    /**
     * Save to xls
     */
    function Save() {
        const worksheet = utils.json_to_sheet(parseHTMLTableElem(document.querySelector('#my_table')))
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook,worksheet)
        writeFileXLSX(workbook, "mycars.xlsx")
    }
    

    function parseHTMLTableElem(tableEl) {
        const columns = Array.from(tableEl.querySelectorAll('th')).map(it => it.textContent)
        const rows = tableEl.querySelectorAll('tbody > tr')
        return Array.from(rows).map(row => {
            const cells = Array.from(row.querySelectorAll('td'))
            return columns.reduce((obj, col, idx) => {
                obj[col] = cells[idx].textContent
                return obj
            }, {})
        })
    }

    /**
     * Print
     */
    
    function CallPrint() {
        window.print()
      }
  

    /**
     * Get basic data
     */
    useEffect(() => {
        setLoading(true)
        fetch('/api/user',
        {
            method: 'POST',
            body: user_name
        })
          .then((res) => {
            res.json()
            .then((user) => {
                setUser(user)
                setTable(user.sells)
                setLoading(false)
            })
           
          })
    }, [])
    if (isLoading) return <Container><div className={styles.office}><Spacer top="4"/><h1>Loading...</h1></div></Container>
    if (!user) return <Container><div className={styles.office}><Spacer top="4"/><h1>No profile data</h1></div></Container>



    return(
        <Container>
            <div className={styles.office}>
                <Spacer top="4"/>
                <h1>Hello, {user != undefined ? user.name : "b"}</h1>
                <Spacer top="2"/>
                <Row>
                    <Actions open={open} Save={Save} callPrint={CallPrint}/>
                    <NowAction 
                        opened = {opened}
                        write_search = {writeSearch}
                        search = {Search}
                        addSell = {addSell}
                        changeSort = {changeSort}
                        changeFilter = {changeFilter}
                        filter = {filter}
                        save = {Save}
                    />
                </Row>
                <Spacer top="2"/>
                <table className={styles.table} id="my_table">
                    <thead>
                        <tr>
                            {filter.selled && <th>Selled</th>}
                            {filter.car_name && <th>Car name</th>}
                            {filter.car_owner && <th>Car owner</th>}
                            {filter.buyer && <th>Buyer</th>}
                            {filter.manager && <th>Manager</th>}
                            <th>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opened == 'add' &&
                            <tr>
                                <td>
                                    <select 
                                    name="selled" 
                                    value={addData.selled} 
                                    onChange={fillData} 
                                    style={addDataErrors.includes('selled') ? error_style : {}}
                                    >
                                        <option>Select</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        name='car_name' 
                                        value={addData.car_name} 
                                        onChange={fillData}
                                        style={addDataErrors.includes('car_name') ? error_style : {}}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        name='car_owner' 
                                        value={addData.car_owner} 
                                        onChange={fillData}
                                        style={addDataErrors.includes('car_owner') ? error_style : {}}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        name='buyer' 
                                        value={addData.buyer} 
                                        onChange={fillData}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        name='manager' 
                                        value={addData.manager} 
                                        onChange={fillData}
                                    />
                                </td>
                            </tr>
                        }

                        {table.map(el => {
                            return (
                            <tr>
                                {filter.selled && <td>{el.selled ? "Yes" : "No"}</td>}
                                {filter.car_name && <td>{el.Car[0] != undefined ? el.Car[0].car_name : "-"}</td>}
                                {filter.car_owner && <td>{el.Car[0] != undefined ? el.Car[0].owner : "-"}</td>}
                                {filter.buyer && <td>{el.buyer}</td>}
                                {filter.manager && <td>{el.manager}</td>}
                                <td>
                                    <div className={styles.control}>
                                        <Image
                                        src={edit}
                                        alt="edit"
                                        height="25"
                                        id={"edit_"+el.id}
                                        />
                                        <Image
                                        src={del}
                                        alt="delete"
                                        height="25"
                                        id={"delete_"+el.id}
                                        />
                                    </div>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}