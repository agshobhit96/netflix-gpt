import '../App.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignout = () => {
        // Implement sign out logic here
        console.log("Sign Out Clicked");
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            }).catch((error) => {
            // An error happened.
            });
        
    }
    return (
        <div className="header-container">
            <img style={{width: '150px'}} src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
            alt="Netflix Logo" />

            {user && (
            <div>
                <span style={{color: 'white', marginRight: '16px'}}>Hello, {user.displayName || user.email}</span>
                <button style={{padding: '8px 16px', backgroundColor: '#e50914', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}
                onClick={handleSignout}>Sign Out</button>
            </div>
        )}
        </div>
    );
};

export default Header;