type TimeUnit = 's' | 'm' | 'h' | 'd';

/**
 * Parses a duration string (e.g., "1h", "30m") and converts it to milliseconds.
 * @param duration - The duration string (e.g., "1h", "30m").
 * @returns The duration in milliseconds.
 */
function parseDurationToMilliseconds(duration: string): number {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) {
        throw new Error(`Invalid duration format: ${duration}`);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2] as TimeUnit;

    const unitToMilliseconds: Record<TimeUnit, number> = {
        s: 1000, // seconds
        m: 60 * 1000, // minutes
        h: 60 * 60 * 1000, // hours
        d: 24 * 60 * 60 * 1000, // days
    };

    return value * unitToMilliseconds[unit];
}

/**
 * Calculates the expire timestamp based on the current time and a duration string.
 * @param expireDuration - The duration string from the environment variable (e.g., "1h").
 * @returns The expire timestamp in milliseconds.
 */
export function calculateExpire(expireDuration: string | undefined): number {
    if (!expireDuration) {
        throw new Error('Expire duration is not defined in the environment.');
    }

    const durationInMilliseconds = parseDurationToMilliseconds(expireDuration);
    const currentTime = Date.now();

    return currentTime + durationInMilliseconds;
}
