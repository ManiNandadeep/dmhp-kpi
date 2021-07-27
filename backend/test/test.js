// Unit tests for the node.js backend


const pactum = require('pactum');


/*
    Sanity check to see if Pactum is running properly
*/
it('Pactum is working properly.', async () => {
        await pactum.spec()
          .get('http://httpbin.org/status/418')
          .expectStatus(418);
});

/*
    Sanity check to make sure that our API is active
*/
it('The API is active.', async () => {
    await pactum.spec()
      .get('http://localhost:3000/')
      .expectStatus(200);
});


