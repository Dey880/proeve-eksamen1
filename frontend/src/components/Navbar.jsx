import '../css/components/Navbar.css';

export default function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/">Logo</a></li>
                    <li><a href="/">BOUTIKK.SHOP</a></li>
                    <div className='right'>
                        <li><a href="/Login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}