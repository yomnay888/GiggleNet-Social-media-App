import LoginForm from "../../components/loginForm/LoginForm";
import "./LoginPage.css";
function LoginPage() {
    return (
        <div className="login-container">
            {/* <img src="./try3.png" className="login-image" /> */}
            <div className="login-page">
                <LoginForm />
            </div>
        </div>
    );
}
export default LoginPage;