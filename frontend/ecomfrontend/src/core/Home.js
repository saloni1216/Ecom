import { useEffect, useState } from "react";
import { getProducts } from "./helper/coreapicalls";
import { Base } from "./Base";
import "../styles.css";
import Card from "./Card";

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        getProducts().then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProduct();
    }, []);

    return (
        <Base title="Home Page" description="Welcome To Tshirt Store">
            
            {/* ✅ Section Header */}
            <div style={styles.sectionHeader}>
                <div style={styles.iconBox}>
                    <span style={{ fontSize: "22px" }}>👕</span>
                </div>
                <div>
                    <h2 style={styles.sectionTitle}>
                        Our <span style={styles.pink}>Collection</span>
                    </h2>
                    <p style={styles.sectionSubtitle}>Explore our most popular t-shirts.</p>
                </div>
            </div>

            {/* ✅ Products Grid */}
            <div style={styles.grid}>
                {products.map((product, index) => (
                    <div key={index} style={styles.cardWrapper}>
                        <Card product={product} />
                    </div>
                ))}
            </div>

        </Base>
    );
};

const styles = {
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "8px",
        padding: "10px 0 0 4px",
    },
    iconBox: {
        backgroundColor: "#fce4ec",
        borderRadius: "10px",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    sectionTitle: {
        fontSize: "1.9rem",
        fontWeight: "800",
        margin: 0,
        color: "#111",
    },
    pink: {
        color: "#e91e8c",
    },
    sectionSubtitle: {
        color: "#666",
        fontSize: "0.95rem",
        margin: "2px 0 0 0",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "14px",
        marginTop: "20px",
    },
    cardWrapper: {
        width: "100%",
         fontSize: "0.75rem",  
        transform: "scale(1)"
    },
};