import Button from "@/components/std/Button"
import Spacer from "@/components/std/Spacer"
import Row from "@/components/std/Row"
import styles from './office.module.css'

export default function NowAction({opened, write_search, search, addSell, changeSort, changeFilter, filter}) {

    return(
        <div>
            {opened == 'add' && <Button type="pr" onclick={addSell}>Сохранить</Button>}

            {opened == 'search' &&
                <Row>
                    <input className={styles.search} onChange={write_search}></input>
                    <Spacer left="1"></Spacer>
                    <button className={styles.search_btn} onClick={search}>Search</button>
                </Row>
            }

            {opened == 'sort' && 
                <select className={styles.sort} onChange={changeSort}>
                    <option value="selled">Select sort</option>
                    <option value="selled">Selled</option>
                    <option value="car_name">Car name</option>
                    <option value="owner">Car owner</option>
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                </select>
            }

            {opened == 'filter' &&
                <Row>
                    <input type="checkbox" name="selled" id="selled" value={filter.selled} onChange={changeFilter}/>
                    <label htmlFor="selled" className={filter.selled ? styles.labels : styles.labelsOff}>Selled</label>

                    <Spacer left="1"></Spacer>

                    <input type="checkbox" name="car_name" id="car_name" value={filter.car_name} onChange={changeFilter}/>
                    <label htmlFor="car_name" className={filter.car_name ? styles.labels : styles.labelsOff}>Car name</label>

                    <Spacer left="1"></Spacer>

                    <input type="checkbox" name="car_owner" id="car_owner" value={filter.car_owner} onChange={changeFilter}/>
                    <label htmlFor="car_owner" className={filter.car_owner ? styles.labels : styles.labelsOff}>Car owner</label>

                    <Spacer left="1"></Spacer>

                    <input type="checkbox" name="buyer" id="buyer" value={filter.buyer} onChange={changeFilter}/>
                    <label htmlFor="buyer" className={filter.buyer ? styles.labels : styles.labelsOff}>Buyer</label>

                    <Spacer left="1"></Spacer>

                    <input type="checkbox" name="manager" id="manager" value={filter.manager} onChange={changeFilter}/>
                    <label htmlFor="manager" className={filter.manager ? styles.labels : styles.labelsOff}>Manager</label>
                </Row>
                
            }
        </div>
    )
}