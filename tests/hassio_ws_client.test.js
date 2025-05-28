import { HassWebSocketClient } from "../src/hassio_ws_client";

const TEST_URI = process.env.HASSIO_URI;
const TEST_TOKEN = process.env.HASSIO_TOKEN;

async function delay(ms) {
  return new Promise(resolve = setTimeout(resolve, ms));
}

describe("HassWebSocketClient Integration", () = {
  let client;

  beforeAll(async () = {
    client = new HassWebSocketClient(TEST_URI, TEST_TOKEN, (event) = {
      console.log("Received event:", event);
    });
    await client.connect();
  });

  afterAll(() = {
    client.close();
  });

  test("can ping Home Assistant", async () = {
    const response = await client.ping();
    expect(response.type).toBe("pong");
  });

  test("can fetch states", async () = {
    const response = await client.getStates();
    expect(response.type).toBe("result");
    expect(response.success).toBe(true);
    expect(Array.isArray(response.result)).toBe(true);
  });

  test("can fetch config", async () = {
    const response = await client.getConfig();
    expect(r