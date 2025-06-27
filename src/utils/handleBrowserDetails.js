export const handleBrowserDetails = () => {

    function getOS() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.includes("Windows NT")) return "Windows";
        if (userAgent.includes("Mac OS X")) return "MacOS";
        if (userAgent.includes("Linux")) return "Linux";
        if (userAgent.includes("Android")) return "Android";
        if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";

        return "Unknown OS";
    }

    function getExactBrowserName() {
        const userAgent = navigator.userAgent;

        if (userAgent.includes("Firefox")) return "Firefox";
        if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Chrome";
        if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
        if (userAgent.includes("Edg")) return "MicrosoftEdge";
        if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
        if (userAgent.includes("MSIE") || userAgent.includes("Trident")) return "InternetExplorer";

        return "Unknown Browser";
    }

    const os = getOS();
    const browserName = getExactBrowserName();
    const networkType = navigator.connection.effectiveType;
    const deviceMemory = navigator.deviceMemory + " GB";
    const language = navigator.language;

    return { os, browserName, networkType, deviceMemory, language};

}