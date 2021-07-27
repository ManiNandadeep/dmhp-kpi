// Unit tests for the node.js backend

const pactum = require("pactum");
var expected = require("./expected");
const bearerToken = expected.bearerToken;

/*
    Sanity check to see if Pactum is running properly
*/
it("Pactum is working properly.", async () => {
    await pactum.spec().get("http://httpbin.org/status/418").expectStatus(418);
});

/*
    Sanity check to make sure that our API is active
*/
it("The API is active.", async () => {
    await pactum.spec().get("http://localhost:3000/").expectStatus(200);
});

/*
    tbl_training API Testing
    http://localhost:3000/training
*/
it("Check status code for tbl_training", async () => {
    let trainingBody = expected.tbl_training_body;
    await pactum
        .spec()
        .post("http://localhost:3000/training")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(trainingBody)
        .expectStatus(200);
});

it("Check output for tbl_training", async () => {
    let trainingBody = expected.tbl_training_body;

    let responseBody = expected.tbl_training_response;

    await pactum
        .spec()
        .post("http://localhost:3000/training")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(trainingBody)
        .expectBody(responseBody);
});

/*
    tbl_DistrictExpense API Testing
    http://localhost:3000/districtexpense
*/
it("Check status code for tbl_districtExpense", async () => {
    let districtExpenseBody = expected.tbl_districtExpense_body;
    await pactum
        .spec()
        .post("http://localhost:3000/districtexpense")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtExpenseBody)
        .expectStatus(200);
});

it("Check output for tbl_districtExpense", async () => {
    let districtExpenseBody = expected.tbl_districtExpense_body;

    let responseBody = expected.tbl_districtExpense_response;

    await pactum
        .spec()
        .post("http://localhost:3000/districtexpense")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtExpenseBody)
        .expectBody(responseBody);
});
