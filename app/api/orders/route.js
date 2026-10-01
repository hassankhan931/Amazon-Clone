import connectDB from "../../lib/mongodb";
import Order from "../../lib/Order";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const query = userId ? { userId } : {};

    const orders = await Order.find(query).sort({
      createdAt: -1,
    });

    return Response.json(orders);
  } catch (error) {
    console.error("Orders GET error:", error);

    return Response.json(
      { message: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    const { userId, items, total, customer } = data;

    if (!userId) {
      return Response.json({ message: "User ID is required" }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json(
        { message: "Order items are required" },
        { status: 400 },
      );
    }

    if (typeof total !== "number" || total <= 0) {
      return Response.json(
        { message: "Valid order total is required" },
        { status: 400 },
      );
    }

    const order = await Order.create({
      userId,
      items,
      total,
      customer: customer || {},
    });

    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);

    return Response.json(
      { message: "Failed to create order" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const data = await request.json();

    const { id, status } = data;

    if (!id) {
      return Response.json(
        { message: "Order ID is required" },
        { status: 400 },
      );
    }

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return Response.json(
        { message: "Invalid order status" },
        { status: 400 },
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json(order);
  } catch (error) {
    console.error("Orders PUT error:", error);

    return Response.json(
      { message: "Failed to update order" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const data = await request.json();
    const { id } = data;

    if (!id) {
      return Response.json(
        { message: "Order ID is required" },
        { status: 400 },
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.status !== "delivered") {
      return Response.json(
        { message: "Only delivered orders can be deleted" },
        { status: 400 },
      );
    }

    await Order.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Delivered order deleted successfully",
    });
  } catch (error) {
    console.error("Orders DELETE error:", error);

    return Response.json(
      { message: "Failed to delete order" },
      { status: 500 },
    );
  }
}
