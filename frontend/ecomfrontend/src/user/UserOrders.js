import React from "react";
import { Base } from "../core/Base";

export const UserOrders = () => {

  // GET ALL ORDERS
  const orders = JSON.parse(localStorage.getItem("orderData")) || [];

  return (
    <Base>
      <div
        style={{
          background: "#fff5f9",
          minHeight: "100vh",
          padding: "20px",
        }}
      >

        <h2
          style={{
            color: "#ff4d88",
            marginBottom: "20px",
            fontSize: "24px",
          }}
        >
          My Orders
        </h2>

        {orders.length > 0 ? (

          orders.map((order, orderIndex) => (

            <div
              key={orderIndex}
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >

              {/* LEFT SIDE */}
              <div
                style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  minWidth: "280px",
                }}
              >

                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: "#222",
                        fontSize: "18px",
                      }}
                    >
                      Order #{orderIndex + 1}
                    </h3>

                    <p
                      style={{
                        margin: "5px 0 0 0",
                        color: "#777",
                        fontSize: "12px",
                      }}
                    >
                      Successfully Placed
                    </p>
                  </div>

                  <span
                    style={{
                      background: "#ffe6ef",
                      color: "#ff4d88",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>

                </div>

                {/* PRODUCTS */}
                {order.items.map((item, index) => (

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "10px 0",
                      borderBottom: "1px solid #f2f2f2",
                      alignItems: "center",
                    }}
                  >

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />

                    {/* DETAILS */}
                    <div style={{ flex: 1 }}>

                      <h4
                        style={{
                          margin: 0,
                          color: "#222",
                          fontSize: "15px",
                        }}
                      >
                        {item.name}
                      </h4>

                      <p
                        style={{
                          margin: "4px 0",
                          color: "#888",
                          fontSize: "12px",
                        }}
                      >
                        {item.description}
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#ff4d88",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        ₹ {item.price}
                      </p>

                    </div>

                  </div>

                ))}

                {/* TRACKING */}
                <div style={{ marginTop: "18px" }}>

                  <h4
                    style={{
                      color: "#222",
                      marginBottom: "15px",
                      fontSize: "16px",
                    }}
                  >
                    Order Tracking
                  </h4>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >

                    {[
                      "Confirmed",
                      "Shipped",
                      "Out for Delivery",
                      "Delivered",
                    ].map((step, i) => (

                      <div key={i} style={{ flex: 1 }}>

                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: i === 0 ? "#ff4d88" : "#ddd",
                            color: "#fff",
                            margin: "0 auto 6px",
                            lineHeight: "28px",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </div>

                        <p
                          style={{
                            fontSize: "11px",
                            color: "#666",
                            margin: 0,
                          }}
                        >
                          {step}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              {/* RIGHT SIDE */}
              <div
                style={{
                  width: "220px",
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  height: "fit-content",
                }}
              >

                <h3
                  style={{
                    color: "#ff4d88",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                >
                  Order Summary
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  <span>Total</span>
                  <span>₹ {order.total}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  <span>Payment</span>
                  <span>{order.payment}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    color: "#ff4d88",
                    fontSize: "14px",
                  }}
                >
                  <span>Status</span>
                  <span>{order.status}</span>
                </div>

              </div>

            </div>

          ))

        ) : (

          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#888" }}>
              No Orders Found
            </h3>
          </div>

        )}

      </div>
    </Base>
  );
};