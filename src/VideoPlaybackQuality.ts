const isBrowser = (): boolean => {
    if (typeof window === "undefined") {
        return false;
    }
    return "HTMLVideoElement" in window;
};

export const isSupported = () => {
    if (!isBrowser()) {
        return false;
    }

    if (HTMLVideoElement.prototype.getVideoPlaybackQuality) {
        return true;
    }

    // has not getVideoPlaybackQuality, but has webkit prefix method
    return "webkitDroppedFrameCount" in HTMLVideoElement.prototype;
};

/**
 * Install the polyfill if needed.
 */
export const installPolyfill = () => {
    if (!isBrowser()) {
        return; // ignore non-browser
    }
    if (isSupported()) {
        return;
    }

    const proto = HTMLVideoElement.prototype;
    // Add polyfill method
    proto.getVideoPlaybackQuality = function(this: HTMLVideoElement) {
        return getVideoPlaybackQuality(this);
    };
};

/**
 * Ponyfill version of Video.prototype.getVideoPlaybackQuality
 */
export const getVideoPlaybackQuality = (video: HTMLVideoElement): VideoPlaybackQuality => {
    if (isSupported()) {
        return video.getVideoPlaybackQuality();
    }
    const webKitVideo = video as any;
    return {
        droppedVideoFrames: webKitVideo.webkitDroppedFrameCount,
        totalVideoFrames: webKitVideo.webkitDecodedFrameCount,
        // Not provided by this polyfill:
        corruptedVideoFrames: 0,
        creationTime: NaN,
        totalFrameDelay: 0 // Moz extension
    };
};