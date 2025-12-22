const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
            {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
            }
        ]

    const biggerList = [
    {
        "_id": "694910451c140ed2d99b9e7d",
        "title": "Last week vibes",
        "author": "Jane Smith",
        "url": "...",
        "likes": 3,
        "__v": 0
    },
    {
        "_id": "694913f7eb8a57893297abe9",
        "title": "Last wewwwwek vibes",
        "author": "Jane Smiwwwth",
        "url": "...",
        "likes": 8,
        "__v": 0
    }
]

    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(biggerList)
        assert.strictEqual(result, 11)
    })
})