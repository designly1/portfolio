import React from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';

export default function ShareButtons({ type = "song", title = "", slug = "" }) {
    const artist = "Designly";
    const shareTitle = `${artist} - ${title}`;
    const pref = process.env.NEXT_PUBLIC_BASE_URL;

    let shareObject = "";
    let slugRoute = "";
    switch(type) {
        case "song":
            shareObject = "Song";
            slugRoute = "/discography";
            break;
        case "album":
            shareObject = "Album";
            slugRoute = "/album";
            break;
        case "article":
            shareObject = "Article";
            slugRoute = "/blog/post";
            break;
    }
    const canonicalUrl = `${pref}${slugRoute}/${slug}`;

    const emailSubject = `Check out this ${shareObject} by ${artist}.`;
    const emailBody = `Hey, I just wanted to let you know I found this cool ${shareObject} by ${artist}. You should check it out!`;
    const socialText = `Hey all! I just wanted to let you know I found this cool ${shareObject} by ${artist}. You should check it out!`;
    const socialIconSize = 30;
    const titleHash = title.replace(/[^a-z0-9]/gi, '');

    return (
        <div>
            <FacebookShareButton hashtag={`#Designly`} url={canonicalUrl}>
                <FacebookIcon size={socialIconSize} />
            </FacebookShareButton>
            <TwitterShareButton title={socialText} hashtags={["Designly"]} url={canonicalUrl}>
                <TwitterIcon size={socialIconSize} />
            </TwitterShareButton>
            <WhatsappShareButton title={emailBody} url={canonicalUrl}>
                <WhatsappIcon size={socialIconSize} />
            </WhatsappShareButton>
            <LinkedinShareButton title={socialText} summary={socialText} source={artist} url={canonicalUrl}>
                <LinkedinIcon size={socialIconSize} />
            </LinkedinShareButton>
            <RedditShareButton title={shareTitle} url={canonicalUrl}>
                <RedditIcon size={socialIconSize} />
            </RedditShareButton>
            <EmailShareButton subject={emailSubject} body={emailBody} url={canonicalUrl}>
                <EmailIcon size={socialIconSize} />
            </EmailShareButton>
        </div>
    );
}