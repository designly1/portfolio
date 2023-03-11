const resizeUrl = "https://cdn.designly.biz/imgr%SRC%?w=%WIDTH%&q=%QUALITY%";

const imageResizerConfig = {
    resizeUrl: resizeUrl,
    cfSrcSetUrl: resizeUrl + " %WIDTH%w",
    srcSetWidths: [640, 768, 1024, 1366, 1600, 1920],
    srcSetDefaultWidth: 1024,
    placeholderImage: "/images/pixel-black.png",
    defaultQuality: 90,
    blogThumbQuality: 60
};

export default imageResizerConfig;