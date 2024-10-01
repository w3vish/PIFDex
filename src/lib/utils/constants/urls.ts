const cdnURL = "https://cdn.jsdelivr.net/gh/ViSurya/PIFDexFiles@main";
const apiURL = "/api"
const autogenImageURL = `${cdnURL}/graphics/autogen`;
const fusionImageURL = `${cdnURL}/graphics/fusions`;
const tripleImageURL = `${cdnURL}/graphics/triples`;
const baseImageURL = `${cdnURL}/graphics/base`
const notFoundImageURL = `${cdnURL}/graphics/extra/404.png`

const imageURLs = {
    autogen: autogenImageURL,
    fusion: fusionImageURL,
    triple: tripleImageURL,
    base: baseImageURL,
    notFound: notFoundImageURL,
    cdnURL: cdnURL
}

export { imageURLs, apiURL };


