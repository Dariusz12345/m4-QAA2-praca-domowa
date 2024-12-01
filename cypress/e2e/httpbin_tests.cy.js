describe('HTTPBin API Tests', () => {
    const baseUrl = 'https://httpbin.org';
  
    // Test 1: GET request without parameters
    it('GET request - no parameters', () => {
      cy.request(`${baseUrl}/get`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('url').and.contain('/get');
      });
    });
  
    // Test 2: GET request with query parameters
    it('GET request - with query parameters', () => {
      const queryParams = { param1: 'value1', param2: 'value2' };
      cy.request({ url: `${baseUrl}/get`, qs: queryParams }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.args).to.deep.equal(queryParams);
      });
    });
  
    // Test 3: POST request with JSON body
    it('POST request - JSON body', () => {
      const requestBody = { key: 'value', number: 123 };
      cy.request({
        method: 'POST',
        url: `${baseUrl}/post`,
        body: requestBody,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.json).to.deep.equal(requestBody);
      });
    });
  
    // Test 4: POST request with form-encoded data
    it('POST request - form data', () => {
      const formData = { field1: 'test', field2: 'data' };
      cy.request({
        method: 'POST',
        url: `${baseUrl}/post`,
        form: true,
        body: formData,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.form).to.deep.equal(formData);
      });
    });
  
    // Test 5: Sending and validating standard headers
    it('GET request - standard headers', () => {
      cy.request({
        url: `${baseUrl}/headers`,
        headers: { 'User-Agent': 'CypressTestAgent' },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.headers['User-Agent']).to.eq('CypressTestAgent');
      });
    });
  
    // Test 6: Sending and validating custom headers
    it('GET request - custom headers', () => {
      const customHeader = { 'x-custom-header': 'CustomValue' };
      cy.request({
        url: `${baseUrl}/headers`,
        headers: customHeader,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.headers['X-Custom-Header']).to.eq('CustomValue');
      });
    });
  
    // Test 7: Response time validation
    it('GET request - response time', () => {
      cy.request(`${baseUrl}/get`).then((response) => {
        expect(response.duration).to.be.lessThan(1000); // Sprawdź, czy odpowiedź jest szybsza niż 1000 ms
      });
    });
  
    // Test 8: PUT request
    it('PUT request - JSON body', () => {
      const requestBody = { key: 'update', value: 42 };
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/put`,
        body: requestBody,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.json).to.deep.equal(requestBody);
      });
    });
  
    // Test 9: DELETE request
    it('DELETE request', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/delete`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('url').and.contain('/delete');
      });
    });
  
    // Test 10: Randomized query parameters
    it('GET request - random query parameters', () => {
      const randomParam = `param${Math.floor(Math.random() * 100)}`;
      const randomValue = `value${Math.floor(Math.random() * 100)}`;
      cy.request({ url: `${baseUrl}/get`, qs: { [randomParam]: randomValue } }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.args[randomParam]).to.eq(randomValue);
      });
    });
  });
  