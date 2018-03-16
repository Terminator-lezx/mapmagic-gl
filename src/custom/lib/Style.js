/* eslint-disable */
const logger = require('../util/Logger')

const initColorMap = function (payload = {}) {
    const INIT_MAP_COLOR_ID = 'sty-001'
    try {
    payload.layers.forEach(option => {
        const { layer, color } = option;
        if(!color) {
            logger.warn(INIT_MAP_COLOR_ID, 'missing color!')
        }
        if(!layer) {
            logger.warn(INIT_MAP_COLOR_ID, 'missing layer!')
        }
        let attribute = null;
        const layers = [];
        if (layer == 'street') {
            attribute = 'line-color';
            layers.push('tn-road_class1');
            layers.push('tn-road_class2');
            layers.push('tn-road_class2');
            layers.push('tn-road_class3');
        } else if (layer == 'water') {
            attribute = 'fill-color';
            layers.push('water');
            layers.push('tn-seath');
            layers.push('tn-water_polygon_4');
            layers.push('tn-water_polygon_3');
            layers.push('tn-water_polygon_2');
            layers.push('tn-water_polygon_1');
        } else if (layer == 'province') {
            attribute = 'fill-color';
            layers.push('tn-land_province');
        } else if (layer == 'area') {
            attribute = 'fill-color';
            layers.push('tn-area_gray');
            layers.push('tn-area_down');
        } else if (layer == 'building') {
            attribute = 'fill-color';
            layers.push('tn-area_bldg');
        }
        
            layers.forEach(value => {
                map.setPaintProperty(value, attribute, color);
            }) 
        })
        logger.info(INIT_MAP_COLOR_ID, payload)      
    } catch (error) {
        logger.error(INIT_MAP_COLOR_ID, error.message)
    }
};

module.exports = {
    initColorMap
};