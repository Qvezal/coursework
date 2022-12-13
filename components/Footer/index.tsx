import Container from '@/components/std/Container';
import Spacer from '@/components/std/Spacer';
import styles from './footer.module.css';

function Footer() {
    return (
    <footer className={styles.footer}>
        <Container>
            <h3>© All right reserved. Savilov Andrey coursework 2022</h3>
        </Container>
        
    </footer>
    )
}

export default Footer;