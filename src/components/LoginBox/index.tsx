import styles from './styles.module.scss';
import {VscGithubInverted} from "react-icons/vsc";
import {useEffect} from "react";
import {api} from "../../services/api";

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export function LoginBox() {
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=2ec875773926987f728d`;

    async function signIn(githubCode: string) {
        const response = await api.post<AuthResponse>('auth', {
            code: githubCode
        })

        const {token, user}= response.data;

        localStorage.setItem('@dowhile:token', token)

        console.log(user)
    }

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')

            window.history.pushState({}, '', urlWithoutCode)

            signIn(githubCode);
        }
    })

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.singInWithGithub}>
                <VscGithubInverted size={24}/>
                Entrar com Github
            </a>
        </div>
    )
}