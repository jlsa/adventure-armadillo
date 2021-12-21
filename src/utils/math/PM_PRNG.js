/**
 * Implementation of the Park Miller (1988) "minimal standard" linear 
 * congruential pseudo-random number generator.
 * 
 * For a full explanation visit: http://www.firstpr.com.au/dsp/rand31/
 * 
 * The generator uses a modulus constant (m) of 2^31 - 1 which is a
 * Mersenne Prime number and a full-period-multiplier of 16807.
 * Output is a 31 bit unsigned integer. The range of values output is
 * 1 to 2,147,483,646 (2^31-1) and the seed must be in this range too.
 * 
 * David G. Carta's optimisation which needs only 32 bit integer math,
 * and no division is actually *slower* in flash (both AS2 & AS3) so
 * it's better to use the double-precision floating point version.
 * 
 * @author Michael Baczynski, www.polygonal.de
 * @author Alexander Veenendaal, opendoorgonorth.com
 * @author Joël Hoekstra, github.com/jlsa
 */
class PM_PRNG {
    /**
     * Set seed with a 31 bit unsigned integer
     * between 1 and 0x7FFFFFFE inclusive. Don't use 0!
     * 
     * @param {int} seed 
     */

    constructor(seed = 1) {
        if (seed === 0) {
            seed = 1
        }
        this.seed = seed
    }

    /**
     * Provides the next pseudorandom number
     * as an unsigned integer (31 bits)
     * 
     * @returns int
     */
    nextInt() {
        return this.gen()
    }

    /**
     * Provides the next pseudorandom number
     * as a float between a given range.
     * 
     * @returns float
     */
    nextDouble() {
        return (this.gen() / 2147483647)
    }

    /**
     * Provides the next pseudorandom number
     * as an unsigned integer (31 bits) between
     * a given range.
     * 
     * @param {int} min 
     * @param {int} max 
     * @returns float
     */
    nextIntRange(min, max) {
        // min -= .4999
        // max += .4999
        return Math.round(min + ((max - min) * this.nextDouble()))
    }

    /**
     * Provides the next pseudorandom number
     * as a float between a given range.
     * 
     * @param {float} min 
     * @param {float} max 
     * @returns double
     */
    nextDoubleRange(min, max) {
        return min + ((max - min) * this.nextDouble())
    }

    gen() {
        // integer version 1, for max int 2^46 - 1 or larger.
        return this.seed = (this.seed * 16807) % 2147483647
    }
}

module.exports = PM_PRNG