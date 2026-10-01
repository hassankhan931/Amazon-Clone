// import connectDB from "../../lib/mongodb";
// import Product from "../../lib/Product";
// export async function GET() {
//   try {
//     await connectDB();

//     const products = await Product.find();

//     return Response.json(products);
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { message: "Failed to fetch products" },
//       { status: 500 },
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();

//     const data = await request.json();

//     const product = await Product.create(data);

//     return Response.json(product, { status: 201 });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { message: "Failed to create product" },
//       { status: 500 },
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     await connectDB();

//     const data = await request.json();

//     const { id, ...updates } = data;

//     if (!id) {
//       return Response.json(
//         { message: "Product id is required" },
//         { status: 400 },
//       );
//     }

//     const product = await Product.findOneAndUpdate({ id }, updates, {
//       new: true,
//       runValidators: true,
//     });

//     if (!product) {
//       return Response.json({ message: "Product not found" }, { status: 404 });
//     }

//     return Response.json(product);
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { message: "Failed to update product" },
//       { status: 500 },
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connectDB();

//     const data = await request.json();

//     const { id } = data;

//     if (!id) {
//       return Response.json(
//         { message: "Product id is required" },
//         { status: 400 },
//       );
//     }

//     const product = await Product.findOneAndDelete({ id });

//     if (!product) {
//       return Response.json({ message: "Product not found" }, { status: 404 });
//     }

//     return Response.json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { message: "Failed to delete product" },
//       { status: 500 },
//     );
//   }
// }

import connectDB from "../../lib/mongodb";
import Product from "../../lib/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return Response.json(products);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    // Bulk products add/seed
    if (Array.isArray(data)) {
      const operations = data.map((product) => ({
        updateOne: {
          filter: { id: product.id },
          update: {
            $setOnInsert: product,
          },
          upsert: true,
        },
      }));

      if (operations.length > 0) {
        await Product.bulkWrite(operations);
      }

      const products = await Product.find();

      return Response.json(products);
    }

    // Normal single product add from Admin
    const product = await Product.create(data);

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to create product(s)" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const data = await request.json();
    const { id, ...updates } = data;

    if (!id) {
      return Response.json(
        { message: "Product id is required" },
        { status: 400 },
      );
    }

    const product = await Product.findOneAndUpdate({ id }, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to update product" },
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
        { message: "Product id is required" },
        { status: 400 },
      );
    }

    const product = await Product.findOneAndDelete({ id });

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to delete product" },
      { status: 500 },
    );
  }
}
