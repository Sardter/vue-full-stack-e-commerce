import express from "express";
import bodyParser from "body-parser";
import mongodb from "mongodb";
import cors from "cors";
import jwt from "jsonwebtoken";
import natural from 'natural';

const products = [
  {
    id: "123",
    name: "Running Shoes",
    price: "60.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "234",
    name: "Basketball Shoes",
    price: "120.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "345",
    name: "Bright Red Shoes",
    price: "90.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "456",
    name: "Fancy Shoes",
    price: "190.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "567",
    name: "Skateboard Shoes",
    price: "75.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "678",
    name: "High Heels",
    price: "200.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "789",
    name: "Dark Shoes",
    price: "100.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "890",
    name: "Classic Shoes",
    price: "40.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "901",
    name: "Plain Shoes",
    price: "54.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "901",
    name: "Teal Dress Shoes",
    price: "330.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "789",
    name: "Fancy Boots",
    price: "230.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
  {
    id: "890",
    name: "Gold Shoes",
    price: "180.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl:
      "https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg",
    averageRating: "5.0",
  },
];

function cosineSimilarity(textA, textB) {
  const tokenizer = new natural.WordTokenizer();
  const tokensA = tokenizer.tokenize(textA.toLowerCase());
  const tokensB = tokenizer.tokenize(textB.toLowerCase());

  const tfidf = new natural.TfIdf();
  tfidf.addDocument(tokensA);
  tfidf.addDocument(tokensB);

  const vecA = tfidf.listTerms(0).map(term => term.tfidf);
  const vecB = tfidf.listTerms(1).map(term => term.tfidf);

  const dotProduct = vecA.reduce((sum, a, idx) => sum + (a * vecB[idx] || 0), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + (a * a), 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + (b * b), 0));

  return dotProduct / (magnitudeA * magnitudeB);
}

export async  function insertProducts() {
  const client = new MongoClient("mongodb://root:example@mongo:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("vue-db");

    // Calculate similarity for each product pair and update the product documents
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const similarities = products
        .filter(p => p.id !== product.id) // Exclude the current product
        .map(p => ({
          id: p.id,
          similarity: cosineSimilarity(product.description, p.description)
        }))
        .sort((a, b) => b.similarity - a.similarity); // Sort by similarity descending

      const recommendedProductIds = similarities.map(sim => sim.id);

      await db.collection("products").updateOne(
        { id: product.id },
        { $set: { ...product, recommendedProductIds } },
        { upsert: true }
      );
    }

    console.log("Products have been initialized or updated with similarities.");
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    await client.close();
  }
}
const { MongoClient } = mongodb;

const JWT_SECRET = "your_jwt_secret";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:8080", // Allow requests from your frontend URL
    credentials: true,
  })
);

await insertProducts();

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGO_DBNAME || "vue-db");
    const existingUser = await db.collection("users").findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    //const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .collection("users")
      .insertOne({ username, password: password, cartItems: [] });

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user.", error });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGO_DBNAME || "vue-db");
    const user = await db.collection("users").findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token, id: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in.", error });
  }
});

app.get("/api/products", async (req, res) => {
  const { userId } = req.query;

  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGO_DBNAME || "vue-db");

    let products;
    
    if (userId) {
      // Fetch user information
      const user = await db.collection("users").findOne({ _id: new mongodb.ObjectId(userId) });

      if (user && user.cartItems && user.cartItems.length > 0) {
        // Fetch products from the cart
        const cartProducts = await db.collection("products").find({ id: { $in: user.cartItems } }).toArray();

        // Aggregate recommended product IDs
        let recommendedProductIds = new Set();
        cartProducts.forEach(product => {
          product.recommendedProductIds.forEach(id => recommendedProductIds.add(id));
        });

        // Convert set to array and fetch the recommended products from the database
        recommendedProductIds = Array.from(recommendedProductIds);

        // Fetch the recommended products from the database
        products = await db.collection("products").find({ id: { $in: recommendedProductIds } }).toArray();

      } else {
        // If the cart is empty, return all products
        products = await db.collection("products").find({}).toArray();
      }
    } else {
      // If no userID is provided, return all products
      products = await db.collection("products").find({}).toArray();
    }

    res.status(200).json(products);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});


app.get("/api/users/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGO_DBNAME || "vue-db");
    const user = await db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
    if (!user) return res.status(404).json("Could not find the user!");

    const products = await db.collection("products").find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map((id) =>
      products.find((product) => product.id === id)
    );
    res.status(200).json(cartItems);
    client.close();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGO_DBNAME || "vue-db");
    const product = await db.collection("products").findOne({ id: productId });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Could not find the product!");
    }
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.post("/api/users/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGO_DBNAME || "vue-db");

    // Use ObjectId for querying the user
    const userObjectId = new mongodb.ObjectId(userId);

    // Ensure the user exists
    const user = await db.collection("users").findOne({ _id: userObjectId });
    if (!user) return res.status(404).json("Could not find the user!");

    // Add productId to the user's cart
    await db
      .collection("users")
      .updateOne(
        { _id: userObjectId },
        { $addToSet: { cartItems: productId } } // $addToSet ensures no duplicates
      );

    // Retrieve updated cart
    const updatedUser = await db.collection("users").findOne({ _id: userObjectId });
    const products = await db.collection("products").find({}).toArray();

    // Map cart item IDs to actual product objects
    const cartItems = updatedUser.cartItems.map((id) =>
      products.find((product) => product.id === id)
    );

    res.status(200).json(cartItems);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGO_DBNAME || "vue-db");

    // Use ObjectId for querying the user
    const userObjectId = new mongodb.ObjectId(userId);

    // Ensure the user exists
    const user = await db.collection("users").findOne({ _id: userObjectId });
    if (!user) return res.status(404).json("Could not find the user!");

    // Remove productId from the user's cart
    await db
      .collection("users")
      .updateOne(
        { _id: userObjectId },
        { $pull: { cartItems: productId } } // $pull removes the productId from the cart
      );

    // Retrieve updated cart
    const updatedUser = await db.collection("users").findOne({ _id: userObjectId });
    const products = await db.collection("products").find({}).toArray();

    // Map cart item IDs to actual product objects
    const cartItems = updatedUser.cartItems.map((id) =>
      products.find((product) => product.id === id)
    );

    res.status(200).json(cartItems);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to db", error });
  }
});


app.listen(process.env.PORT || 8000, () => {
  console.log("Server is listening on port 8000");
});
