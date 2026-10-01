"use client";

import { useEffect, useState } from "react";

const statusSteps = [
  {
    key: "pending",
    label: "Order Placed",
    description: "Your order has been placed successfully.",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    description: "Your order has been confirmed by the store.",
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on its way.",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order has been delivered.",
  },
];

const statusIndex = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  delivered: 3,
};

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function Tracking({ open, onClose, userId, money }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!open || !userId) return;

    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/orders?userId=${encodeURIComponent(userId)}`,
        );

        if (!response.ok) {
          throw new Error("Orders load nahi ho sake.");
        }

        const data = await response.json();

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Customer orders error:", error);
        setError(error.message || "Orders load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [open, userId]);

  useEffect(() => {
    if (!open) {
      setSelectedOrder(null);
    }
  }, [open]);

  if (!open) return null;

  const currentOrder = selectedOrder
    ? orders.find((order) => order._id === selectedOrder._id) || selectedOrder
    : null;

  function getStepState(order, stepIndex) {
    if (!order) return "upcoming";

    if (order.status === "cancelled") {
      return "cancelled";
    }

    const currentIndex = statusIndex[order.status] ?? 0;

    // Delivered hone ke baad tamam steps complete hain
    if (order.status === "delivered") {
      return "completed";
    }

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";

    return "upcoming";
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="My Orders"
        className="flex max-h-[90dvh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {currentOrder ? "Track Order" : "My Orders"}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {currentOrder
                ? `Order #${currentOrder._id.slice(-8)}`
                : "View and track your recent orders"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-500 transition hover:text-slate-900"
            aria-label="Close orders"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* LOADING */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-xl border border-slate-200 p-4"
                >
                  <div className="h-4 w-40 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-56 rounded bg-slate-100" />
                  <div className="mt-5 h-10 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-center">
              <p className="font-semibold text-rose-700">{error}</p>

              <button
                type="button"
                onClick={onClose}
                className="mt-4 text-sm font-semibold text-[#007185] hover:underline"
              >
                Close
              </button>
            </div>
          ) : currentOrder ? (
            /* TRACKING DETAIL */
            <div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="mb-5 text-sm font-semibold text-[#007185] hover:underline"
              >
                ← Back to My Orders
              </button>

              {/* ORDER SUMMARY */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Order
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                      #{currentOrder._id.slice(-8)}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Placed {formatDate(currentOrder.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Total
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-slate-900">
                      {money(currentOrder.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* CANCELLED */}
              {currentOrder.status === "cancelled" ? (
                <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-xl">
                      ×
                    </span>

                    <div>
                      <h3 className="font-bold text-rose-800">
                        Order Cancelled
                      </h3>

                      <p className="mt-1 text-sm text-rose-600">
                        This order has been cancelled.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* TIMELINE */
                <div className="mt-7">
                  <h3 className="mb-6 text-lg font-bold text-slate-900">
                    Order Status
                  </h3>

                  <div className="relative">
                    {statusSteps.map((step, index) => {
                      const state = getStepState(currentOrder, index);
                      const isLast = index === statusSteps.length - 1;

                      return (
                        <div key={step.key} className="relative flex gap-4">
                          {/* LINE */}
                          {!isLast && (
                            <div
                              className={`absolute top-9 left-[15px] h-[calc(100%-8px)] w-0.5 ${
                                state === "completed"
                                  ? "bg-emerald-500"
                                  : "bg-slate-200"
                              }`}
                            />
                          )}

                          {/* ICON */}
                          <div
                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                              state === "completed"
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : state === "current"
                                  ? "border-[#ff9900] bg-[#ffd814] text-[#111]"
                                  : "border-slate-300 bg-white text-slate-400"
                            }`}
                          >
                            {state === "completed" ? "✓" : index + 1}
                          </div>

                          {/* CONTENT */}
                          <div className="min-w-0 pb-8">
                            <p
                              className={`font-bold ${
                                state === "upcoming"
                                  ? "text-slate-400"
                                  : "text-slate-900"
                              }`}
                            >
                              {step.label}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {state === "current"
                                ? "Current status"
                                : step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PRODUCTS */}
              <div className="mt-2 rounded-xl border border-slate-200">
                <div className="border-b border-slate-200 px-4 py-3">
                  <h3 className="font-bold text-slate-900">
                    Items in this order
                  </h3>
                </div>

                <div className="divide-y divide-slate-100">
                  {(currentOrder.items || []).map((item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex gap-3 p-4"
                    >
                      {item.image ? (
                        <img
                          src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=120&q=80`}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg bg-slate-100 object-contain"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100 text-2xl">
                          🛍️
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 font-bold text-slate-900">
                        {money(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : orders.length === 0 ? (
            /* EMPTY */
            <div className="flex flex-col items-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                📦
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                No orders yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Your orders will appear here after you place your first order.
              </p>
            </div>
          ) : (
            /* ORDER LIST */
            <div className="space-y-4">
              {orders.map((order) => (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <div>
                      <p className="font-mono text-sm font-bold text-slate-900">
                        #{order._id.slice(-8)}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "delivered"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : order.status === "shipped"
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : order.status === "confirmed"
                              ? "border-violet-200 bg-violet-50 text-violet-700"
                              : order.status === "cancelled"
                                ? "border-rose-200 bg-rose-50 text-rose-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">
                          {order.items?.length || 0} item(s)
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-slate-900">
                          {money(order.total)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-full border border-[#f0c14b] bg-[#ffd814] px-4 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#f7ca00]"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
