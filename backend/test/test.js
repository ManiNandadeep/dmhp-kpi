// Unit tests for the node.js backend

const pactum = require("pactum");
var expected = require("./expected");
var bearerToken = expected.bearerToken;
const helpers = require("../validation/helpers");
const got = require('got');
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

/*
    Bearer Token Logic
*/
got('http://localhost:3000/api/auth', { json: 
    {
        username:"dmhp",
        password: process.env.AUTH_PASSWORD
    }

}).then(response => {
    bearerToken = response.body.token;
}).catch(error => {
  console.log(error.response.body);
  bearerToken = expected.bearerToken;
});




/*
    Synchronous Check for Validators
*/




// Date Safe Function
if(helpers.returnDateSafeSQL("","2020-01-01") === false && helpers.returnDateSafeSQL("2020-01-01","2019-01-01") === false && helpers.returnDateSafeSQL("2020-01-01","2021-01-01") === true){
    console.log("✔️ Return Date Safe.");
}

else{
    console.log("❌ Return Date Safe Function.");
}

// Check if all elements in an array are non-negative Function
if(helpers.checkIfAllArrayElementsAreNonNegativeErrorString("").flag === true && helpers.checkIfAllArrayElementsAreNonNegativeErrorString("0,1").flag === true && helpers.checkIfAllArrayElementsAreNonNegativeErrorString("-1").flag === false){
    console.log("✔️ Check all non-negative function.");
}

else{
    console.log("❌ Check all non-negative function.");
}

// Check if an object is present in an array Function
if(helpers.checkObjInArrErrorString("a",[]).flag === false && helpers.checkObjInArrErrorString("1","1,2,3").flag === true && helpers.checkObjInArrErrorString(null,[]).flag === false){
    console.log("✔️ Check if object in array function.");
}

else{
    console.log("❌ Check if object in array function.");
}


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
    Sanity check to check if authorisation returns 401 if no password is sent.
*/
it("Auth route returns 401 status code if no password is sent.", async () => {
    await pactum
        .spec()
        .post("http://localhost:3000/api/auth")
        .expectStatus(401);
});

/*
    API Auth Testing
*/
it("Auth route returns 200 status code with correct parameters.", async () => {
    await pactum
        .spec()
        .post("http://localhost:3000/api/auth")
        .withBody(expected.authBody)
        .expectStatus(200);
});

/*
    Training Table API Testing
    http://localhost:3000/training
*/

it("tbl_training only allows Authorised access.", async () => {
    let trainingBody = expected.tbl_training_body;
    await pactum
        .spec()
        .post("http://localhost:3000/training")
        .withBody(trainingBody)
        .expectStatus(401);
});

it("Check status code for tbl_training.", async () => {
    let trainingBody = expected.tbl_training_body;
    await pactum
        .spec()
        .post("http://localhost:3000/training")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(trainingBody)
        .expectStatus(200);
});

it("Check output for tbl_training.", async () => {
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
    District Expense Table API Testing
    http://localhost:3000/districtexpense
*/

it("tbl_districtExpense only allows Authorised access.", async () => {
    let districtExpenseBody = expected.tbl_districtExpense_body;
    await pactum
        .spec()
        .post("http://localhost:3000/districtexpense")
        .withBody(districtExpenseBody)
        .expectStatus(401);
});

it("Check status code for tbl_districtExpense.", async () => {
    let districtExpenseBody = expected.tbl_districtExpense_body;
    await pactum
        .spec()
        .post("http://localhost:3000/districtexpense")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtExpenseBody)
        .expectStatus(200);
});

it("Check output for tbl_districtExpense.", async () => {
    let districtExpenseBody = expected.tbl_districtExpense_body;

    let responseBody = expected.tbl_districtExpense_response;

    await pactum
        .spec()
        .post("http://localhost:3000/districtexpense")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtExpenseBody)
        .expectBody(responseBody);
});

/*
    Manasadhara Table API Testing
    http://localhost:3000/manasadhara
*/

it("tbl_districtManasadhara only allows Authorised access.", async () => {
    const districtMNSBody = expected.tbl_districtMNS_body;
    await pactum
        .spec()
        .post("http://localhost:3000/manasadhara")
        .withBody(districtMNSBody)
        .expectStatus(401);
});

it("Check status code for tbl_districtManasadhara.", async () => {
    const districtMNSBody = expected.tbl_districtMNS_body;
    await pactum
        .spec()
        .post("http://localhost:3000/manasadhara")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtMNSBody)
        .expectStatus(200);
});

it("Check output for tbl_districtManasadhara.", async () => {
    const districtMNSBody = expected.tbl_districtMNS_body;
    const responseBody = expected.tbl_districtMNS_response;

    await pactum
        .spec()
        .post("http://localhost:3000/manasadhara")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(districtMNSBody)
        .expectBody(responseBody);
});

/*
    MNS AlloAction Table API Testing
    http://localhost:3000/mnsallocation
*/

it("tbl_MNSAlloAction only allows Authorised access.", async () => {
    const MNSAllocationBody = expected.tbl_MNSAllocation_body;
    await pactum
        .spec()
        .post("http://localhost:3000/mnsallocation")
        .withBody(MNSAllocationBody)
        .expectStatus(401);
});

it("Check status code for tbl_MNSAlloAction.", async () => {
    const MNSAllocationBody = expected.tbl_MNSAllocation_body;
    await pactum
        .spec()
        .post("http://localhost:3000/mnsallocation")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(MNSAllocationBody)
        .expectStatus(200);
});

it("Check output for tbl_MNSAlloAction.", async () => {
    const MNSAllocationBody = expected.tbl_MNSAllocation_body;
    const responseBody = expected.tbl_MNSAllocation_response;

    await pactum
        .spec()
        .post("http://localhost:3000/mnsallocation")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(MNSAllocationBody)
        .expectBody(responseBody);
});

/*
    HR Table API Testing
    http://localhost:3000/hr
*/

it("tbl_HR only allows Authorised access.", async () => {
    const HRBody = expected.tbl_HR_body;
    await pactum
        .spec()
        .post("http://localhost:3000/hr")
        .withBody(HRBody)
        .expectStatus(401);
});

it("Check status code for tbl_HR.", async () => {
    const HRBody = expected.tbl_HR_body;
    await pactum
        .spec()
        .post("http://localhost:3000/hr")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(HRBody)
        .expectStatus(200);
});

it("Check output for tbl_HR.", async () => {
    const HRBody = expected.tbl_HR_body;
    const responseBody = expected.tbl_HR_response;

    await pactum
        .spec()
        .post("http://localhost:3000/hr")
        .withHeaders("Authorization", `Bearer ${bearerToken}`)
        .withBody(HRBody)
        .expectBody(responseBody);
});


