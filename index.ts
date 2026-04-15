import { MessageObject } from "@api/MessageEvents";
import definePlugin from "@utils/types";

const DOMAIN_REPLACEMENTS: Record<string, string> = {
    "x.com": "fixupx.com",
    "twitter.com": "fxtwitter.com",
    "bsky.app": "fxbsky.app",
    "tiktok.com": "tnktok.com",
    "instagram.com": "kkinstagram.com",
    "reddit.com": "rxddit.com",
    "pixiv.com": "phixiv.com",
    "furaffinity.net": "fxfuraffinity.net",
    "twitch.tv": "fxtwitch.seria.moe",
    "tumblr.com": "tpmblr.com",
    "deviantart.com": "fixdeviantart.com",
    "threads.net": "vxthreads.net",
    "spotify.com": "fxspotify.com",
};

function getBaseDomain(hostname: string): string {
    const parts = hostname.split(".");
    if (parts.length <= 2) return hostname;
    return parts.slice(-2).join(".");
}

export default definePlugin({
    name: "FixLinkEmbeds",
    description: "Automatically fixes embeds from links by modifying URLs before sending.",
    authors: [],

    fixUrl(urlString: string): string {
        try {
            // ensure valid URL
            const url = new URL(urlString);
            const baseDomain = getBaseDomain(url.hostname);

            const replacement = DOMAIN_REPLACEMENTS[baseDomain];
            if (!replacement) return urlString;

            url.hostname = replacement;
            return url.toString();
        } catch {
            return urlString;
        }
    },

    cleanMessage(msg: MessageObject) {
        if (!msg?.content) return;

        msg.content = msg.content.replace(
            /https?:\/\/\S+/g,
            (match) => this.fixUrl(match)
        );
    },

    onBeforeMessageSend(_, msg) {
        this.cleanMessage(msg);
        // debug:
        // console.log("Modified message:", msg.content);
    },

    onBeforeMessageEdit(_cid, _mid, msg) {
        this.cleanMessage(msg);
    },

    start() { },
    stop() { },
});