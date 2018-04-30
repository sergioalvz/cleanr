const Remove = require("../../../src/commands/Remove");

describe("Remove", () => {
  describe("#perform", () => {
    let twitter;

    beforeEach(() => {
      twitter = { removeTweet: jest.fn() };
    });

    it("uses the Twitter service to remove each tweet", async () => {
      expect.assertions(3);

      const subject = new Remove({}, { twitter });

      await subject.perform({ listOfIds: ["0000", "1111"] });

      expect(twitter.removeTweet).toHaveBeenCalledTimes(2);
      expect(twitter.removeTweet).toBeCalledWith(
        expect.stringMatching(/0000|1111/)
      );
      expect(twitter.removeTweet).toHaveBeenLastCalledWith("1111");
    });
  });
});
