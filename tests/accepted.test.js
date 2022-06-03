const axios = require("axios");

describe("GET @/get all registered users", () => {
  it("should resend json object", async () => {
    try {
      const res = axios.get("http://localhost:3000/rpmt/acceptedTopics");
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    } catch (error) {
      console.log(error);
    }
  });
});
