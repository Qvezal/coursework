'use client'
import styles from './header.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import Container from '@/components/std/Container';
import Row from '@/components/std/Row';
import Button from '@/components/std/Button';
import Spacer from '@/components/std/Spacer';
import logo from './logo.svg'

function logout(router: any) {
    localStorage.removeItem('name')
    router.push('/')
}


function Header() {

    const link = usePathname();
    const router = useRouter()
    const button = link != '/office' ? 'login' : 'logout' 


    return (
    <header className={styles.header}>
        <Container>
            <Row>
                <Link href='/'>
                    <Row>
                        <Image src={logo} alt='logo'/>
                        <h3 className={styles.name}>CDManagment</h3>
                    </Row>
                </Link>
                {
                    button == 'login'
                    ?
                    <Link href='/login'>
                        <Button type='pr'>Войти</Button>
                    </Link>
                    :
                    <Button type='lg' onclick={logout} param = {router}>Выйти</Button>
                }
                
            </Row>
        </Container>
        
    </header>
    )
}

export default Header;