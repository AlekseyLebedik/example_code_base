## Testing

### Unit Testing

For unit testing, we use [Jest](https://facebook.github.io/jest/en/) with [enzyme](http://airbnb.io/enzyme/).

We recommand that you read the following articles to understand our testing strategies:

- [Testing Strategies for React and Redux](https://hacks.mozilla.org/2018/04/testing-strategies-for-react-and-redux/)
- [Use Jest Snapshot on everything](https://medium.com/@newyork.anthonyng/use-jest-snapshot-on-everything-4c5d4c88ca16)
- [Testing with Jest: 15 Awesome Tips and Tricks](https://medium.com/@stipsan/testing-with-jest-15-awesome-tips-and-tricks-42150ec4c262)
- [Testing React Apps](https://facebook.github.io/jest/docs/en/tutorial-react.html)
- [Guide to Unit Testing](https://github.com/mawrkus/js-unit-testing-guide#name-your-tests-properly): particularly the **Structure your tests properly** and **Name your tests properly** section

Before adding a new test, read some tests from the `core` package and the available functions from the `test-utils` package.

### E2E Testing

For e2e testing, we use [Cypress](https://www.cypress.io/).

We are still not sure of the best strategy for e2e testing (mocking the API vs using the real API). We will update this documentation when we are ready. Until then, we focus on unit testing.
