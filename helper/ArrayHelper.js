var ArrayHelper = {
    /**
     *
     * @param array
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    getValue: function (array, key, defaultValue) {
        defaultValue = undefined === defaultValue ? null : defaultValue;
        if (array && key && typeof(array) == 'object') {
            var index = key.indexOf('.');
            if (index !== -1) {
                var prevKey = key.substr(0, index),
                    nextKey = key.substr(index + 1, key.length);
                return this.getValue(array[prevKey], nextKey, defaultValue);
            } else if(array[key] !== undefined) {
                return array[key];
            }
        }

        return defaultValue;
    }
};