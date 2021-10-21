import styles from './app.module.scss'
import {MessageList} from "./components/MessageList";
import {LoginBox} from "./components/LoginBox";
import {SendMessageForm} from "./components/SendMessageForm";
import {useContext} from "react";
import {AuthContext} from "./contexts/auth";


export function App() {
    const {user} = useContext(AuthContext)

    return (
        <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
            <MessageList/>
            {!!user ? <SendMessageForm/> : <LoginBox/>}
        </main>
    )
}
