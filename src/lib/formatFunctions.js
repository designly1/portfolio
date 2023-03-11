import imageResizerConfig from "@/constants/imageResizerConfig";

export function trim(str, chr) {
    var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^' + chr + '+|' + chr + '+$', 'g');
    return str.replace(rgxtrim, '');
}
export function rtrim(str, chr) {
    var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr + '+$');
    return str.replace(rgxtrim, '');
}
export function ltrim(str, chr) {
    var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^' + chr + '+');
    return str.replace(rgxtrim, '');
}

export function formatDate(str) {
    let date = new Date(str);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

export function stripAllNonNum(str) {
    return str.replace(/\D/g, '');
}

export function phoneToInt(str) {
    str = stripAllNonNum(str);
    return str.match(/^1/) ? `+${str}` : `+1${str}`;
}

export function mailToHref(email, name = null) {
    if (name) {
        return `mailto:${name} <${email}>`;
    } else {
        return `mailto:${email}`;
    }
}

export function maxImageWidth(maxWidth) {
    const useWidths = [];

    const setWidths = imageResizerConfig.srcSetWidths;
    setWidths.sort(function (a, b) {
        return a - b;
    });

    if (maxWidth < setWidths[0]) return setWidths[0];

    setWidths.forEach((w) => {
        if (!maxWidth || w <= maxWidth) {
            useWidths.push(w);
        }
    });

    useWidths.sort(function (a, b) {
        return a - b;
    });

    return useWidths.pop();
}