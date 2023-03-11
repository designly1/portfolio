import { Component } from 'react';
import Script from 'next/script'
import ShareButtons from './ShareButtons';
import { siteConfig } from '@/constants/siteConfig';

export default class ShareLikeWidget extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.url;
        this.title = this.props.title;
        this.slug = this.props.slug;
    }
    render() {
        return (
            <>
                <div className="fb-like-widget">
                    <ShareButtons type="article" title={this.title} slug={this.slug} />
                    <div style={{ marginTop: "1em" }} className="fb-like" data-href={this.url} data-width="" data-layout="button_count" data-action="like" data-size="large" data-share="true"></div>
                </div>
                <Script async defer crossorigin="anonymous"
                    src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=${siteConfig.facebookAppId}&autoLogAppEvents=1`}
                    nonce="tEWREHOL"></Script>
            </>
        );
    }
}