import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebService();

  async function waitForWebService() {
    return retry(fetchStatusPages, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPages() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

export default {
  waitForAllServices,
};
