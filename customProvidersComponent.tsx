import { Button, Forms, TextInput, useState } from "@webpack/common";
import { PluginSettingComponentProps } from "@utils/types";
import { settings } from "./index";

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

function isValidCustomUrl(value: string): boolean {
    if (!value) return true;

    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

export function CustomProvidersComponent({
    setValue
}: PluginSettingComponentProps) {
    const [customProviders, setCustomProviders] = useState<
        Record<string, string>
    >(() => ({
        ...settings.store.customProviders
    }));

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (domain: string, value: string) => {
        const trimmedValue = value.trim();

        const updated = {
            ...customProviders
        };

        if (trimmedValue) {
            updated[domain] = trimmedValue;
        } else {
            delete updated[domain];
        }

        setCustomProviders(updated);

        // Empty value: restore default
        if (!trimmedValue) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[domain];
                return next;
            });

            setValue(updated);
            return;
        }

        // Invalid value: keep visible, but don't save
        if (!isValidCustomUrl(trimmedValue)) {
            setErrors(prev => ({
                ...prev,
                [domain]: "Enter a valid URL"
            }));

            return;
        }

        // Valid value: clear error and save
        setErrors(prev => {
            const next = { ...prev };
            delete next[domain];
            return next;
        });

        setValue(updated);
    };

    const handleReset = () => {
        setCustomProviders({});
        setErrors({});
        setValue({});
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}
        >
            <div
                style={{
                    maxHeight: "420px",
                    overflowY: "auto",
                    border: "1px solid var(--background-secondary)",
                    borderRadius: "8px",
                    padding: "12px",
                    background: "var(--background-primary)"
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "140px minmax(0, 1fr)",
                        gap: "8px 12px",
                        alignItems: "center",
                        fontSize: "12px",
                        marginBottom: "8px",
                        color: "var(--text-muted)",
                        fontWeight: 600
                    }}
                >
                    <div>Domain</div>
                    <div>Custom URL</div>
                </div>

                {Object.entries(DOMAIN_REPLACEMENTS).map(
                    ([originalDomain, defaultProvider]) => {
                        const customValue =
                            customProviders[originalDomain] ?? "";

                        const hasError = !!errors[originalDomain];

                        const isDefault = !customValue;

                        return (
                            <div
                                key={originalDomain}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "140px minmax(0, 1fr)",
                                    gap: "8px 12px",
                                    alignItems: "start",
                                    padding: "8px 0",
                                    borderTop:
                                        "1px solid var(--background-secondary)"
                                }}
                            >
                                {/* Domain */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "center",
                                        gap: "2px",
                                        minHeight: "40px"
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        {originalDomain}
                                    </span>

                                    {/* Default or custom provider */}
                                    <span
                                        style={{
                                            fontSize: "10px",
                                            color: isDefault
                                                ? "var(--text-positive)"
                                                : "var(--text-muted)",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "140px"
                                        }}
                                    >
                                        {isDefault
                                            ? "default"
                                            : customValue}
                                    </span>
                                </div>

                                {/* Input + error */}
                                <div
                                    style={{
                                        width: "100%"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            border: hasError
                                                ? "1px solid var(--text-danger)"
                                                : "1px solid transparent",
                                            borderRadius: "5px",
                                            boxSizing: "border-box"
                                        }}
                                    >
                                        <TextInput
                                            type="text"
                                            placeholder={`https://${defaultProvider}`}
                                            value={customValue}
                                            onChange={(value: string) =>
                                                handleChange(
                                                    originalDomain,
                                                    value
                                                )
                                            }
                                            style={{
                                                width: "100%",
                                                height: "40px"
                                            }}
                                        />
                                    </div>

                                    {hasError && (
                                        <div
                                            style={{
                                                marginTop: "4px",
                                                color: "var(--text-danger)",
                                                fontSize: "11px"
                                            }}
                                        >
                                            {errors[originalDomain]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                )}
            </div>

            {/* Bottom controls */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px"
                }}
            >
                <span
                    style={{
                        fontSize: "12px",
                        color: "var(--text-muted)"
                    }}
                >
                    Leave a field empty to use the default provider.
                </span>

                <Button
                    color={Button.Colors.RED}
                    size={Button.Sizes.SMALL}
                    onClick={handleReset}
                >
                    Reset Links to Defaults
                </Button>
            </div>
        </div>
    );
}