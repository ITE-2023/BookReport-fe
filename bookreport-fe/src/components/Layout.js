import Header from "../components/Header"
import Footer from "../components/Footer"
import React from "react";

import styles from "../css/Layout.module.css"

function Layout({children}) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.content}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout