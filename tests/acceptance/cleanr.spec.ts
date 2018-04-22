import { execFile } from "child_process";
import { join } from "path";

function exec(...params: string[]): Promise<string> {
  const node = join(__dirname, "../../node_modules/.bin/ts-node");
  const cleanr = join(__dirname, "../../src/cleanr.ts");

  return new Promise((resolve, reject) => {
    execFile(node, [cleanr, ...params], (err, stdout) => {
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

  describe("verify", () => {
    it("returns with a success response if there are valid credentials", async () => {
      expect.assertions(1);

      const result = await exec("verify");

      expect(result).toBeDefined();
    });

    it("returns with an error resonse if there are invalid credentials", async () => {
      expect.assertions(1);

      try {
        await exec("verify", "--access-token 123", "--access-token-secret 456");
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
