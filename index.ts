import { MessageObject } from "@api/MessageEvents";
import definePlugin from "@utils/types";

const DOMAIN_REPLACEMENTS: Record<string, string> = {
    "x.com": "fixupx.com",
    "twitter.com": "fxtwitter.com",
    "bsky.app": "fxbsky.app",
    "tiktok.com": "tnktok.com",
    "instagram.com": "kkinstagram.com",
    "reddit.com": "rxddit.com",
    "pixiv.net": "phixiv.net",
    "furaffinity.net": "fxfuraffinity.net",
    "twitch.tv": "fxtwitch.seria.moe",
    "twitch.com": "fxtwitch.seria.moe",
    "tumblr.com": "tpmblr.com",
    "deviantart.com": "fixdeviantart.com",
    "threads.net": "vxthreads.net",
    "threads.com": "vxthreads.net",
    "spotify.com": "fxspotify.com",
    "facebook.com": "facebed.com"
};



function matchDomain(host: string): string | null {
    return Object.keys(DOMAIN_REPLACEMENTS)
        .find(d => host === d || host.endsWith("." + d)) ?? null;
}


export default definePlugin({
    name: "FixLinkEmbeds",
    description: "Automatically fixes embeds from links by modifying URLs before sending.",
    authors: [],

    fixUrl(urlString: string): string {
        try {
            const url = new URL(urlString);
            const domain = matchDomain(url.hostname);
            if (!domain) return urlString;
            
            url.hostname = DOMAIN_REPLACEMENTS[domain];
            return url.toString();

        } catch {
            return urlString;
        }
    },

    cleanMessage(msg: MessageObject) {
        if (!msg?.content) return;

        msg.content = msg.content.replace(
        /https?:\/\/[^\s<>()]+/g,
            (match) => this.fixUrl(match)
        );
    },

    onBeforeMessageSend(_, msg) {
        this.cleanMessage(msg);
    },

    onBeforeMessageEdit(_cid, _mid, msg) {
        this.cleanMessage(msg);
    },

    start() { },
    stop() { },
});