import {app} from '../server';
import supertest from 'supertest';

describe("GET /", () => {
    it("should send back some data", async () => {
        const response = await supertest(app).get("/");
        expect(response.body).toEqual({message: "Hello world"});
    })
})