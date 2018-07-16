/* eslint-disable */
const constant = require('./constant')
const Map = require('../ui/map')
const Logger = require('./util/Logger')
const Marker = require('./lib/Marker')
const Popup = require('./lib/Popup')
const Geometry = require('./lib/Geometry')
const Style = require('./lib/Style')
const DOM = require('../util/dom')
const Handler = require('./lib/Handler')
const NavigationControl = require('.././ui/control/navigation_control')
const Debugger = require('./util/Debugger')
const getLogConfig = require('./util/getLogConfig')

const { API_URL } = constant

const logoStyle = {
    'almond': 'black',
    'cha-thai': 'black',
    'charcoal': 'white',
    'cloudy': 'black',
    'hybrid': 'white',
    'ivory': 'black',
    'lightsteel': 'black',
    'midnight': 'white',
    'satellite': 'white',
    'spearmint': 'black',
    'terrain': 'black'
}
const logo = {
    'white': 'data:image/png;base64,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',
    'black': 'data:image/png;base64,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'
}

class MapmagicGL extends Map {
    constructor(options) {
        getLogConfig((config) => {
            process.env.LOGGING = config.isLogging
            process.env.DEBUG = config.isDebug;
            Logger.initLogger();
        })
        this.appId = options.appId || options.app_id
        this.styleURL = options.styleURL || options.style_url
        this.apiKey = options.apiKey || options.api_key
        this.options = options
        this.logoSrc = logo.black

        process.env.APP_ID = this.appId ? this.appId : 'ไม่ได้ใช้ Style mapmagic'

        if (!options.zoom) {
            options['zoom'] = 9;
        }
        let center = [100.49, 13.72]
        if (options.center) {
            if (options.center.lng && options.center.lat) {
                const { lng, lat } = options.center
                center = [lng, lat]
            }
        }
        options['center'] = center
        const newStyle = options.style
        options.style = undefined
        super(options)
        const styleUrl = this.getStyleUrl(options, newStyle)
        this.setStyle(styleUrl)

        if (options.protectScroll === true) {
            Handler.disabled(this);
        }
        if (options.navigationCtrl) {
            this.addControl(new NavigationControl())
        }
    }

    getStyleUrl(options, newStyle = null) {
        let styleUrl
        if (this.styleURL) {
            styleUrl = this.styleURL;
        } else {
            let style
            if (newStyle) {
                this.logoSrc = logo[logoStyle[newStyle]]
                style = newStyle
            } else {
                style = options.style ? options.style : 'ivory'
                if (options.style) {
                    this.logoSrc = logo[logoStyle[options.style]]
                }
            }
            styleUrl = `${API_URL}/${style}?app_id=${this.appId}&api_key=${this.apiKey}&lang=${options.lang}`;
            Debugger.alertMissingKey(this.appId || 'error', this.apiKey || 'error')
        }
        this.appendLogo();
        return styleUrl
    }

    setStyle(style, option = {}) {
        let styleUrl
        const validateUrl = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/
        const isStyleUrl = validateUrl.exec(style)
        if (isStyleUrl) {
            styleUrl = style
        } else {
            styleUrl = this.getStyleUrl(this.options, style)
        }
        super.setStyle(styleUrl, option)
    }

    appendLogo() {
        const logoElement = document.getElementsByClassName('mapmagic-logo')[0];
        if (logoElement) {
            this.updateLogo(logoElement)
        } else {
            this.createLogo()
        }
    }

    createLogo() {
        const element = document.getElementsByClassName('mapboxgl-ctrl-logo')[0];
        const logo = DOM.create('img', 'mapmagic-logo');
        element.href = 'https://www.mapmagic.co.th/';
        element.style.backgroundImage = 'none';
        logo.style.height = '90%';
        if (this._canvas.clientWidth < 340) {
            logo.style.height = '70%';
            logo.style.marginTop = '5px';
        }
        logo.src = this.logoSrc;
        element.appendChild(logo);
    }

    updateLogo(logoElement) {
        logoElement.src = this.logoSrc;
    }

}

Object.assign(MapmagicGL.prototype,
    Object.assign(
        Marker,
        Popup,
        Geometry,
        Style
    ));

module.exports = MapmagicGL;
