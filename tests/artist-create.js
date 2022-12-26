/* eslint-disable no-undef */
const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("create artist", () => {
  describe("/artist", () => {
    describe("POST", () => {
      it("creates a new artist in the database", async () => {
        const { status, body } = await request(app).post("/artist").send({
          name: "Tame impala",
          genre: "Rock",
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal("Tame impala");
        expect(body.genre).to.equal("Rock");

        const {
          rows: [artistData],
        } = await db.query(`SELECT * FROM Artists WHERE id = ${body.id}`);
        expect(artistData.name).to.equal("Tame impala");
        expect(artistData.genre).to.equal("Rock");
      });
    });
  });
});
