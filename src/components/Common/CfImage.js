import { maxImageWidth } from "@/lib/formatFunctions";
import imageResizerConfig from "@/constants/imageResizerConfig";

export default function CfImage({
    defaultWidth = imageResizerConfig.srcSetDefaultWidth,
    maxWidth = null,
    src,
    className,
    alt,
    onClick,
    quality = imageResizerConfig.defaultQuality,
    loading
}) {
    const srcSet = [];

    imageResizerConfig.srcSetWidths.forEach((w) => {
        if (!maxWidth || w <= maxWidth) {
            srcSet.push(imageResizerConfig.cfSrcSetUrl.replace(/%WIDTH%/g, w).replace("%SRC%", src).replace("%QUALITY%", quality));
        }
    });

    if (defaultWidth > maxWidth) {
        defaultWidth = maxImageWidth(maxWidth);
    }

    const srcMain = imageResizerConfig.resizeUrl.replace(/%WIDTH%/g, defaultWidth).replace("%SRC%", src).replace("%QUALITY%", quality);

    return (
        <img className={className} src={srcMain} srcset={srcSet.join(',')} alt={alt} onClick={onClick} loading={loading} />
    );
}