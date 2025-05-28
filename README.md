# IFTTT Hass.io Webhook Worker

This Cloudflare Worker acts as a webhook listener to receive motion/event-based notifications from Home Assistant (Hass.io), and can route them to other services like notifications or automation triggers.

## Features
- Accepts POST requests with a list of triggered `cameras`
- Basic event logging and routing logic
- Configurable using `HASSIO_URI` and `HASSIO_TOKEN` via Cloudflare Secrets
- Designed for integration with Home Assistant websocket and automation flows

## Setup
1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```
2. **Configure Secrets:**
   ```bash
   wrangler secret put HASSIO_URI
   wrangler secret put HASSIO_TOKEN
   ```
3. **Publish:**
   ```bash
   wrangler publish
   ```

## Example Payload
```json
{
  "cameras": ["camera.entry", "camera.garage"]
}
```

## TODO
- Add rate limiting and cooldown per entity
- Integrate with additional AI services for smart filtering and enrichment
- Extend routing logic with IFTTT-styl