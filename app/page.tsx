import Image from 'next/image';

import Container from '@/components/std/Container';
import Spacer from '@/components/std/Spacer';

import styles from '@/styles/Home.module.css';

import illustration from '@/assets/illustration.png'

export default function Home() {
    return (
        <Container>
            <div className={styles.Home}>
                <div>
                    <h1>Take control of marketing</h1>
                    <Spacer top="2"/>
                    <h4>The most powerful customer data platform democratising data and helping your business grow.</h4>
                </div>
                <Image
                    src={illustration}
                    alt='illustration'
                    width="384"
                    height="288"
                />
            </div>
            
        </Container>
    );
}
