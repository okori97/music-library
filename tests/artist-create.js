/* eslint-disable no-undef */
const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");

describe("create artist", () => {
  describe("/artist", () => {
    describe("POST", () => {
      it("creates a new artist in the database", async () => {
        const res = await request(app).post("/artist").send({
          name: "tame impala",
          genre: "rock",
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});
