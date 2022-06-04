const axios = require("axios");

describe("GET @/get all registered users", () => {
  it("should resend json object", async () => {
    try {
      const res = axios.get("http://localhost:3000/rpmt/research/");
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    } catch (error) {
      console.log(error);
    }
  });
});

describe("GET @/student group registation", () => {
  it("should resend json object", async () => {
    try {
      const res = axios.post("http://localhost:3000/rpmt/group/add/");
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    } catch (error) {
      console.log(error);
    }
  });
});

describe("POST @ /student group registation", () => {
  it("should resend json object", async () => {
    try {
      const res = axios.post("http://localhost:3000/rpmt/group/add/", {
        studentID: "IT19063324",
        leader: "Thuvaraga T.",
        member1: "Theeban",
        member2: "Kanishakar",
        member3: "Ananthan",
      });
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });
});

describe("GET @/get All Templates", () => {
  it("should resend json object", async () => {
    try {
      const res = axios.post("http://localhost:3000/rpmt/templates/");
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    } catch (error) {
      console.log(error);
    }
  });
});
