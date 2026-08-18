import { MessageObject } from "@api/MessageEvents";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { CustomProvidersComponent } from "./customProvidersComponent";

export const DOMAIN_REPLACEMENTS: Record<string, string> = {
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
    return (
        Object.keys(DOMAIN_REPLACEMENTS).find(
            domain => host === domain || host.endsWith("." + domain)
        ) ?? null
    );
}

export const settings = definePluginSettings(
    {
        useCustomProviders: {
            type: OptionType.BOOLEAN,
            description: "Enable custom embed-fixing alternative providers",
            default: false
        },

        customProviders: {
            type: OptionType.COMPONENT,
            description: "Custom Provider URLs",
            default: {} as Record<string, string>,
            component: CustomProvidersComponent
        }
    },
    {
        customProviders: {
            hidden() {
                return !this.store.useCustomProviders;
            }
        }
    }
);

export default definePlugin({
    name: "FixLinkEmbeds",

    description:
        "Automatically fixes embeds from links by modifying URLs to use proxy providers before sending. Add \\ before a supported link to cancel transformation.",

    authors: [],

    settings,

    fixUrl(urlString: string): string {
        try {
            const url = new URL(urlString);
            const domain = matchDomain(url.hostname);

            if (!domain) {
                return urlString;
            }

            if (settings.store.useCustomProviders) {
                const customProvider =
                    settings.store.customProviders?.[domain];

                if (customProvider) {
                    try {
                        const customUrl = new URL(customProvider);

                        // Replace only the hostname.
                        // The original URL path/query/hash is preserved.
                        url.hostname = customUrl.hostname;

                        return url.toString();
                    } catch {
                        // Invalid custom provider.
                        // Fall back to the default provider below.
                    }
                }
            }

            url.hostname = DOMAIN_REPLACEMENTS[domain];

            return url.toString();
        } catch {
            return urlString;
        }
    },

    cleanMessage(msg: MessageObject) {
        if (!msg?.content) {
            return;
        }

        msg.content = msg.content.replace(
            /\\?(https?:\/\/[^\s<>()]+)/g,
            match => {
                if (match.startsWith("\\")) {
                    return match.slice(1);
                }

                return this.fixUrl(match);
            }
        );
    },

    onBeforeMessageSend(_, msg) {
        this.cleanMessage(msg);
    },

    onBeforeMessageEdit(_cid, _mid, msg) {
        this.cleanMessage(msg);
    },

    start() {},

    stop() {}
});