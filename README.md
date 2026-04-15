# FixLinkEmbeds

A Vencord plugin that automatically fixes embeds from links by replacing them with Cloudflare worker alternatives. Messages are modified before sending to ensure links display proper embeds in Discord.

## Supported Platforms

The plugin automatically converts links from these platforms:

- **X/Twitter**: `x.com` → `fixupx.com`, `twitter.com` → `fxtwitter.com`
- **Bluesky**: `bsky.app` → `fxbsky.app`
- **TikTok**: `tiktok.com` → `tnktok.com`
- **Instagram**: `instagram.com` → `kkinstagram.com`
- **Reddit**: `reddit.com` → `rxddit.com`
- **Pixiv**: `pixiv.com` → `phixiv.com`
- **Fur Affinity**: `furaffinity.com` → `fxfuraffinity.com`
- **Twitch**: `twitch.tv` → `fxtwitch.seria.moe`
- **Tumblr**: `tumblr.com` → `tpmblr.com`
- **DeviantArt**: `deviantart.com` → `fixdeviantart.com`
- **Threads**: `threads.net` → `vxthreads.net`
- **Spotify**: `spotify.com` → `fxspotify.com`

## How It Works

When you send a message containing a link to one of the supported platforms, the plugin automatically replaces the domain with its embed-fixing alternative before the message is sent to Discord. This works for both new messages and message edits.

The plugin also handles:
- URLs with `www.` prefix
- Preservation of URL paths and query parameters
- Safe error handling for malformed URLs
