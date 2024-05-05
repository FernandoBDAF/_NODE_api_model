// describe("user handlers", () => {
//     it("should do something", () => {
//         expect(true).toBe(true);
//     })
// })

import * as user from "../../handlers/user";

describe("user handlers", () => {
  it("should do something", async () => {
    const req = {
      body: {
        email: "f@f",
        password: "f",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await user.createUser(req, res, () => {});
    expect(true).toBe(true);
  });
});
