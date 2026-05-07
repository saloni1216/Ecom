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

        {/* TITLE */}
        <h2
          style={{
            color: "#ff4d88",
            marginBottom: "25px",
            fontSize: "30px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          My Orders
        </h2>

        {orders.length > 0 ? (

          orders.map((order, orderIndex) => (

            <div
              key={orderIndex}
              className="order-wrapper"
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "25px",
                alignItems: "flex-start",
              }}
            >

              {/* LEFT SIDE */}
              <div
                className="order-left"
                style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "18px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                }}
              >

                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: "#222",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Order #{orderIndex + 1}
                    </h3>

                    <p
                      style={{
                        margin: "6px 0 0 0",
                        color: "#777",
                        fontSize: "13px",
                      }}
                    >
                      Successfully Placed
                    </p>
                  </div>

                  <span
                    style={{
                      background: "#ffe6ef",
                      color: "#ff4d88",
                      padding: "6px 14px",
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
                    className="product-card"
                    style={{
                      display: "flex",
                      gap: "15px",
                      paddingBottom: "15px",
                      marginBottom: "15px",
                      borderBottom: "1px solid #f1f1f1",
                      alignItems: "center",
                    }}
                  >

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        width: "85px",
                        height: "85px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />

                    {/* DETAILS */}
                    <div style={{ flex: 1 }}>

                      <h4
                        style={{
                          margin: 0,
                          color: "#222",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {item.name}
                      </h4>

                      <p
                        style={{
                          margin: "6px 0",
                          color: "#888",
                          fontSize: "13px",
                        }}
                      >
                        {item.description}
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#ff4d88",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        ₹ {item.price}
                      </p>

                    </div>

                  </div>

                ))}

                {/* TRACKING */}
                <div style={{ marginTop: "20px" }}>

                  <h4
                    style={{
                      color: "#222",
                      marginBottom: "18px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Order Tracking
                  </h4>

                  <div
                    className="tracking-wrapper"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "15px",
                      textAlign: "center",
                    }}
                  >

                    {[
                      "Confirmed",
                      "Shipped",
                      "Out for Delivery",
                      "Delivered",
                    ].map((step, i) => (

                      <div
                        key={i}
                        style={{
                          minWidth: "60px",
                        }}
                      >

                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background: i === 0 ? "#ff4d88" : "#ddd",
                            color: "#fff",
                            margin: "0 auto 8px",
                            lineHeight: "34px",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </div>

                        <p
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            margin: 0,
                            lineHeight: "18px",
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
                className="order-summary"
                style={{
                  width: "260px",
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "18px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  height: "fit-content",
                }}
              >

                <h3
                  style={{
                    color: "#ff4d88",
                    marginBottom: "18px",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  Order Summary
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                    fontSize: "15px",
                  }}
                >
                  <span>Total</span>
                  <span>₹ {order.total}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                    fontSize: "15px",
                  }}
                >
                  <span>Payment</span>
                  <span>{order.payment}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#ff4d88",
                    fontWeight: "bold",
                    fontSize: "15px",
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
              padding: "50px 20px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#888" }}>
              No Orders Found
            </h3>
          </div>

        )}

      </div>

      {/* RESPONSIVE CSS */}
      <style>
        {`

          @media (max-width: 992px) {

            .order-wrapper {
              flex-direction: column;
            }

            .order-summary {
              width: 100% !important;
            }

          }

          @media (max-width: 768px) {

            .product-card {
              flex-direction: column;
              align-items: flex-start !important;
            }

            .tracking-wrapper {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }

            .order-left {
              padding: 15px !important;
            }

            .order-summary {
              padding: 15px !important;
            }

          }

          @media (max-width: 480px) {

            .tracking-wrapper {
              grid-template-columns: repeat(2, 1fr) !important;
            }

            .order-left {
              min-width: 100% !important;
              padding: 12px !important;
            }

            .order-summary {
              width: 100% !important;
              padding: 12px !important;
            }

          }

        `}
      </style>

    </Base>
  );
};