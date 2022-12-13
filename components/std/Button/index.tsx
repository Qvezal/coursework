import styles from './button.module.css';

function empty(){}

export default function Button(props: any) {

    const {children, type} = props;
    const param = props.param || ""
    const onclick = props.onclick || empty

    const click = () => {onclick(param != "" && param)}

    return <button className={ type == "pr" ? styles.primary : type == "lg" ? styles.logout: styles.secondary} onClick={click}>{children}</button>;
}
