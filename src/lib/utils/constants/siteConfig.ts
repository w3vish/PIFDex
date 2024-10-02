interface SiteConfig {
    siteName: string,
    siteURL: string,
    siteLinks: {
        github: string,
        x: string,
        discord: string
    }
}

const siteConfig: SiteConfig = {
    siteName: "InfiniteFusion.org",
    siteURL: "https://infinitefusion.org",
    siteLinks: {
        github: "https://github.com/w3wish",
        x: "https://x.com/w3vish",
        discord: "https://discordapp.com/users/889377114728591470"
    }
}

export { siteConfig }