import Header from "../../components/header/Header";
import Feed from "../../components/feed/Feed";
import ProfilePictureUpload from "../../components/ProfilePictureUpload/ProfilePictureUpload";
import { useRef } from 'react';

import './HomePage.css';

function HomePage() {
    const mainRef = useRef(null);

    return (
        <>
            <Header />
            {/* // side bar */}
            <main ref={mainRef} className="main-sections-container">
                <Feed mainRef={mainRef} />

            </main>
        </>
    )
}


export default HomePage;