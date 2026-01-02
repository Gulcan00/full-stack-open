const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user")

const api = supertest(app);

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
  await User.deleteMany({ username: "testuser" });

  await api.post("/api/users").send({
    username: "testuser",
    name: "test",
    password: "123",
  });

  const tokenResponse = await api.post("/api/login").send({
    username: "testuser",
    password: "123",
  });

  token = tokenResponse.body.token;
});

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
});

test("blog posts have property id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => assert(Object.hasOwn(blog, "id")));
});

describe("adding a blog", () => {
  test("adding a blog fails with the proper status code 401 Unauthorized if a token is not provided", async () => {
    const blog = {
      title: "Type wars 2",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 3,
    };

    await api.post("/api/blogs").send(blog).expect(401);

    const blogs = await testHelper.blogsInDB();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
  });

  test("a valid blog can be added", async () => {
    const blog = {
      title: "Type wars 2",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 3,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await testHelper.blogsInDB();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length + 1);

    const titles = blogs.map((blog) => blog.title);
    assert(titles.includes("Type wars 2"));
  });

  test("likes defaults to 0 if missing", async () => {
    const blog = {
      title: "Type wars 2",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await testHelper.blogsInDB();
    const createdBlog = blogs.find((blog) => blog.title === "Type wars 2");
    assert.strictEqual(createdBlog.likes, 0);
  });

  test("blog with missing title is not added", async () => {
    const blog = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    await api.post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blog)
        .expect(400);

    const blogs = await testHelper.blogsInDB();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
  });

  test("blog with missing url is not added", async () => {
    const blog = {
      title: "Type wars 2",
      author: "Robert C. Martin",
    };

    await api.post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(400);

    const blogs = await testHelper.blogsInDB();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const newBlog = {
        title: "Type wars 2",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 3,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtStart = await testHelper.blogsInDB();
    const blogToDelete = blogsAtStart.find((blog) => blog.title === "Type wars 2");

    await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

    const blogsAtEnd = await testHelper.blogsInDB();

    const titles = blogsAtEnd.map((n) => n.title);
    assert(!titles.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });
});

describe("update existing blog", () => {
  test("succeeds with valid id", async () => {
    const blogsAtStart = await testHelper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];

    blogToUpdate.likes += 4;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await testHelper.blogsInDB();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
    assert.deepStrictEqual(updatedBlog, blogToUpdate);
  });

  test("fails with statuscode 404 for invalid id", async () => {
    const blogsAtStart = await testHelper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const id = await testHelper.nonExistingId();

    await api.put(`/api/blogs/${id}`).send(blogToUpdate).expect(404);
  });
});

after(() => {
  mongoose.connection.close();
});
