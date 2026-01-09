const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {      
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <label>
                    username
                    <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
                </label>
                <br />
                <label>
                    password
                    <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </label>
                <br />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login