const Article = require("../models/articles");
const User = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);

    if (!article)
      return res
        .status(400)
        .json({ success: false, error: "Error on creating new article" });

    res.status(201).json({
      success: true,
      message: "Article Created Successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.allArticles = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });

    const subscriptions = await stripe.subscriptions.list(
      {
        customer: user.stripeCustomerId,
        status: "all",
        expand: ["data.default_payment_method"],
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    let articles = "";

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }
    if (endIndex < (await Article.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (!subscriptions?.data?.length) {
      articles = await Article.find({ access: "Free" })
        .limit(limit)
        .skip(startIndex)
        .exec();

      if (articles.length <= 0) {
        return res
          .status(200)
          .json({ success: false, error: "No articles found" });
      }

      return res.status(200).json({
        success: true,
        message: "You don't have any plan",
        articles,
        results,
      });
    }

    const plan = subscriptions?.data[0]?.plan?.nickname;

    if (plan === "Basic") {
      articles = await Article.find({
        access: { $in: ["Free", "Basic"] },
      })
        .limit(limit)
        .skip(startIndex)
        .exec();

      return res.status(200).json({
        success: true,
        message: "You have purchased Basic plan",
        articles,
        plan,
        results,
      });
    } else if (plan === "Standard") {
      articles = await Article.find({
        access: { $in: ["Free", "Basic", "Standard"] },
      })
        .limit(limit)
        .skip(startIndex)
        .exec();

      return res.status(200).json({
        success: true,
        message: "You have purchased Standard plan",
        articles,
        plan,
        results,
      });
    } else {
      articles = await Article.find({}).limit(limit).skip(startIndex).exec();

      return res.status(200).json({
        success: true,
        message: "You have purchased Premium plan",
        articles,
        plan,
        results,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
