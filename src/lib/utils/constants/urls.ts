const cdnURL = "https://cdn.jsdelivr.net/gh/w3vish/infinitefusion-graphics@master";
const apiURL = "https://pokewiki-api.onrender.com/infinitefusion"
const siteURL = "https://infinitefusion.org"
const autogenImageURL = `${cdnURL}/Battlers`;
const fusionImageURL = `${cdnURL}/CustomBattlers`;
const tripleImageURL = `${cdnURL}/Other/Triples`;
const baseImageURL = `${cdnURL}/Other/BaseSprites`
const notFoundImageURL = `${cdnURL}/graphics/extra/404.png`

const imageURLs = {
    autogen: autogenImageURL,
    fusion: fusionImageURL,
    triple: tripleImageURL,
    base: baseImageURL,
    notFound: notFoundImageURL,
    cdnURL: cdnURL
}

export { imageURLs, apiURL, siteURL };


