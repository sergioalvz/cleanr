const { execFile } = require("child_process");
const { join } = require("path");

function exec(...params) {
  const cleanr = join(__dirname, "../../src/cleanr");

  return new Promise((resolve, reject) => {
    execFile(cleanr, params, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

describe.only("cleanr", () => {
  it("works", async () => {
    expect.assertions(1);

    const result = await exec();

    expect(result).toBeDefined();
  });

  describe("--version", () => {
    it("displays the current version", async () => {
      expect.assertions(1);

      const result = await exec("--version");

      expect(result).toBeDefined();
    });

    it("works with -V as well", async () => {
      expect.assertions(1);

      const result = await exec("-V");

      expect(result).toBeDefined();
    });
  });

  describe("twitter", () => {
    describe("verify", () => {
      it("returns with a success response if there are valid credentials", async () => {
        expect.assertions(1);

        const result = await exec("twitter", "verify");

        expect(result).toBeDefined();
      });

      it("returns with an error response if there are invalid credentials", async () => {
        expect.assertions(1);

        try {
          await exec(
            "twitter",
            "verify",
            "--access-token=123",
            "--access-token-secret=456"
          );
        } catch (err) {
          expect(err).toBeDefined();
        }
      });
    });

    describe("count", () => {
      it("returns the number of tweets", async () => {
        expect.assertions(1);

        const csv = join(__dirname, "../fixtures/tweets.csv");
        const stdout = await exec("twitter", "count", `--file=${csv}`);

        expect(stdout.trim()).toEqual("9");
      });
    });
  });
});
