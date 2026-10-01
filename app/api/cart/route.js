// import connectDB from "@/app/lib/mongodb";
// import Cart from "@/app/lib/Cart";

// export async function GET(request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return Response.json({ message: "userId is required" }, { status: 400 });
//     }

//     const cart = await Cart.findOne({ userId });

//     return Response.json(cart || { userId, items: [] });
//   } catch (error) {
//     console.error(error);

//     return Response.json({ message: "Failed to fetch cart" }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();

//     const { userId, productId, quantity } = await request.json();

//     if (!userId || !productId || !quantity) {
//       return Response.json(
//         { message: "userId, productId and quantity are required" },
//         { status: 400 },
//       );
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = await Cart.create({
//         userId,
//         items: [{ productId, quantity }],
//       });

//       return Response.json(cart, { status: 201 });
//     }

//     const existingItem = cart.items.find(
//       (item) => item.productId === productId,
//     );

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();

//     return Response.json(cart);
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { message: "Failed to add item to cart" },
//       { status: 500 },
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     await connectDB();

//     const { userId, productId, quantity } = await request.json();

//     if (!userId || !productId || !quantity) {
//       return Response.json(
//         { message: "userId, productId and quantity are required" },
//         { status: 400 },
//       );
//     }

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return Response.json({ message: "Cart not found" }, { status: 404 });
//     }

//     const item = cart.items.find((item) => item.productId === productId);

//     if (!item) {
//       return Response.json(
//         { message: "Product not found in cart" },
//         { status: 404 },
//       );
//     }

//     item.quantity = quantity;

//     await cart.save();

//     return Response.json(cart);
//   } catch (error) {
//     console.error(error);

//     return Response.json({ message: "Failed to update cart" }, { status: 500 });
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connectDB();

//     const { userId, productId } = await request.json();

//     if (!userId || !productId) {
//       return Response.json(
//         { message: "userId and productId are required" },
//         { status: 400 },
//       );
//     }

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return Response.json({ message: "Cart not found" }, { status: 404 });
//     }

//     cart.items = cart.items.filter((item) => item.productId !== productId);

//     await cart.save();

//     return Response.json(cart);
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { message: "Failed to delete item from cart" },
//       { status: 500 },
//     );
//   }
// }

import connectDB from "../../lib/mongodb";
import Cart from "../../lib/Cart";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ message: "userId is required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });

    return Response.json(cart || { userId, items: [] });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    const { userId, productId, quantity } = data;
    const amount = Number(quantity);

    if (!userId || !productId || !Number.isInteger(amount) || amount < 1) {
      return Response.json(
        {
          message: "userId, productId and a valid quantity are required",
        },
        { status: 400 },
      );
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const item = cart.items.find((item) => item.productId === productId);

    if (item) {
      item.quantity += amount;
    } else {
      cart.items.push({
        productId,
        quantity: amount,
      });
    }

    await cart.save();

    return Response.json(cart, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to add product to cart" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const data = await request.json();

    const { userId, productId, quantity } = data;
    const amount = Number(quantity);

    if (!userId || !productId || !Number.isInteger(amount)) {
      return Response.json(
        {
          message: "userId, productId and a valid quantity are required",
        },
        { status: 400 },
      );
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return Response.json({ message: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );

    if (itemIndex === -1) {
      return Response.json(
        { message: "Product not found in cart" },
        { status: 404 },
      );
    }

    if (amount <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = amount;
    }

    await cart.save();

    return Response.json(cart);
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const data = await request.json();

    const { userId, productId } = data;

    if (!userId || !productId) {
      return Response.json(
        {
          message: "userId and productId are required",
        },
        { status: 400 },
      );
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return Response.json({ message: "Cart not found" }, { status: 404 });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);

    await cart.save();

    return Response.json(cart);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to delete product from cart" },
      { status: 500 },
    );
  }
}
