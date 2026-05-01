import log from 'loglevel';

// https://www.npmjs.com/package/loglevel

if (import.meta.env.DEV) {
    log.setLevel('trace');
}
else {
    log.setLevel('warn');
}

// Prefix logs with a timestamp so you know exactly when things happen
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);
    return function (...args) {
        const time = new Date().toISOString().split('T')[1].slice(0, -1); // Gets HH:MM:SS.mmm
        rawMethod(`[${time}] ${methodName.toUpperCase()}:`, ...args);
    };
};
log.rebuild(); // Apply the custom prefix

export default log;