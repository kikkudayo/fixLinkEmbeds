# FixLinkEmbeds

A Vencord plugin that automatically fixes embeds from links by replacing them with Cloudflare worker alternatives. Messages are modified before sending to ensure links display proper embeds in Discord.

## Supported Platforms

The plugin automatically converts links from these platforms:

- **X/Twitter**: `x.com` → `fixupx.com`, `twitter.com` → `fxtwitter.com` ([FxEmbed](https://github.com/FxEmbed/FxEmbed))
- **Bluesky**: `bsky.app` → `fxbsky.app` ([FxEmbed](https://github.com/FxEmbed/FxEmbed))
- **TikTok**: `tiktok.com` → `tnktok.com` ([fxTikTok](https://github.com/okdargy/fxTikTok))
- **Instagram**: `instagram.com` → `kkinstagram.com` ([KKinstagram](https://github.com/kkscript/kk))
- **Reddit**: `reddit.com` → `rxddit.com` ([FixReddit](https://github.com/MinnDevelopment/fxreddit))
- **Pixiv**: `pixiv.net` → `phixiv.net` ([Phixiv](https://github.com/HazelTheWitch/phixiv))
- **Fur Affinity**: `furaffinity.net` → `fxfuraffinity.net` ([fxraffinity](https://fxraffinity.net/))
- **Twitch**: `twitch.tv`, `twitch.com` → `fxtwitch.seria.moe` ([fxtwitch](https://github.com/seriaati/fxtwitch))
- **Tumblr**: `tumblr.com` → `tpmblr.com` ([fxtumblr](https://tpmblr.com/))
- **DeviantArt**: `deviantart.com` → `fixdeviantart.com` ([fixDeviantArt](https://github.com/Tschrock/fixdeviantart))
- **Threads**: `threads.net`, `threads.com` → `vxthreads.net` ([vxThreads](https://github.com/everettsouthwick/vxthreads))
- **Spotify**: `spotify.com` → `fxspotify.com` ([fxspotify](https://github.com/lumyar/fxspotify))
- **Facebook**: `facebook.com` → `facebed.com` ([facebed](https://github.com/facebed/facebed))

## How It Works

When you send a message containing a link to one of the supported platforms, the plugin automatically replaces the domain with its embed-fixing alternative before the message is sent to Discord. This works for both new messages and message edits.

### Custom Providers

You can customize the replacement URL for each supported platform through the plugin settings. Configure it to a different provider to your liking. Leave a custom provider field empty to restore the default provider.

### Canceling a Link Transformation

You can prevent the plugin from transforming an individual link by adding a backslash (`\`) immediately before the link. The link will be sent without replacing it. The backslash is removed before the message is sent, so the original link is sent. This lets you bypass the automatic transformation for individual links without disabling the plugin or changing its settings.

## Installation

Install this as a Vencord custom plugin by following the official guide:
https://docs.vencord.dev/installing/custom-plugins/