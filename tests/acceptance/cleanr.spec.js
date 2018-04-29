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

describe("cleanr", () => {
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

    describe("select", () => {
      it("returns the whole list of identifiers if there is no criteria", async () => {
        expect.assertions(1);

        const csv = join(__dirname, "../fixtures/tweets.csv");
        const stdout = await exec("twitter", "select", `--file=${csv}`);

        const expected = [
          "983243866684973057",
          "981775211329662976",
          "981630168354705413",
          "981546684835606528",
          "980707155002130432",
          "980459529396727810",
          "979814031212064770",
          "979462972547457024",
          "979372356769546240"
        ].join("\n");

        expect(stdout.trim()).toEqual(expected);
      });

      it("returns the list of identifiers until the specified date", async () => {
        expect.assertions(1);

        const csv = join(__dirname, "../fixtures/tweets.csv");
        const stdout = await exec(
          "twitter",
          "select",
          `--file=${csv}`,
          "--until=2018-04-01"
        );

        const expected = [
          "979814031212064770",
          "979462972547457024",
          "979372356769546240"
        ].join("\n");

        expect(stdout.trim()).toEqual(expected);
      });
    });
  });
});
