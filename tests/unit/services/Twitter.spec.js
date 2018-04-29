const Twitter = require("../../../src/services/Twitter");

describe("Twitter", () => {
  describe("removeTweet", () => {
    it("uses the right method from the injected Twitter client", async () => {
      expect.assertions(2);

      const client = { post: jest.fn(() => ({})) };
      const subject = new Twitter({}, { client });

      await subject.removeTweet("1111");

      expect(client.post).toHaveBeenCalledTimes(1);
      expect(client.post).toHaveBeenCalledWith("statuses/destroy/1111");
    });

    it("throws an exception if the client returns errors", async () => {
      expect.assertions(1);

      const client = { post: jest.fn(() => ({ errors: [] })) };
      const subject = new Twitter({}, { client });

      try {
        await subject.removeTweet("1111");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
