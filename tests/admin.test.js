const axios = require("axios");

describe("GET @/get all registered users", () => {
  it("should resend json object", async () => {
    try {
      const res = axios.get("http://localhost:3000/rpmt/users/login");
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    } catch (error) {
      console.log(error);
    }
  });
});

describe("GET @/filter user by user role ", () => {
  it("should resend with a 200 status code", async () => {
    try {
      const res = axios.get(
        "http://localhost:3000/rpmt/users/Filter?role=student"
      );
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });
});

// describe("POST @ /register new user", () => {
//   it("sould create new user", async () => {
//     try {
//       const res = axios.post("http://localhost:3000/rpmt/users/add", {
//         userID: "Thushara",
//         password: "Thiwanka",
//         role: "thushara123",
//       });

//       expect(res.status).toEqual(200);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });

describe("DELETE @ /delete usere by user ID", () => {
  it("should resend with a 200 status code", async () => {
    try {
      const res = axios.delete(
        "http://localhost:3000/rpmt/users/deleteByUserID/6299e8afdc3675c9cfeb43e0"
      );
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });
});
