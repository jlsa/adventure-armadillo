const PM_PRNG = require("../src/utils/math/PM_PRNG")

describe('PM_PRNG Test', () => {
  test('it should return the same series of numbers', () => {
    let rnd = new PM_PRNG(16)
    const values = []

    for (let i = 0; i < 1000; i++) {
      values.push(rnd.nextInt())
    }

    rnd = new PM_PRNG(16)
    for (let i = 0; i < 1000; i++) {
      expect(values[i]).toEqual(rnd.nextInt())
    }
  })

  test('it should return an integer within a range', () => {
    const rnd = new PM_PRNG(42)
    let val, min = Number.MAX_VALUE, max = Number.MIN_VALUE

    for (let i = 0; i < 10000; i++) {
      val = rnd.nextIntRange(0, 1000)
      min = Math.min(val, min)
      max = Math.max(val, max)
      expect(val).toBeGreaterThanOrEqual(0)
      expect(val).toBeLessThanOrEqual(1000)
    }

    expect(min).toBe(0)
    expect(max).toBe(1000)
  })

  test('it should return a double within a range', () => {
    const rnd = new PM_PRNG(46)
    let val, min = Number.MAX_VALUE, max = Number.MIN_VALUE

    for (let i = 0; i < 10000; i++) {
      val = rnd.nextDoubleRange(1.3, 6.2)
      min = Math.min(val, min)
      max = Math.max(val, max)
      expect(val).toBeGreaterThanOrEqual(1.3)
      expect(val).toBeLessThanOrEqual(6.2)
    }
    const expectedMin = 1.3
    const expectedMax = 6.2

    expect(min.toFixed(1)).toBe(expectedMin.toFixed(1))
    expect(max.toFixed(1)).toBe(expectedMax.toFixed(1))
  })

  /*
         from http://www.firstpr.com.au/dsp/rand31/#History-implementation
            
            Value           Number of results after seed of 1
            
             16807          1
         282475249          2
        1622650073          3
         984943658          4
        1144108930          5
         470211272          6
         101027544          7
        1457850878          8
        1458777923          9
        2007237709         10
        
         925166085       9998
        1484786315       9999
        1043618065      10000
        1589873406      10001
        2010798668      10002
        
        1227283347    1000000
        1808217256    2000000
        1140279430    3000000
         851767375    4000000
        1885818104    5000000
        
         168075678   99000000
        1209575029  100000000
         941596188  101000000
        1207672015 2147483643
        1475608308 2147483644
        1407677000 2147483645
        1          2147483646  <<< Starting the sequence again with the original seed.
        16807      2147483647
    */
  test('it should produce expected results', () => {
    let rnd = new PM_PRNG()
    let i = (1 << 31) - 1
    let k = 0

    // Iterations/second (balanced for ~2,13 ghz pentium mobile)
    let j = 1e+6 * 4
    let start = Date.now()

    while (i) {
      if (k >= 1 && k <= 10) {
        switch (k) {
          case 1:
            expect(rnd.seed).toEqual(16807); break
          
          case 2:
            expect(rnd.seed).toEqual(282475249); break
          
          case 3:
            expect(rnd.seed).toEqual(1622650073); break
          
          case 4:
            expect(rnd.seed).toEqual(984943658); break
          
          case 5:
            expect(rnd.seed).toEqual(1144108930); break
          
          case 6:
            expect(rnd.seed).toEqual(470211272); break
          
          case 7:
            expect(rnd.seed).toEqual(101027544); break
          
          case 8:
            expect(rnd.seed).toEqual(1457850878); break
          
          case 9:
            expect(rnd.seed).toEqual(1458777923); break
          
          case 10:
            expect(rnd.seed).toEqual(2007237709); break
        }
      } else if (k >= 9998 & k <= 10002) {
        switch (k) {
          case 9998:
            expect(rnd.seed).toEqual(925166085); break
          case 9999:
            expect(rnd.seed).toEqual(1484786315); break
          case 10000:
            expect(rnd.seed).toEqual(1043618065); break
          case 10001:
            expect(rnd.seed).toEqual(1589873406); break
          case 10002:
            expect(rnd.seed).toEqual(2010798668); break
        }
      } else if (k === 1000000){
        expect(rnd.seed).toEqual(1227283347)
      } else if (k === 2000000){
        expect(rnd.seed).toEqual(1808217256)
      } else if (k === 3000000){
        expect(rnd.seed).toEqual(1140279430)
      } else if (k === 4000000){
        expect(rnd.seed).toEqual(851767375)
      } else if (k === 5000000){
        expect(rnd.seed).toEqual(1885818104)
      } else if (k === 99000000){
        expect(rnd.seed).toEqual(168075678)
      } else if (k === 100000000){
        expect(rnd.seed).toEqual(1209575029)
      } else if (k === 101000000){
        expect(rnd.seed).toEqual(941596188)
      } else if (k === 2147483643){
        expect(rnd.seed).toEqual(1207672015)
      } else if (k === 2147483644){
        expect(rnd.seed).toEqual(1475608308)
      } else if (k === 2147483645){
        expect(rnd.seed).toEqual(1407677000)
      } else if (k === 2147483646){
        expect(rnd.seed).toEqual(1)
      }
      rnd.nextInt()
      k++
      i--
      j--
      if (j === 0) {
        break
      }
    }
  })
})