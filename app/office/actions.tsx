import Image from 'next/image'
import styles from './office.module.css'

import Row from '@/components/std/Row'
import Spacer from '@/components/std/Spacer'

import plus from '@/assets/office/plus.svg'
import print from '@/assets/office/print.svg'
import save from '@/assets/office/save.svg'
import search from '@/assets/office/search.svg'
import sort from '@/assets/office/sort.svg'
import filter from '@/assets/office/filter.svg'

export default function Actions({open, Save, callPrint}) {

    return(
    <div className={styles.actions}>
        <Row>

            <button id='search' onClick={open}>
                <Image
                    src={search}
                    alt="search"
                    height="20"
                />
            </button>

            <Spacer left="1"/>

            <button id='add' onClick={open}>
                <Image
                    src={plus}
                    alt="add"
                    height="20"
                />
            </button>

            <Spacer left="1"/>

            <button id='sort' onClick={open}>
                <Image
                    src={sort}
                    alt="sort"
                    height="25"
                />
            </button>

            <Spacer left="1"/>

            <button id='filter' onClick={open}>
                <Image
                    src={filter}
                    alt="filter"
                    height="15"
                />
            </button>

            <Spacer left="1"/>

            <button id='save' onClick={Save}>
                <Image
                    src={save}
                    alt="save"
                    height="20"
                />
            </button>

            <Spacer left="1"/>

            <button id='print' onClick={callPrint}>
                <Image
                    src={print}
                    alt="print"
                    height="25"
                />
            </button>

        </Row>
        
    </div>
)}